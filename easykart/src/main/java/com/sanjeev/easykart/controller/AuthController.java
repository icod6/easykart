package com.sanjeev.easykart.controller;

import com.sanjeev.easykart.dto.LoginRequest;
import com.sanjeev.easykart.dto.LoginResponse;
import com.sanjeev.easykart.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}