package com.tpx.urlshortener.dto;

import lombok.Data;

@Data
public class UrlRequest {
    private String fullUrl;
    private String customAlias;
}