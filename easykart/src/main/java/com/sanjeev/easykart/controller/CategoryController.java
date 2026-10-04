package com.sanjeev.easykart.controller;

import com.sanjeev.easykart.dto.CategoryRequest;
import com.sanjeev.easykart.dto.CategoryResponse;
import com.sanjeev.easykart.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryResponse> create(@Valid @RequestBody CategoryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.create(request));
    }

    @GetMapping
    public List<CategoryResponse> getAll() {
        return categoryService.getAll();
    }
}