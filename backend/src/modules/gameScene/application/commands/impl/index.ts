import { AddSceneObjectCommand } from './addSceneObject.command';
import { CreateGameSceneCommand } from './createGameScene.command';
import { CreateSceneLayerCommand } from './createSceneLayer.command';
import { DeleteGameSceneCommand } from './deleteGameScene.command';
import { DeleteSceneLayerCommand } from './deleteSceneLayer.command';
import { DeleteSceneObjectCommand } from './deleteSceneObject.command';
import { ModifySceneObjectCommand } from './modifySceneObject.command';
import { UpdateGameSceneCommand } from './updateGameScene.command';
import { UpdateSceneLayerCommand } from './updateSceneLayer.command';

export default [
  AddSceneObjectCommand,
  CreateGameSceneCommand,
  CreateSceneLayerCommand,
  DeleteGameSceneCommand,
  DeleteSceneLayerCommand,
  DeleteSceneObjectCommand,
  ModifySceneObjectCommand,
  UpdateGameSceneCommand,
  UpdateSceneLayerCommand,
];
