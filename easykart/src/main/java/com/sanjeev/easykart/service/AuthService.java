package com.sanjeev.easykart.service;

import com.sanjeev.easykart.config.JwtUtil;
import com.sanjeev.easykart.dto.LoginRequest;
import com.sanjeev.easykart.dto.LoginResponse;
import com.sanjeev.easykart.entity.User;
import com.sanjeev.easykart.exception.InvalidCredentialsException;
import com.sanjeev.easykart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        return new LoginResponse(jwtUtil.generateToken(user.getEmail(), user.getRole()));
    }
}