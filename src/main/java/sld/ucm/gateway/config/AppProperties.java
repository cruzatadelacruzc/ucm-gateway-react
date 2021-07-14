package sld.ucm.gateway.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.web.cors.CorsConfiguration;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Properties specific to Gateway.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class AppProperties {

    private final CorsConfiguration cors = new CorsConfiguration();
    private final ClientApp clientApp = new ClientApp();
    private final Security security = new Security();
    private final Errors errors = new Errors();

    public Security getSecurity() {
        return security;
    }

    public ClientApp getClientApp() {
        return clientApp;
    }

    public CorsConfiguration getCors() {
        return cors;
    }

    public Errors getErrors() {
        return errors;
    }

    public static class ClientApp {
        private String name = "GatewayReact";

        public String getName() {
            return name;
        }

        public ClientApp setName(String name) {
            this.name = name;
            return this;
        }
    }

    public static class Security {
        private String contentSecurityPolicy = "default-src 'self'; frame-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://storage.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:";
        private final OAuth2 oauth2 = new OAuth2();

        public OAuth2 getOauth2() {
            return oauth2;
        }

        public String getContentSecurityPolicy() {
            return contentSecurityPolicy;
        }

        public void setContentSecurityPolicy(String contentSecurityPolicy) {
            this.contentSecurityPolicy = contentSecurityPolicy;
        }

        public static class OAuth2 {
            private List<String> audience = new ArrayList();

            public List<String> getAudience() {
                return Collections.unmodifiableList(this.audience);
            }

            public void setAudience(@NotNull List<String> audience) {
                this.audience.addAll(audience);
            }
        }
    }

    public static class Errors {
        private String problem_base_url = "http://directorio.gtm.sld.cu";

        public String getProblem_base_url() {
            return problem_base_url;
        }

        public void setProblem_base_url(String problem_base_url) {
            this.problem_base_url = problem_base_url;
        }
    }
}
