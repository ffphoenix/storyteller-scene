import ApiClient from "../../../../utils/apiClient";
import sceneStore from "../SceneStore";

export default async function loadScene(shortURL: string) {
  try {
    const game = (await ApiClient.games.findOne(shortURL)).data;
    const scene = (await ApiClient.gamesScenes.findActive(game.id.toString())).data;
    sceneStore.updateSceneData(scene);
  } catch (e) {
    console.error(e);
  }
}
