# Dockerfile für Fly.io
FROM openjdk:19

ENV ENVIRONMENT=prod

LABEL maintainer="tmai02476@gmail.com"

EXPOSE 8080

ADD backend/target/gameapprs.jar gameapprs.jar

CMD ["sh", "-c", "java -jar /gameapprs.jar"]


