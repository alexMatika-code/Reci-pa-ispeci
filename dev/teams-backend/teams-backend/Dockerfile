# Stage 1: Build the application
FROM openjdk:17-jdk AS build
WORKDIR /app

# Copy Maven wrapper and project files
COPY pom.xml ./
COPY mvnw ./
COPY .mvn .mvn
COPY src ./src

# Stage 2: Create the final image
FROM openjdk:17-jdk
WORKDIR /app
VOLUME /tmp

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the application port and set the entrypoint
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]