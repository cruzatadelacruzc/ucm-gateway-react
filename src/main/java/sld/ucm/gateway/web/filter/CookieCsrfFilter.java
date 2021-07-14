package sld.ucm.gateway.web.filter;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.web.server.csrf.CsrfToken;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

public class CookieCsrfFilter implements WebFilter {
    private static final String CSRF_COOKIE_NAME = "XSRF-TOKEN";
    private static final Logger log = LoggerFactory.getLogger(CookieCsrfFilter.class);

    public CookieCsrfFilter() {
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        return exchange.getRequest().getCookies().get(CSRF_COOKIE_NAME) != null ?
                chain.filter(exchange) :
                Mono.just(exchange).publishOn(Schedulers.boundedElastic()).flatMap((it)
                        -> it.getAttributeOrDefault(CsrfToken.class.getName(), Mono.empty())).doOnNext( (token) -> {
            ResponseCookie cookie = ResponseCookie.from(
                    CSRF_COOKIE_NAME,
                    ((CsrfToken)token).getToken())
                    .maxAge(-1L)
                    .httpOnly(false)
                    .path(this.getRequestContext(exchange.getRequest()))
                    .secure(Optional.ofNullable(exchange.getRequest().getSslInfo()).isPresent())
                    .build();
                    log.debug("Cookie: {}", cookie);
            exchange.getResponse().getCookies().add(CSRF_COOKIE_NAME, cookie);
        }).then(Mono.defer(() -> chain.filter(exchange)));
    }

    private String getRequestContext(ServerHttpRequest request) {
        String contextPath = request.getPath().contextPath().value();
        return StringUtils.hasLength(contextPath) ? contextPath : "/";
    }


}
