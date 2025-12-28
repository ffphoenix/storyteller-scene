import type { Stage } from "konva/lib/Stage";
import SceneStore from "../../../store/SceneStore";
import Konva from "konva";

const drawActiveLayer = (stage: Stage) => {
  const layer = stage.findOne(`#${SceneStore.activeLayerId}`) as Konva.Layer;
  layer.batchDraw();
};
export default drawActiveLayer;
