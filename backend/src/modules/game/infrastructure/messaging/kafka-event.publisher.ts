import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Kafka, Producer } from 'kafkajs';
import { GameCreatedEvent, GameModifiedEvent, GameStartedEvent, GameDeletedEvent } from '../../domain/events/game.events';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KafkaEventPublisher implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;

  constructor(private configService: ConfigService) {
    const brokerConfig = this.configService.get<string>('KAFKA_BROKER');
    if (!brokerConfig) throw new Error('KAFKA_BROKER is not set');

    this.kafka = new Kafka({
      clientId: 'game-service',
      brokers: [brokerConfig],
    });
    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }

  async publish(event: any) {
    const topic = `game.${event.constructor.name}`;
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(event) }],
    });
  }
}

@EventsHandler(GameCreatedEvent, GameModifiedEvent, GameStartedEvent, GameDeletedEvent)
export class GameEventsHandler implements IEventHandler<GameCreatedEvent | GameModifiedEvent | GameStartedEvent | GameDeletedEvent> {
  constructor(private readonly kafkaPublisher: KafkaEventPublisher) {}

  async handle(event: GameCreatedEvent | GameModifiedEvent | GameStartedEvent | GameDeletedEvent) {
    await this.kafkaPublisher.publish(event);
  }
}
