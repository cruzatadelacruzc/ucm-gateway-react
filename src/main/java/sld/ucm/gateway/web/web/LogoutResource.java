package sld.ucm.gateway.web.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.WebSession;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

/**
 * REST controller for managing global OIDC logout.
 */
@RestController
public class LogoutResource {
    private final Mono<ClientRegistration> registration;
    private static final Logger log = LoggerFactory.getLogger(LogoutResource.class);

    public LogoutResource(ReactiveClientRegistrationRepository registrations) {
        this.registration = registrations.findByRegistrationId("login-client");
    }

    /**
     * {@code POST  /api/logout} : logout the current user.
     *
     * @param idToken    the ID token.
     * @param webSession the current {@link WebSession}.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and a body with a global logout URL and ID token.
     */
    @PostMapping("/api/logout")
    public Mono<Map<String, String>> logout(@AuthenticationPrincipal(expression = "idToken") OidcIdToken idToken, WebSession webSession) {
        return webSession
                .invalidate()
                .then(
                        this.registration.map(clientRegistration -> clientRegistration
                                .getProviderDetails()
                                .getConfigurationMetadata().get("end_session_endpoint").toString())
                                .map(
                                        logoutUrl -> {
                                            Map<String, String> logoutDetails = new HashMap<>();
                                            logoutDetails.put("idToken", idToken.getTokenValue());
                                            logoutDetails.put("logoutUrl", logoutUrl);
                                            return logoutDetails;
                                        }
                                )
                );
    }
}
