package com.sanjeev.easykart.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.servers.Server;
import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
public OpenAPI easykartOpenAPI() {
    SecurityScheme bearerScheme = new SecurityScheme()
            .type(SecurityScheme.Type.HTTP)
            .scheme("bearer")
            .bearerFormat("JWT");

    Server productionServer = new Server().url("https://easykart-sanjeev.up.railway.app");

    return new OpenAPI()
            .servers(List.of(productionServer))
            .components(new Components().addSecuritySchemes("bearerAuth", bearerScheme))
            .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
}
}