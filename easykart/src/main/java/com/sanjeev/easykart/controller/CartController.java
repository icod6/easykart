package com.sanjeev.easykart.controller;

import com.sanjeev.easykart.dto.CartItemRequest;
import com.sanjeev.easykart.dto.CartResponse;
import com.sanjeev.easykart.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public CartResponse getCart(Authentication authentication) {
        return cartService.getCart(authentication.getName());
    }

    @PostMapping("/items")
    public CartResponse addItem(Authentication authentication,
                                @Valid @RequestBody CartItemRequest request) {
        return cartService.addItem(authentication.getName(), request);
    }

    @DeleteMapping("/items/{productId}")
    public CartResponse removeItem(Authentication authentication, @PathVariable Long productId) {
        return cartService.removeItem(authentication.getName(), productId);
    }
}