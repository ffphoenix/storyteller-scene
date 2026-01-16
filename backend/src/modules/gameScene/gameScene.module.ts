import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameSceneEntity } from './infrastructure/persistence/typeorm/entities/gameScene.entity';
import { GameSceneLayerEntity } from './infrastructure/persistence/typeorm/entities/gameSceneLayer.entity';
import { GameSceneRepository } from './infrastructure/persistence/typeorm/repositories/gameScene.repository';
import { IGameSceneRepository } from './domain/repositories/gameScene.repository.interface';
import { GameSceneController } from './presentation/rest/gameScene.controller';
import { GameSceneGateway } from './presentation/websockets/gameScene.gateway';
import {
  CreateGameSceneHandler,
  UpdateGameSceneHandler,
  DeleteGameSceneHandler,
} from './application/commands/handlers/gameScene.handlers';
import {
  CreateSceneLayerHandler,
  UpdateSceneLayerHandler,
  DeleteSceneLayerHandler,
} from './application/commands/handlers/sceneLayer.handlers';
import {
  AddSceneObjectHandler,
  ModifySceneObjectHandler,
  DeleteSceneObjectHandler,
} from './application/commands/handlers/sceneObject.handlers';
import {
  GetGameScenesHandler,
  GetGameSceneByIdHandler,
  GetSceneLayersHandler,
  GetActiveGameSceneByGameIdHandler,
} from './application/queries/handlers/gameSceneQuery.handlers';
import { CreateDefaultSceneOnGameCreatedHandler } from './application/events/handlers/gameCreated.handlers';
import { MessagesRegistry } from '../massaging/MessagesRegistry';
import Commands from './application/commands/impl';
import { Events } from './domain/events';
import { MessagingModule } from '../massaging/messaging.module';

const CommandHandlers = [
  CreateGameSceneHandler,
  UpdateGameSceneHandler,
  DeleteGameSceneHandler,
  CreateSceneLayerHandler,
  UpdateSceneLayerHandler,
  DeleteSceneLayerHandler,
  AddSceneObjectHandler,
  ModifySceneObjectHandler,
  DeleteSceneObjectHandler,
];

const QueryHandlers = [GetGameScenesHandler, GetGameSceneByIdHandler, GetSceneLayersHandler, GetActiveGameSceneByGameIdHandler];
const EventHandlers = [CreateDefaultSceneOnGameCreatedHandler];

MessagesRegistry.register(Commands);
MessagesRegistry.register(Events);

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([GameSceneEntity, GameSceneLayerEntity]), MessagingModule],
  controllers: [GameSceneController],
  providers: [
    {
      provide: IGameSceneRepository,
      useClass: GameSceneRepository,
    },
    GameSceneGateway,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
})
export class GameSceneModule {}
