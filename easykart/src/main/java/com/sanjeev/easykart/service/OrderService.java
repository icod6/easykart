package com.sanjeev.easykart.service;

import com.sanjeev.easykart.dto.OrderResponse;
import com.sanjeev.easykart.entity.Cart;
import com.sanjeev.easykart.entity.CartItem;
import com.sanjeev.easykart.entity.Order;
import com.sanjeev.easykart.entity.OrderItem;
import com.sanjeev.easykart.entity.Product;
import com.sanjeev.easykart.exception.InsufficientStockException;
import com.sanjeev.easykart.exception.ResourceNotFoundException;
import com.sanjeev.easykart.repository.CartRepository;
import com.sanjeev.easykart.repository.OrderRepository;
import com.sanjeev.easykart.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    @Transactional
    public OrderResponse placeOrder(String email) {
        Cart cart = cartRepository.findByUserEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Your cart is empty"));

        if (cart.getItems().isEmpty()) {
            throw new ResourceNotFoundException("Your cart is empty");
        }

        Order order = new Order();
        order.setUser(cart.getUser());
        order.setStatus("PLACED");

        BigDecimal total = BigDecimal.ZERO;

        for (CartItem cartItem : cart.getItems()) {
            Product product = cartItem.getProduct();

            if (product.getStock() < cartItem.getQuantity()) {
                throw new InsufficientStockException(
                        "Not enough stock for " + product.getName()
                                + ". Available: " + product.getStock());
            }

            product.setStock(product.getStock() - cartItem.getQuantity());
            productRepository.save(product);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(product.getPrice());
            order.getItems().add(orderItem);

            total = total.add(product.getPrice()
                    .multiply(BigDecimal.valueOf(cartItem.getQuantity())));
        }

        order.setTotalAmount(total);
        Order saved = orderRepository.save(order);

        cart.getItems().clear();
        cartRepository.save(cart);

        return new OrderResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getMyOrders(String email) {
        return orderRepository.findByUserEmailOrderByCreatedAtDesc(email).stream()
                .map(OrderResponse::new)
                .toList();
    }
}