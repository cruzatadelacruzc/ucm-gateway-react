package sld.ucm.gateway.config.metric;

import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Slf4jReporter;
import io.micrometer.core.instrument.Clock;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.dropwizard.DropwizardConfig;
import io.micrometer.core.instrument.dropwizard.DropwizardMeterRegistry;
import io.micrometer.core.instrument.util.HierarchicalNameMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;
import org.slf4j.MarkerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import sld.ucm.gateway.config.AppProperties;

import java.util.concurrent.TimeUnit;

@Configuration
@ConditionalOnProperty({"application.metrics.logs.enabled"})
public class GatewayLoggingMetricsExportConfiguration {
    private final Logger log = LoggerFactory.getLogger(GatewayLoggingMetricsExportConfiguration.class);

    private final AppProperties properties;

    public GatewayLoggingMetricsExportConfiguration(AppProperties appProperties) {
        this.properties = appProperties;
    }

    @Bean
    public MetricRegistry dropwizardRegistry () {
        return new MetricRegistry();
    }

    @Bean
    public Slf4jReporter consoleReporter(MetricRegistry dropwizardRegistry) {
        log.info("Initializing Metrics Log reporting");
        Marker metricsMarker = MarkerFactory.getMarker("metrics");
        Slf4jReporter reporter = Slf4jReporter
                .forRegistry(dropwizardRegistry)
                .outputTo(LoggerFactory.getLogger("metrics"))
                .markWith(metricsMarker)
                .convertRatesTo(TimeUnit.SECONDS)
                .convertDurationsTo(TimeUnit.MILLISECONDS)
                .build();
        reporter.start(properties.getMetrics().getLogs().getReportFrequency(), TimeUnit.SECONDS);
        return reporter;
    }

    @Bean
    public MeterRegistry consoleLoggingRegistry(MetricRegistry dropwizardRegistry) {
        DropwizardConfig dropwizardConfig = new DropwizardConfig() {
            public String prefix() {
                return "console";
            }

            public String get(String key) {
                return null;
            }
        };
        return new DropwizardMeterRegistry(dropwizardConfig, dropwizardRegistry, HierarchicalNameMapper.DEFAULT, Clock.SYSTEM) {
            protected Double nullGaugeValue() {
                return null;
            }
        };
    }
}
