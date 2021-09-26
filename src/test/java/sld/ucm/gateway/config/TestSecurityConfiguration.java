package sld.ucm.gateway.config;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.client.InMemoryReactiveOAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.ReactiveOAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.InMemoryReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;

import java.util.HashMap;
import java.util.Map;

import static org.mockito.Mockito.mock;

/**
 * This class allows you to run unit and integration tests without an IdP.
 */
@TestConfiguration
public class TestSecurityConfiguration {

    @Bean
    ClientRegistration clientRegistration() {
        return clientRegistrationBuilder().build();
    }

    private ClientRegistration.Builder clientRegistrationBuilder() {
        Map<String, Object> metadata = new HashMap<>();
        metadata.put("end_session_endpoint", "https://ucm.infomed.sld.cu/logout");

        return ClientRegistration
                .withRegistrationId("login-client")
                .redirectUriTemplate("{baseUrl}/{action}/oauth2/code/{registrationId}")
                .clientAuthenticationMethod(ClientAuthenticationMethod.BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .scope("read:user")
                .authorizationUri("https://ucm.infomed.sld.cu/login/oauth/authorize")
                .tokenUri("https://ucm.infomed.sld.cu/login/oauth/access_token")
                .jwkSetUri("https://ucm.infomed.sld.cu/oauth/jwk")
                .userInfoUri("https://api.ucm.infomed.sld.cu/user")
                .providerConfigurationMetadata(metadata)
                .userNameAttributeName("id")
                .clientName("Client Name")
                .clientId("client-id")
                .clientSecret("client-secret");
    }

    @Bean
    ReactiveClientRegistrationRepository clientRegistrationRepository(ClientRegistration clientRegistration) {
        return new InMemoryReactiveClientRegistrationRepository(clientRegistration);
    }

    @Bean
    ReactiveJwtDecoder jwtDecoder() {
        return mock(ReactiveJwtDecoder.class);
    }

    @Bean
    public ReactiveOAuth2AuthorizedClientService authorizedClientService(
            ReactiveClientRegistrationRepository clientRegistrationRepository
    ) {
        return new InMemoryReactiveOAuth2AuthorizedClientService(clientRegistrationRepository);
    }
}
