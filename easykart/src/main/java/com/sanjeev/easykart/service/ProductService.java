package com.sanjeev.easykart.service;

import com.sanjeev.easykart.dto.ProductRequest;
import com.sanjeev.easykart.dto.ProductResponse;
import com.sanjeev.easykart.entity.Product;
import com.sanjeev.easykart.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.sanjeev.easykart.exception.ResourceNotFoundException;
import com.sanjeev.easykart.entity.Category;
import com.sanjeev.easykart.repository.CategoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductResponse create(ProductRequest request) {
        Product product = new Product();
        applyRequest(product, request);
        return new ProductResponse(productRepository.save(product));
    }

    public Page<ProductResponse> getAll(String name, Long categoryId, Pageable pageable) {
        String nameFilter = (name == null || name.isBlank()) ? null : name;
        return productRepository.search(nameFilter, categoryId, pageable)
                .map(ProductResponse::new);
    }

    public ProductResponse getById(Long id) {
        return new ProductResponse(findProduct(id));
    }

    public ProductResponse update(Long id, ProductRequest request) {
        Product product = findProduct(id);
        applyRequest(product, request);
        return new ProductResponse(productRepository.save(product));
    }

    public void delete(Long id) {
        productRepository.delete(findProduct(id));
    }

    private Product findProduct(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));
    }

    private void applyRequest(Product product, ProductRequest request) {
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(
                        () -> new ResourceNotFoundException("Category not found with id " + request.getCategoryId()));
        product.setCategory(category);
    }
}
