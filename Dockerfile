FROM eclipse-temurin:11-jre-alpine
VOLUME /tmp
ARG EXTRACTED=target/extracted
COPY ${EXTRACTED}/dependencies/ ./
COPY ${EXTRACTED}/snapshot-dependencies/ ./
COPY ${EXTRACTED}/spring-boot-loader/ ./
COPY ${EXTRACTED}/application/ ./
ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]
