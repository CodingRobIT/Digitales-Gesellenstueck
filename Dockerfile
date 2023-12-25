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

# Schritt 1: Baue die Anwendung mit Maven
FROM maven:3.8.1-jdk-11 as builder

# Setze das Arbeitsverzeichnis im Docker-Container
WORKDIR /app

# Kopiere die Maven-Konfigurationsdateien (pom.xml)
COPY pom.xml .

# Lade alle Abhängigkeiten herunter (für effizientere Docker-Builds)
RUN mvn dependency:go-offline

# Kopiere den Quellcode
COPY backend/src ./src

# Baue das Projekt und erstelle die jar-Datei
RUN mvn package

# Schritt 2: Erstelle das endgültige Docker-Image
FROM openjdk:19

# Umgebungsvariable setzen
ENV ENVIRONMENT=prod

# Label für den Wartungsverantwortlichen
LABEL maintainer="tmai02476@gmail.com"

# Expose den Port, auf dem deine Anwendung läuft
EXPOSE 8080

# Kopiere die gebaute jar-Datei aus dem Builder-Stage
COPY --from=builder /app/backend/target/gameapprs.jar gameapprs.jar

# Starte die Anwendung
CMD ["java", "-jar", "gameapprs.jar"]
