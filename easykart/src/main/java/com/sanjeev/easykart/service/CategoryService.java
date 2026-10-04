package com.sanjeev.easykart.service;

import com.sanjeev.easykart.dto.CategoryRequest;
import com.sanjeev.easykart.dto.CategoryResponse;
import com.sanjeev.easykart.entity.Category;
import com.sanjeev.easykart.exception.DuplicateResourceException;
import com.sanjeev.easykart.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryResponse create(CategoryRequest request) {
        if (categoryRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException("Category already exists: " + request.getName());
        }
        Category category = new Category();
        category.setName(request.getName());
        return new CategoryResponse(categoryRepository.save(category));
    }

    public List<CategoryResponse> getAll() {
        return categoryRepository.findAll().stream()
                .map(CategoryResponse::new)
                .toList();
    }
}