package com.sanjeev.easykart.dto;

import com.sanjeev.easykart.entity.CartItem;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class CartItemResponse {

    private final Long productId;
    private final String productName;
    private final BigDecimal unitPrice;
    private final Integer quantity;
    private final BigDecimal lineTotal;

    public CartItemResponse(CartItem item) {
        this.productId = item.getProduct().getId();
        this.productName = item.getProduct().getName();
        this.unitPrice = item.getProduct().getPrice();
        this.quantity = item.getQuantity();
        this.lineTotal = unitPrice.multiply(BigDecimal.valueOf(quantity));
    }
}