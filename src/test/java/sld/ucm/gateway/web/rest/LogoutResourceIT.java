package sld.ucm.gateway.web.rest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.client.ReactiveOAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.test.web.reactive.server.WebTestClient;
import sld.ucm.gateway.IntegrationTest;
import sld.ucm.gateway.security.AuthoritiesConstants;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.*;
import static sld.ucm.gateway.web.rest.TestUtil.*;

/**
 * Integration tests for the {@link LogoutResource} REST controller.
 */
@IntegrationTest
public class LogoutResourceIT {

    @Autowired
    private ReactiveClientRegistrationRepository registrations;

    @Autowired
    private ReactiveOAuth2AuthorizedClientService authorizedClientService;

    @Autowired
    private ClientRegistration clientRegistration;

    @Autowired
    private ApplicationContext context;

    private WebTestClient webTestClient;

    private Map<String, Object> claims;

    @BeforeEach
    public void before() {
        claims = new HashMap<>();
        claims.put("groups", Collections.singletonList(AuthoritiesConstants.USER));
        claims.put("sub", 123);

        this.webTestClient = WebTestClient.bindToApplicationContext(this.context).apply(springSecurity()).configureClient().build();
    }

    @Test
    void getLogoutInformation() {
        String logoutUrl = this.registrations.findByRegistrationId("login-client")
                .map(clientRegistration -> clientRegistration
                        .getProviderDetails()
                        .getConfigurationMetadata()
                        .get("end_session_endpoint")
                        .toString()
                    )
                .block();
        this.webTestClient.mutateWith(csrf())
                .mutateWith(
                        mockAuthentication(registerAuthenticationToken(authorizedClientService, clientRegistration, authenticationToken(claims)))
                )
                .post()
                .uri("/api/logout")
                .exchange()
                .expectStatus()
                .isOk()
                .expectHeader()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .expectBody()
                .jsonPath("$.logoutUrl").isEqualTo(logoutUrl)
                .jsonPath("$.idToken").isEqualTo(ID_TOKEN);
    }
}
