package com.sanjeev.easykart.dto;

import com.sanjeev.easykart.entity.Product;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
public class ProductResponse {

    private final Long id;
    private final String name;
    private final String description;
    private final BigDecimal price;
    private final Integer stock;
    private final LocalDateTime createdAt;
    private final String categoryName;
    private final Long categoryId;

    public ProductResponse(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.stock = product.getStock();
        this.createdAt = product.getCreatedAt();
        this.categoryName = product.getCategory() != null ? product.getCategory().getName() : null;
        this.categoryId = product.getCategory() != null ? product.getCategory().getId() : null;
    }
}

