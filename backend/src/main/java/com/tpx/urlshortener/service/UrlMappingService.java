package com.tpx.urlshortener.service;

import com.tpx.urlshortener.entity.UrlMapping;
import com.tpx.urlshortener.repository.UrlMappingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UrlMappingService {

    private final UrlMappingRepository repository;


    public UrlMapping createShortUrl(String fullUrl, String customAlias) {
        String alias = (customAlias != null && !customAlias.isBlank())
                ? customAlias
                : UUID.randomUUID().toString().substring(0, 8);

        if (repository.findByAlias(alias).isPresent()) {
            throw new RuntimeException("Alias already exists");
        }

        UrlMapping mapping = UrlMapping.builder()
                .fullUrl(fullUrl)
                .alias(alias)
                .build();

        return repository.save(mapping);
    }


    public UrlMapping getByAlias(String alias) {
        return repository.findByAlias(alias)
                .orElseThrow(() -> new RuntimeException("Alias not found"));
    }

    public void deleteByAlias(String alias) {
        UrlMapping mapping = getByAlias(alias);
        repository.delete(mapping);
    }


    public java.util.List<UrlMapping> listAll() {
        return repository.findAll();
    }
}

