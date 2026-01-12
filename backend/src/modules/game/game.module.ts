import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from './infrastructure/persistence/entities/game.entity';
import { GameRepository } from './infrastructure/repositories/game.repository';
import { IGameRepository } from './domain/repositories/game.repository.interface';
import { GameController } from './presentation/controllers/game.controller';
import {
  CreateGameHandler,
  ModifyGameHandler,
  StartGameHandler,
  DeleteGameHandler,
} from './application/commands/handlers/game-command.handlers';
import { GetMyGamesHandler, GetGameDataHandler } from './application/queries/handlers/game-query.handlers';
import GameCommands from './application/commands/impl/game.commands';
import { GameCreatedEvent, GameDeletedEvent, GameModifiedEvent, GameStartedEvent } from './domain/events/game.events';
import { MessagingModule } from '../massaging/messaging.module';
import { MessagesRegistry } from '../massaging/MessagesRegistry';

const CommandHandlers = [CreateGameHandler, ModifyGameHandler, StartGameHandler, DeleteGameHandler];
const QueryHandlers = [GetMyGamesHandler, GetGameDataHandler];

MessagesRegistry.register(GameCommands);
MessagesRegistry.register([GameCreatedEvent, GameDeletedEvent, GameStartedEvent, GameModifiedEvent]);

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([GameEntity]), MessagingModule],
  controllers: [GameController],
  providers: [
    {
      provide: IGameRepository,
      useClass: GameRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class GameModule {}
