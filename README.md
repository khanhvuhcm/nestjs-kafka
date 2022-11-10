# Docker + NestJS + KafkaJS + Kafka - Schema Registry (Avro) - Kafdrop

Integration of KafkaJS with NestJS@microservice to build event driven microservices.

## Requirements
1. Docker and docker-compose
2. NodeJS >= 14.x

## Setup
- Download and unzip the project to some folder, for example "nestjs-kafka", then cd to the folder:
- ```cd nestjs-kafka```
- Start the containers:
- ```cd kafka && docker-compose up -d```
- Read kafka/docker-compose.yml to see the containers and ports
- Install the dependencies:
- ```npm install```
- Run e2e test 1st time to create kafka topic and upload schema to schema-registry.
- ```npm run test:e2e```
## Run
- Run e2e test to see the message being sent and consumed.
- ```npm run test:e2e```
- Read the test/app/* and test/e2e/app/test.controller.ts file to understand how to use the module.
- Access Kafdrop http://localhost:9000/ or use commandline to see topics, messages, schemas...
+ ```cd kafka```
+ ```docker-compose exec broker kafka-topics --list --bootstrap-server localhost:9092```
+ ```docker-compose exec broker kafka-topics --describe --topic test --bootstrap-server localhost:9092```
+ ```docker-compose exec broker kafka-console-consumer --topic test --from-beginning --bootstrap-server localhost:9092```
+ ```docker-compose exec schema-registry curl -X GET http://localhost:8081/subjects```
+ ```docker-compose exec schema-registry curl -X GET http://localhost:8081/subjects/test-value/versions/latest```


