package com.sanjeev.easykart.service;

import com.sanjeev.easykart.dto.ProductRequest;
import com.sanjeev.easykart.dto.ProductResponse;
import com.sanjeev.easykart.entity.Product;
import com.sanjeev.easykart.exception.ResourceNotFoundException;
import com.sanjeev.easykart.repository.CategoryRepository;
import com.sanjeev.easykart.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void getById_returnsProduct_whenFound() {
        Product product = new Product();
        product.setName("Wireless Mouse");
        product.setPrice(new BigDecimal("799.00"));
        product.setStock(25);

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        ProductResponse response = productService.getById(1L);

        assertEquals("Wireless Mouse", response.getName());
    }

    @Test
    void getById_throwsNotFound_whenMissing() {
        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> productService.getById(99L));
    }

    @Test
    void create_throwsNotFound_whenCategoryMissing() {
        ProductRequest request = new ProductRequest();
        request.setName("Keyboard");
        request.setPrice(new BigDecimal("1200.00"));
        request.setStock(10);
        request.setCategoryId(99L);

        when(categoryRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> productService.create(request));
        verify(productRepository, never()).save(any());
    }

    @Test
    void delete_removesProduct_whenFound() {
        Product product = new Product();
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        productService.delete(1L);

        verify(productRepository).delete(product);
    }
}