# Dockerfile für Fly.io
#FROM openjdk:19
#
#ENV ENVIRONMENT=prod
#
#LABEL maintainer="tmai02476@gmail.com"
#
#EXPOSE 8080
#
#ADD backend/target/gameapprs.jar gameapprs.jar
#
#CMD ["sh", "-c", "java -jar /gameapprs.jar"]


# Verwende das Java 19 Image
FROM openjdk:19

# Setze das Arbeitsverzeichnis im Docker-Container
WORKDIR /app

# Kopiere die gebaute jar-Datei in den Container
COPY backend/target/gameapprs.jar gameapprs.jar

# Expose den Port, auf dem deine Anwendung läuft (falls erforderlich)
EXPOSE 8080

# Starte die Anwendung
CMD ["java", "-jar", "gameapprs.jar"]


