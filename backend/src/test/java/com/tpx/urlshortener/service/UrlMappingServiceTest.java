package com.tpx.urlshortener.service;

import com.tpx.urlshortener.entity.UrlMapping;
import com.tpx.urlshortener.repository.UrlMappingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UrlMappingServiceTest {

    @Mock
    private UrlMappingRepository repository;

    @InjectMocks
    private UrlMappingService service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createShortUrl_withCustomAlias_success() {
        String fullUrl = "https://example.com";
        String alias = "myalias";

        when(repository.findByAlias(alias)).thenReturn(Optional.empty());

        UrlMapping saved = UrlMapping.builder()
                .id(1L)
                .fullUrl(fullUrl)
                .alias(alias)
                .build();

        when(repository.save(any(UrlMapping.class))).thenReturn(saved);

        UrlMapping result = service.createShortUrl(fullUrl, alias);

        assertNotNull(result);
        assertEquals(alias, result.getAlias());
        assertEquals(fullUrl, result.getFullUrl());
        verify(repository).save(any(UrlMapping.class));
    }

    @Test
    void createShortUrl_duplicateAlias_throws() {
        String fullUrl = "https://example.com";
        String alias = "taken";

        when(repository.findByAlias(alias)).thenReturn(Optional.of(new UrlMapping()));

        RuntimeException ex = assertThrows(RuntimeException.class, () -> service.createShortUrl(fullUrl, alias));
        assertThat(ex.getMessage()).contains("Alias already exists");
        verify(repository, never()).save(any());
    }

    @Test
    void getByAlias_notFound_throws() {
        when(repository.findByAlias("nope")).thenReturn(Optional.empty());
        RuntimeException ex = assertThrows(RuntimeException.class, () -> service.getByAlias("nope"));
        assertThat(ex.getMessage()).contains("Alias not found");
    }

    @Test
    void listAll_callsRepositoryFindAll() {
        service.listAll();
        verify(repository).findAll();
    }
}