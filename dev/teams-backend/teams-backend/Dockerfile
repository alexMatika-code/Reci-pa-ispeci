# Use a multi-stage build to minimize the final image size

# Stage 1: Build the application
FROM maven:3.9.4-eclipse-temurin-23 AS build
WORKDIR /app

# Copy the Maven project files
COPY pom.xml .
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime container
FROM eclipse-temurin:23-jre
WORKDIR /app

# Copy the Spring Boot application JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the application port (default for Spring Boot is 8080)
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
