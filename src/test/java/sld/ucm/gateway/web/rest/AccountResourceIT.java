package sld.ucm.gateway.web.rest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.client.ReactiveOAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;
import sld.ucm.gateway.IntegrationTest;
import sld.ucm.gateway.security.AuthoritiesConstants;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.mockAuthentication;
import static sld.ucm.gateway.web.rest.TestUtil.authenticationToken;
import static sld.ucm.gateway.web.rest.TestUtil.registerAuthenticationToken;

/**
 * Integration tests for the {@link AccountResource} REST controller.
 */

@AutoConfigureWebTestClient
@WithMockUser(value = "test")
@IntegrationTest
public class AccountResourceIT {

    @Autowired
    private ClientRegistration clientRegistration;

    @Autowired
    private ReactiveOAuth2AuthorizedClientService authorizedClientService;

    private Map<String, Object> claims;

    @Autowired
    private WebTestClient webTestClient;

    @BeforeEach
    public void setup() {
        claims = new HashMap<>();
        claims.put("groups", Collections.singletonList(AuthoritiesConstants.ADMIN));
        claims.put("sub", "lucas");
        claims.put("email", "lucas.cruzata@infomed.sld.cu");
    }

    @Test
    void testGetExistingAccount() {
        webTestClient
                .mutateWith(
                        mockAuthentication(registerAuthenticationToken(authorizedClientService, clientRegistration, authenticationToken(claims)))
                )
                .mutateWith(csrf())
                .get()
                .uri("/api/account")
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectHeader()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .expectBody()
                .jsonPath("$.login").isEqualTo("lucas")
                .jsonPath("$.email").isEqualTo("lucas.cruzata@infomed.sld.cu")
                .jsonPath("$.authorities").isEqualTo(AuthoritiesConstants.ADMIN);
    }

    @Test
    void testGetUnknownAccount() {
        webTestClient.get().uri("/api/account").accept(MediaType.APPLICATION_JSON).exchange().expectStatus().is5xxServerError();
    }
}
