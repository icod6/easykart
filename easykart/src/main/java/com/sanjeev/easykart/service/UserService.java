package com.sanjeev.easykart.service;

import com.sanjeev.easykart.dto.RegisterRequest;
import com.sanjeev.easykart.dto.UserResponse;
import com.sanjeev.easykart.entity.User;
import com.sanjeev.easykart.exception.DuplicateResourceException;
import com.sanjeev.easykart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already registered: " + request.getEmail());
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole("USER");

        return new UserResponse(userRepository.save(user));
    }
}