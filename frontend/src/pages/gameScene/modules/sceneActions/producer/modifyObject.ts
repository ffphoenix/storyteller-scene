import type Konva from "konva";
import { setPanKeepingZoom } from "../../sceneHistory/utils/setPanKeepingZoom";

const modifyObject = (stage: Konva.Stage, object: Konva.Node, originalProps: any, pan: { x: number; y: number }) => {
  object.setAttrs({ ...originalProps, isChangedByHistory: true });
  setPanKeepingZoom(stage, pan);
};

export default modifyObject;
