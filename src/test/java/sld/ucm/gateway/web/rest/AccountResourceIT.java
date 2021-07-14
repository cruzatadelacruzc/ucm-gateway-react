package sld.ucm.gateway.web.rest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;
import sld.ucm.gateway.IntegrationTest;
import sld.ucm.gateway.security.AuthoritiesConstants;
import sld.ucm.gateway.web.web.AccountResource;

import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf;
import static sld.ucm.gateway.web.rest.TestUtil.ID_TOKEN;

import java.time.Instant;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.mockAuthentication;

/**
 * Integration tests for the {@link AccountResource} REST controller.
 */

@AutoConfigureWebTestClient
@WithMockUser(value = "test")
@IntegrationTest
public class AccountResourceIT {

    private OidcIdToken idToken;

    @Autowired
    private WebTestClient webTestClient;

    @BeforeEach
    public void setup() {
        Map<String, Object> claims = new HashMap<>();
        claims.put("groups", Collections.singletonList(AuthoritiesConstants.ADMIN));
        claims.put("sub", "lucas");
        claims.put("email", "lucas.cruzata@infomed.sld.cu");
        this.idToken = new OidcIdToken(ID_TOKEN, Instant.now(), Instant.now().plusSeconds(60), claims);
    }

    @Test
    void testGetExistingAccount() {
        webTestClient
                .mutateWith(mockAuthentication(TestUtil.authenticationToken(idToken)))
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
                .jsonPath("$.login")
                .isEqualTo("lucas")
                .jsonPath("$.email")
                .isEqualTo("lucas.cruzata@infomed.sld.cu")
                .jsonPath("$.authorities")
                .isEqualTo(AuthoritiesConstants.ADMIN);
    }

    @Test
    void testGetUnknownAccount() {
        webTestClient.get().uri("/api/account").accept(MediaType.APPLICATION_JSON).exchange().expectStatus().is5xxServerError();
    }
}
