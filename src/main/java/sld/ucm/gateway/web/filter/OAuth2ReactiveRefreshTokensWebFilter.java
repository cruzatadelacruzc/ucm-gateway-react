package sld.ucm.gateway.web.filter;

import org.springframework.security.oauth2.client.OAuth2AuthorizeRequest;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.ReactiveOAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

/**
 * Refresh oauth2 tokens based on TokenRelayGatewayFilterFactory.
 */
@Component
public class OAuth2ReactiveRefreshTokensWebFilter implements WebFilter {

    private final ReactiveOAuth2AuthorizedClientManager clientManager;

    public OAuth2ReactiveRefreshTokensWebFilter(ReactiveOAuth2AuthorizedClientManager clientManagerProvider) {
        this.clientManager = clientManagerProvider;
    }


    public Mono<Void> filter(ServerWebExchange serverWebExchange, WebFilterChain webFilterChain) {
        return serverWebExchange
                .getPrincipal()
                .filter(principal -> principal instanceof OAuth2AuthenticationToken)
                .cast(OAuth2AuthenticationToken.class)
                .flatMap(oAuth2AuthenticationToken -> authorizedClient(serverWebExchange, oAuth2AuthenticationToken))
                .onErrorResume(e -> Mono.empty())
                .thenReturn(serverWebExchange)
                .flatMap(webFilterChain::filter);
    }


    private Mono<OAuth2AuthorizedClient> authorizedClient(ServerWebExchange serverWebExchange,
                                                          OAuth2AuthenticationToken oAuth2AuthenticationToken) {
        String clientRegistrationId = oAuth2AuthenticationToken.getAuthorizedClientRegistrationId();
        OAuth2AuthorizeRequest request = OAuth2AuthorizeRequest
                .withClientRegistrationId(clientRegistrationId)
                .principal(oAuth2AuthenticationToken)
                .attribute(ServerWebExchange.class.getName(), serverWebExchange)
                .build();
        if (clientManager == null) {
            return Mono.error(
                    new IllegalStateException(
                            "No ReactiveOAuth2AuthorizedClientManager bean was found. Did you include the " +
                                    "org.springframework.boot:spring-boot-starter-oauth2-client dependency?"
                    )
            );
        }
        return clientManager.authorize(request);
    }
}
