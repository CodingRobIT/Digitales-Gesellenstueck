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

# Schritt 1: Baue die Anwendung mit einer Maven-Version, die Java 19 unterstützt
# Ersetze dieses Image durch ein geeignetes, das Java 19 und Maven enthält
#FROM maven:3.8.1-jdk-19 as builder
FROM openjdk:19

# Setze das Arbeitsverzeichnis im Docker-Container
WORKDIR /app

# Kopiere die Maven-Konfigurationsdateien (pom.xml)
# Stelle sicher, dass die pom.xml im Root-Verzeichnis oder im 'backend'-Verzeichnis liegt
COPY backend/pom.xml .

# Lade alle Abhängigkeiten herunter (für effizientere Docker-Builds)
RUN mvn dependency:go-offline

# Kopiere den Quellcode aus dem 'backend/src'-Verzeichnis
COPY backend/src ./src

# Baue das Projekt und erstelle die jar-Datei
RUN mvn package

# Schritt 2: Erstelle das endgültige Docker-Image mit Java 19
FROM openjdk:19

# Umgebungsvariable setzen
ENV ENVIRONMENT=prod

# Label für den Wartungsverantwortlichen
LABEL maintainer="tmai02476@gmail.com"

# Expose den Port, auf dem deine Anwendung läuft
EXPOSE 8080

# Kopiere die gebaute jar-Datei aus dem Builder-Stage
# Stelle sicher, dass der Pfad zur jar-Datei korrekt ist
COPY --from=builder /app/target/gameapprs.jar gameapprs.jar

# Starte die Anwendung
CMD ["java", "-jar", "gameapprs.jar"]

