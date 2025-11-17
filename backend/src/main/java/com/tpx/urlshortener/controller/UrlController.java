package com.tpx.urlshortener.controller;

import com.tpx.urlshortener.dto.UrlRequest;
import com.tpx.urlshortener.dto.UrlResponse;
import com.tpx.urlshortener.entity.UrlMapping;
import com.tpx.urlshortener.service.UrlMappingMapper;
import com.tpx.urlshortener.service.UrlMappingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/urls")
@RequiredArgsConstructor
public class UrlController {

    private final UrlMappingService service;


    @PostMapping
    public ResponseEntity<UrlResponse> shortenUrl(@RequestBody UrlRequest request) {
        UrlMapping mapping = service.createShortUrl(request.getFullUrl(), request.getCustomAlias());
        UrlResponse response = UrlMappingMapper.toResponse(mapping);

        return ResponseEntity
                .created(URI.create(response.getShortUrl()))
                .body(response);
    }



    @DeleteMapping("/{alias}")
    public ResponseEntity<Void> delete(@PathVariable String alias) {
        service.deleteByAlias(alias);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public List<UrlResponse> listAll() {
        return service.listAll().stream()
                .map(UrlMappingMapper::toResponse)
                .toList();
    }
}
