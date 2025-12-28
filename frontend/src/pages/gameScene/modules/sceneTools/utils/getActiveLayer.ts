import type { Stage } from "konva/lib/Stage";
import SceneStore from "../../../store/SceneStore";
import Konva from "konva";

const getActiveLayer = (stage: Stage) => {
  return stage.findOne(`#${SceneStore.activeLayerId}`) as Konva.Layer;
};
export default getActiveLayer;
