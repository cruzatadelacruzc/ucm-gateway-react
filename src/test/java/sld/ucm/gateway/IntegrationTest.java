package sld.ucm.gateway;

import org.springframework.boot.test.context.SpringBootTest;
import sld.ucm.gateway.config.TestSecurityConfiguration;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(classes = { GatewayApplication.class, TestSecurityConfiguration.class })
public @interface IntegrationTest {
}
