package sld.ucm.gateway.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import sld.ucm.gateway.config.Constants;

import java.util.Map;
import java.util.stream.Collectors;

/**
 * Service class for managing users.
 */
@Service
public class UserService {

    @Value("${spring.security.oauth2.client.registration.login-client.client-id:}")
    private String clientId;

    /**
     * Returns the user from an OAuth 2.0 login or resource server with JWT.
     * Synchronizes the user in the local repository.
     *
     * @param authToken the authentication token.
     * @return the user from the authentication.
     */
    public Mono<AdminUserDTO> getUserFromAuthentication(AbstractAuthenticationToken authToken) {
        Map<String, Object> attributes;
        if (authToken instanceof OAuth2AuthenticationToken) {
            attributes = ((OAuth2AuthenticationToken) authToken).getPrincipal().getAttributes();
        } else if (authToken instanceof JwtAuthenticationToken) {
            attributes = ((JwtAuthenticationToken) authToken).getTokenAttributes();
        } else {
            throw new IllegalArgumentException("AuthenticationToken is not OAuth2 or JWT!");
        }
        AdminUserDTO user = getUser(attributes);
        if (attributes.get("accountUrl") != null) {
            String url = (String) attributes.get("accountUrl");
            String fullUrl = url.endsWith("/") ? url.substring(0, url.length() - 1) : url;
            user.setAccountUrl(String.format("%s?referrer=%s", fullUrl, clientId));
        }
        user.setAuthorities(authToken.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet()));
        return Mono.just(user);
    }

    private static AdminUserDTO getUser(Map<String, Object> details) {
        AdminUserDTO user = new AdminUserDTO();
        Boolean activated = Boolean.TRUE;
        // handle resource server JWT, where sub claim is email and uid is ID
        if (details.get("uid") != null) {
            user.setId((String) details.get("uid"));
            user.setLogin((String) details.get("sub"));
        } else {
            user.setId((String) details.get("sub"));
        }
        if (details.get("preferred_username") != null) {
            user.setLogin(((String) details.get("preferred_username")).toLowerCase());
        } else if (user.getLogin() == null) {
            user.setLogin(user.getId());
        }
        if (details.get("given_name") != null) {
            user.setFirstName((String) details.get("given_name"));
        }
        if (details.get("family_name") != null) {
            user.setLastName((String) details.get("family_name"));
        }
        if (details.get("email_verified") != null) {
            activated = (Boolean) details.get("email_verified");
        }
        if (details.get("email") != null) {
            user.setEmail(((String) details.get("email")).toLowerCase());
        } else {
            user.setEmail((String) details.get("sub"));
        }
        if (details.get("langKey") != null) {
            user.setLangKey((String) details.get("langKey"));
        } else if (details.get("locale") != null) {
            // trim off country code if it exists
            String locale = (String) details.get("locale");
            if (locale.contains("_")) {
                locale = locale.substring(0, locale.indexOf('_'));
            } else if (locale.contains("-")) {
                locale = locale.substring(0, locale.indexOf('-'));
            }
            user.setLangKey(locale.toLowerCase());
        } else {
            // set langKey to default if not specified by IdP
            user.setLangKey(Constants.DEFAULT_LANGUAGE);
        }
        if (details.get("picture") != null) {
            user.setImageUrl((String) details.get("picture"));
        }
        user.setActivated(activated);
        return user;
    }
}
