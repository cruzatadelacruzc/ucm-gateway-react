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

    private final RegistryConfig registryConfig = new RegistryConfig();
    private final CorsConfiguration cors = new CorsConfiguration();
    private final ClientApp clientApp = new ClientApp();
    private final Security security = new Security();
    private final Logging logging = new Logging();
    private final Swagger swagger = new Swagger();
    private final Metrics metrics = new Metrics();
    private final Errors errors = new Errors();

    public Errors getErrors() {
        return errors;
    }

    public Swagger getSwagger() {
        return swagger;
    }

    public Metrics getMetrics() {
        return metrics;
    }

    public Logging getLogging() {
        return logging;
    }

    public CorsConfiguration getCors() {
        return cors;
    }

    public Security getSecurity() {
        return security;
    }

    public ClientApp getClientApp() {
        return clientApp;
    }

    public RegistryConfig getRegistryConfig() {
        return registryConfig;
    }

    public static class Logging {
        private boolean useJsonFormat = false;
        private final Logstash logstash = new Logstash();

        public boolean isUseJsonFormat() {
            return useJsonFormat;
        }

        public Logstash getLogstash() {
            return logstash;
        }

        public void setUseJsonFormat(boolean useJsonFormat) {
            this.useJsonFormat = useJsonFormat;
        }

        public static class Logstash {
            private boolean enabled = false;
            private String host = "localhost";
            private int port = 5000;
            private int queueSize = 512;

            public boolean isEnabled() {
                return enabled;
            }

            public String getHost() {
                return host;
            }

            public int getPort() {
                return port;
            }

            public int getQueueSize() {
                return queueSize;
            }

            public Logstash setEnabled(boolean enabled) {
                this.enabled = enabled;
                return this;
            }

            public Logstash setHost(String host) {
                this.host = host;
                return this;
            }

            public Logstash setPort(int port) {
                this.port = port;
                return this;
            }

            public Logstash setQueueSize(int queueSize) {
                this.queueSize = queueSize;
                return this;
            }
        }
    }

    public static class RegistryConfig {
        private String password;

        public String getPassword() {
            return password;
        }

        public RegistryConfig setPassword(String password) {
            this.password = password;
            return this;
        }
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

    public static class Swagger {
        private String title = "Application API";
        private String description = "API documentation";
        private String version = "0.0.1";
        private String termsOfServiceUrl;
        private String contactName;
        private String contactUrl;
        private String contactEmail;
        private String license;
        private String licenseUrl;
        private String defaultIncludePattern = "/api/.*";
        private String managementIncludePattern = "/management/.*";
        private String host;
        private String[] protocols = new String[0];
        private boolean useDefaultResponseMessages = true;

        public String getTitle() {
            return title;
        }

        public String getDescription() {
            return description;
        }

        public String getVersion() {
            return version;
        }

        public String getTermsOfServiceUrl() {
            return termsOfServiceUrl;
        }

        public String getContactName() {
            return contactName;
        }

        public String getContactUrl() {
            return contactUrl;
        }

        public String getContactEmail() {
            return contactEmail;
        }

        public String getLicense() {
            return license;
        }

        public String getLicenseUrl() {
            return licenseUrl;
        }

        public String getDefaultIncludePattern() {
            return defaultIncludePattern;
        }

        public String getManagementIncludePattern() {
            return managementIncludePattern;
        }

        public String getHost() {
            return host;
        }

        public String[] getProtocols() {
            return protocols;
        }

        public boolean isUseDefaultResponseMessages() {
            return useDefaultResponseMessages;
        }

        public Swagger setTitle(String title) {
            this.title = title;
            return this;
        }

        public Swagger setDescription(String description) {
            this.description = description;
            return this;
        }

        public Swagger setVersion(String version) {
            this.version = version;
            return this;
        }

        public Swagger setTermsOfServiceUrl(String termsOfServiceUrl) {
            this.termsOfServiceUrl = termsOfServiceUrl;
            return this;
        }

        public Swagger setContactName(String contactName) {
            this.contactName = contactName;
            return this;
        }

        public Swagger setContactUrl(String contactUrl) {
            this.contactUrl = contactUrl;
            return this;
        }

        public Swagger setContactEmail(String contactEmail) {
            this.contactEmail = contactEmail;
            return this;
        }

        public Swagger setLicense(String license) {
            this.license = license;
            return this;
        }

        public Swagger setLicenseUrl(String licenseUrl) {
            this.licenseUrl = licenseUrl;
            return this;
        }

        public Swagger setDefaultIncludePattern(String defaultIncludePattern) {
            this.defaultIncludePattern = defaultIncludePattern;
            return this;
        }

        public void setManagementIncludePattern(String managementIncludePattern) {
            this.managementIncludePattern = managementIncludePattern;
        }

        public Swagger setHost(String host) {
            this.host = host;
            return this;
        }

        public Swagger setProtocols(String[] protocols) {
            this.protocols = protocols;
            return this;
        }

        public Swagger setUseDefaultResponseMessages(boolean useDefaultResponseMessages) {
            this.useDefaultResponseMessages = useDefaultResponseMessages;
            return this;
        }
    }

    public static class Metrics {
        private final Logs logs = new Logs();

        public Logs getLogs() {
            return logs;
        }

        public static class Logs {
            private boolean enabled = false;
            private long reportFrequency = 60L;

            public boolean isEnabled() {
                return enabled;
            }

            public long getReportFrequency() {
                return reportFrequency;
            }

            public Logs setEnabled(boolean enabled) {
                this.enabled = enabled;
                return this;
            }

            public Logs setReportFrequency(long reportFrequency) {
                this.reportFrequency = reportFrequency;
                return this;
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
