package com.tpx.urlshortener.dto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UrlResponse {
    private String alias;
    private String fullUrl;
    private String shortUrl;
}