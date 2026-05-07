FROM eclipse-temurin:21-jre

ENV ENVIRONMENT=prod
LABEL maintainer="tmai02476@gmail.com"

EXPOSE 8080

ADD backend/target/gameapprs.jar gameapprs.jar

CMD ["java", "-jar", "/gameapprs.jar"]
