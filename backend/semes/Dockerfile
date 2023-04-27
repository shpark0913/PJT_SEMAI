FROM openjdk:11-jdk-alpine
VOLUME /tmp
EXPOSE 8888
ARG JAR_FILE=build/libs/\*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
ENV TZ=Asia/Seoul
RUN apk --no-cache add tzdata && \
  cp /usr/share/zoneinfo/$TZ /etc/localtime && \
  echo $TZ > /etc/timezone \
  apk del tzdata
