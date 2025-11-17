package com.tpx.urlshortener.controller;

import com.tpx.urlshortener.entity.UrlMapping;
import com.tpx.urlshortener.service.UrlMappingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequiredArgsConstructor
public class RedirectController {

    private final UrlMappingService service;

    @GetMapping("/{alias}")
    public ResponseEntity<Void> redirect(@PathVariable String alias) {
        UrlMapping mapping = service.getByAlias(alias);
        return ResponseEntity.status(302)
                .location(URI.create(mapping.getFullUrl()))
                .build();
    }
}