package com.sanjeev.easykart.dto;

import com.sanjeev.easykart.entity.Cart;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
public class CartResponse {

    private final List<CartItemResponse> items;
    private final BigDecimal total;

    public CartResponse(Cart cart) {
        this.items = cart.getItems().stream().map(CartItemResponse::new).toList();
        this.total = items.stream()
                .map(CartItemResponse::getLineTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}