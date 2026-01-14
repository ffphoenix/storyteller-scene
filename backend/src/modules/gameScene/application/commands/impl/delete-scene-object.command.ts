import { IKafkaCommand } from '../../../../../common/interfaces/messaging.interfaces';
import { KonvaNode } from '../../../domain/aggregates/game-scene.aggregate';

export class DeleteSceneObjectCommand extends IKafkaCommand {
  constructor(
    public readonly sceneId: string,
    public readonly layerId: string,
    public readonly payload: KonvaNode[],
  ) {
    super('game-scene.command.delete-object');
  }
}
