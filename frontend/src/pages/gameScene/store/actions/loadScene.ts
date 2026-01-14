import ApiClient from "../../../../utils/apiClient";
import { runInAction } from "mobx";
import sceneStore, { type SceneLayer } from "../SceneStore";

export default function loadScene(shortURL: string) {
  ApiClient.games.findOne(shortURL).then((response) => {
    runInAction(() => {
      const game = response.data;
      ApiClient.gameScenes.findActive(game.id.toString()).then((sceneResponse) => {
        const scene = sceneResponse.data;

        sceneStore.activeSceneId = scene.id;
        sceneStore.stageJSON = scene.stageJSON;
        const sceneLayers = scene.layers as SceneLayer[];
        sceneStore.layers.list = sceneLayers;
        sceneStore.layers.activeLayerId = sceneLayers[0]?.id;
      });
    });
  });
}
