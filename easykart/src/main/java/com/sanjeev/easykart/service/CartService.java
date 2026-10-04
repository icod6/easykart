package com.sanjeev.easykart.service;

import com.sanjeev.easykart.dto.CartItemRequest;
import com.sanjeev.easykart.dto.CartResponse;
import com.sanjeev.easykart.entity.Cart;
import com.sanjeev.easykart.entity.CartItem;
import com.sanjeev.easykart.entity.Product;
import com.sanjeev.easykart.entity.User;
import com.sanjeev.easykart.exception.ResourceNotFoundException;
import com.sanjeev.easykart.repository.CartRepository;
import com.sanjeev.easykart.repository.ProductRepository;
import com.sanjeev.easykart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional
    public CartResponse getCart(String email) {
        return new CartResponse(getOrCreateCart(email));
    }

    @Transactional
    public CartResponse addItem(String email, CartItemRequest request) {
        Cart cart = getOrCreateCart(email);
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + request.getProductId()));

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(product.getId()))
                .findFirst()
                .orElse(null);

        if (item == null) {
            item = new CartItem();
            item.setCart(cart);
            item.setProduct(product);
            item.setQuantity(request.getQuantity());
            cart.getItems().add(item);
        } else {
            item.setQuantity(item.getQuantity() + request.getQuantity());
        }

        return new CartResponse(cartRepository.save(cart));
    }

    @Transactional
    public CartResponse removeItem(String email, Long productId) {
        Cart cart = getOrCreateCart(email);
        boolean removed = cart.getItems().removeIf(i -> i.getProduct().getId().equals(productId));
        if (!removed) {
            throw new ResourceNotFoundException("Product " + productId + " is not in your cart");
        }
        return new CartResponse(cartRepository.save(cart));
    }

    private Cart getOrCreateCart(String email) {
        return cartRepository.findByUserEmail(email).orElseGet(() -> {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            Cart cart = new Cart();
            cart.setUser(user);
            return cartRepository.save(cart);
        });
    }
}