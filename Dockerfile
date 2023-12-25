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


# Benutzerdefiniertes Image mit JDK 19 und Maven
FROM openjdk:19

# Installiere Maven
RUN apt-get update && \
    apt-get install -y maven

# Setze das Arbeitsverzeichnis im Docker-Container
WORKDIR /app

# Kopiere die Maven-Konfigurationsdateien (pom.xml) und den Quellcode
COPY backend/pom.xml .
COPY backend/src ./src

# Baue das Projekt und erstelle die jar-Datei
RUN mvn package

# Starte die Anwendung
CMD ["java", "-jar", "gameapprs.jar"]

