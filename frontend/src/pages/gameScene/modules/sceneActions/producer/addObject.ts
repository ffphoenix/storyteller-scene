import type Konva from "konva";
import { setPanKeepingZoom } from "../../sceneHistory/utils/setPanKeepingZoom";

const addObject = (stage: Konva.Stage, object: Konva.Node, pan: { x: number; y: number }) => {
  const layer = stage.getLayers()[0];

  const clone = object.clone();
  clone.setAttr("isChangedByHistory", true);
  layer.add(clone);

  setPanKeepingZoom(stage, pan);
};

export default addObject;
