package sld.ucm.gateway.web.rest.error;

import org.apache.commons.lang3.StringUtils;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.server.ServerWebExchange;
import org.zalando.problem.DefaultProblem;
import org.zalando.problem.Problem;
import org.zalando.problem.ProblemBuilder;
import org.zalando.problem.StatusType;
import org.zalando.problem.spring.webflux.advice.ProblemHandling;
import org.zalando.problem.spring.webflux.advice.security.SecurityAdviceTrait;
import org.zalando.problem.violations.ConstraintViolationProblem;
import reactor.core.publisher.Mono;
import sld.ucm.gateway.config.AppProperties;
import sld.ucm.gateway.config.Constants;

import javax.annotation.Nullable;
import java.net.URI;
import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;

/**
 * Controller advice to translate the server side exceptions to client-friendly json structures.
 * The error response follows RFC7807 - Problem Details for HTTP APIs (https://tools.ietf.org/html/rfc7807).
 */
@ControllerAdvice
public class ExceptionTranslator implements ProblemHandling, SecurityAdviceTrait {

    private static final String MESSAGE_KEY = "message";
    private final URI defaultType;
    private final Environment env;

    public ExceptionTranslator(Environment env, AppProperties appProperties) {
        this.defaultType = URI.create(appProperties.getErrors().getProblem_base_url() + "/problem-with-message");
        this.env = env;
    }

    /**
     * Post-process the Problem payload to add the message key for the front-end if needed.
     */
    @Override
    public Mono<ResponseEntity<Problem>> process(@Nullable ResponseEntity<Problem> entity, ServerWebExchange request) {
        if (entity == null) {
            return Mono.empty();
        }

        Problem problem = entity.getBody();
        if (!(problem instanceof ConstraintViolationProblem || problem instanceof DefaultProblem)) {
            return Mono.just(entity);
        }

        ProblemBuilder builder = Problem
                .builder()
                .withType(Problem.DEFAULT_TYPE.equals(problem.getType()) ? this.defaultType : problem.getType())
                .withStatus(problem.getStatus())
                .withTitle(problem.getTitle())
                .with("path", request.getRequest().getPath().value());
        if (problem instanceof ConstraintViolationProblem) {
            builder
                    .with("violations", ((ConstraintViolationProblem) problem).getViolations())
                    .with(MESSAGE_KEY, "error.validation");
        } else {
            builder.withCause(((DefaultProblem) problem).getCause()).withDetail(problem.getDetail()).withInstance(problem.getInstance());
            problem.getParameters().forEach(builder::with);
            if (!problem.getParameters().containsKey(MESSAGE_KEY) && problem.getStatus() != null) {
                builder.with(MESSAGE_KEY, "error.http." + problem.getStatus().getStatusCode());
            }
        }
        return Mono.just(new ResponseEntity<>(builder.build(), entity.getHeaders(), entity.getStatusCode()));
    }

    @Override
    public ProblemBuilder prepare(final Throwable throwable, final StatusType status, final URI type) {
        Collection<String> activeProfiles = Arrays.asList(env.getActiveProfiles());
        if (activeProfiles.contains(Constants.PROFILE_PROD)) {
            if (throwable instanceof HttpMessageConversionException) {
                return Problem
                        .builder()
                        .withType(type)
                        .withTitle(status.getReasonPhrase())
                        .withStatus(status)
                        .withDetail("Unable to convert http message")
                        .withCause(
                                Optional.ofNullable(throwable.getCause())
                                        .filter(cause -> isCausalChainsEnabled())
                                        .map(this::toProblem)
                                        .orElse(null)
                        );
            }
            if (containsPackageName(throwable.getMessage())) {
                return Problem
                        .builder()
                        .withType(type)
                        .withTitle(status.getReasonPhrase())
                        .withStatus(status)
                        .withDetail("Unexpected runtime exception")
                        .withCause(
                                Optional.ofNullable(throwable.getCause())
                                        .filter(cause -> isCausalChainsEnabled())
                                        .map(this::toProblem)
                                        .orElse(null)
                        );
            }
        }
        return Problem
                .builder()
                .withType(type)
                .withTitle(status.getReasonPhrase())
                .withStatus(status)
                .withDetail(throwable.getMessage())
                .withCause(
                        Optional.ofNullable(throwable.getCause())
                                .filter(cause -> isCausalChainsEnabled())
                                .map(this::toProblem)
                                .orElse(null)
                );
    }

    private boolean containsPackageName(String message) {
        // This list is for sure not complete
        return StringUtils.containsAny(message, "org.", "java.", "net.", "javax.", "com.", "io.", "de.", "sld.ucm.gateway");
    }
}
