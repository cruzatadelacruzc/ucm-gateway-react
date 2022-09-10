package sld.ucm.gateway.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcReactiveOAuth2UserService;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.userinfo.ReactiveOAuth2UserService;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUserAuthority;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtAuthenticationConverterAdapter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.csrf.CookieServerCsrfTokenRepository;
import org.springframework.security.web.server.header.ReferrerPolicyServerHttpHeadersWriter;
import org.springframework.security.web.server.util.matcher.NegatedServerWebExchangeMatcher;
import org.springframework.security.web.server.util.matcher.OrServerWebExchangeMatcher;
import org.zalando.problem.spring.webflux.advice.security.SecurityProblemSupport;
import reactor.core.publisher.Mono;
import sld.ucm.gateway.security.AuthoritiesConstants;
import sld.ucm.gateway.security.SecurityUtils;
import sld.ucm.gateway.security.oauth2.AudienceValidator;
import sld.ucm.gateway.security.oauth2.JwtGrantedAuthorityConverter;
import sld.ucm.gateway.web.filter.CookieCsrfFilter;
import sld.ucm.gateway.web.filter.SpaWebFilter;

import java.util.HashSet;
import java.util.Set;

import static org.springframework.security.web.server.util.matcher.ServerWebExchangeMatchers.pathMatchers;

@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
@Import(SecurityProblemSupport.class)
public class SecurityConfiguration {

    private final AppProperties appProperties;
    private final SecurityProblemSupport problemSupport;


    @Value("${spring.security.oauth2.client.provider.keycloak.issuer-uri}")
    private String issuerUri;

    public SecurityConfiguration(AppProperties appProperties, SecurityProblemSupport problemSupport) {
        this.appProperties = appProperties;
        this.problemSupport = problemSupport;
    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        // @formatter:off
        // TODO I have a doubt about add  "/management/**" to securityMatcher
        http
                .securityMatcher(new NegatedServerWebExchangeMatcher(new OrServerWebExchangeMatcher(
                        pathMatchers("/app/**","/manifest.json", "/*.png", "/static/**", "/swagger-ui/**", "/swagger-resources/**", "/v2/api-docs", "/v3/api-docs"),
                        pathMatchers(HttpMethod.OPTIONS, "/**"))))
                .csrf()
                    .csrfTokenRepository(CookieServerCsrfTokenRepository.withHttpOnlyFalse())
              .and()
                // See https://github.com/spring-projects/spring-security/issues/5766
                .addFilterAt(new CookieCsrfFilter(), SecurityWebFiltersOrder.REACTOR_CONTEXT)
                .addFilterAt(new SpaWebFilter(), SecurityWebFiltersOrder.AUTHENTICATION)
                .exceptionHandling()
                    .accessDeniedHandler(problemSupport)
                    .authenticationEntryPoint(problemSupport)
              .and()
                .headers()
                  .contentSecurityPolicy(appProperties.getSecurity().getContentSecurityPolicy())
                .and()
                .referrerPolicy(ReferrerPolicyServerHttpHeadersWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN)
                .and()
                .featurePolicy("geolocation 'none'; midi 'none'; sync-xhr 'none'; microphone 'none'; camera 'none'; magnetometer 'none'; gyroscope 'none'; fullscreen 'self'; payment 'none'")
                .and()
                .frameOptions().disable()
                .and()
                .authorizeExchange()
                .pathMatchers("/").permitAll()
                .pathMatchers("/*.*").permitAll()
                .pathMatchers("/api/auth-info").permitAll()
                .pathMatchers("/api/files/**").permitAll()
                .pathMatchers("/api/**").authenticated()
                .pathMatchers("/services/**").authenticated()
                .pathMatchers("/management/health").permitAll()
                .pathMatchers("/management/health/**").permitAll()
                .pathMatchers("/management/info").permitAll()
                .pathMatchers("/management/prometheus").permitAll()
                .pathMatchers("/management/**").hasAuthority(AuthoritiesConstants.ADMIN);
        http.oauth2Login()
                .and()
                .oauth2ResourceServer()
                    .jwt()
                    .jwtAuthenticationConverter(jwtAuthenticationConverter());
        http.oauth2Client();
        // @formatter:on
        return http.build();
    }

    /**
     * The default configuration uses scope and I need to work with the authorities.
     * Extracting Authorities Manually
     */
    Converter<Jwt, Mono<AbstractAuthenticationToken>> jwtAuthenticationConverter() {
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(new JwtGrantedAuthorityConverter());
        return new ReactiveJwtAuthenticationConverterAdapter(jwtAuthenticationConverter);
    }

    /**
     * Map authorities from "groups" or "roles" claim in ID Token.
     *
     * @return a {@link ReactiveOAuth2UserService} that has the groups from the IdP
     * to Spring Security Authorities.
     */
    @Bean
    public ReactiveOAuth2UserService<OidcUserRequest, OidcUser> oidcUserService() {
        final OidcReactiveOAuth2UserService delegate = new OidcReactiveOAuth2UserService();

        return userRequest -> {
            // Delegate to the default implementation for loading a user
            return delegate
                    .loadUser(userRequest)
                    .map(
                            user -> {
                                Set<GrantedAuthority> mappedAuthorities = new HashSet<>();

                                user
                                        .getAuthorities()
                                        .forEach(
                                                authority -> {
                                                    if (authority instanceof OidcUserAuthority) {
                                                        OidcUserAuthority oidcUserAuthority = (OidcUserAuthority) authority;
                                                        mappedAuthorities.addAll(
                                                                SecurityUtils.extractAuthorityFromClaims(oidcUserAuthority.getUserInfo().getClaims())
                                                        );
                                                    }
                                                }
                                        );

                                return new DefaultOidcUser(mappedAuthorities, user.getIdToken(), user.getUserInfo());
                            }
                    );
        };
    }

    /**
     * The ProviderManager is configured to use an AuthenticationProvider of type JwtAuthenticationProvider.
     * JwtAuthenticationProvider decodes, verifies, and validates the Jwt using a JwtDecoder.
     */
    @Bean
    ReactiveJwtDecoder jwtDecoder() {
        NimbusReactiveJwtDecoder jwtDecoder = (NimbusReactiveJwtDecoder) ReactiveJwtDecoders.fromOidcIssuerLocation(issuerUri);

        OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator(appProperties.getSecurity().getOauth2().getAudience());
        OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuerUri);
        OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer, audienceValidator);

        jwtDecoder.setJwtValidator(withAudience);

        return jwtDecoder;
    }
}
