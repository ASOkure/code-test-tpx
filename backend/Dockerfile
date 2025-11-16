
# Use a slim JDK 17 image
FROM eclipse-temurin:17-jdk-jammy as build

WORKDIR /workspace

# copy maven files and download dependencies
COPY pom.xml mvnw ./
COPY .mvn .mvn
RUN ./mvnw -q dependency:go-offline

# copy sources and build
COPY src src
RUN ./mvnw -q clean package -DskipTests

# runtime image
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
# copy jar from build stage
COPY --from=build /workspace/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]

