import { Inject, Post } from '@nestjs/common';
import { Payload } from "@nestjs/microservices";
import { SubscribeTo, KafkaService } from '../../../src';
import { KafkaMessageSend } from '../../../src/interfaces';

export const TOPIC_NAME = 'test';

export class TestConsumer {

  // Used to log the errors for testing.
  messages = [];

  constructor(
    @Inject('KAFKA_SERVICE') private client: KafkaService
  ) {
  }

  onModuleInit(): void {
    this.client.subscribeToResponseOf(TOPIC_NAME, this)
  }

  @SubscribeTo(TOPIC_NAME)
  async message(@Payload() data: any): Promise<void> {
    this.messages.push(data);
    console.log('message received from kafka', data);
  }

  @Post()
  async sendMessage(event: KafkaMessageSend) {
    const a = {
      ...event,
      topic: TOPIC_NAME,
    }
    console.log('message sent to kafka', event.messages);
    return await this.client.send(a);
  }
}
