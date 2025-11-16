package com.tpx.urlshortener.service;
import com.tpx.urlshortener.dto.UrlResponse;
import com.tpx.urlshortener.entity.UrlMapping;

public class UrlMappingMapper {

    private static final String BASE_URL = "http://localhost:8080";

    public static UrlResponse toResponse(UrlMapping mapping) {
        return UrlResponse.builder()
                .alias(mapping.getAlias())
                .fullUrl(mapping.getFullUrl())
                .shortUrl(BASE_URL + "/" + mapping.getAlias())
                .build();
    }
}