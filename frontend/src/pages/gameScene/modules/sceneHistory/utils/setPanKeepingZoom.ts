import type Konva from "konva";

export const setPanKeepingZoom = (stage: Konva.Stage, pan: { x: number; y: number }) => {
  stage.position(pan);
  stage.batchDraw();
};
