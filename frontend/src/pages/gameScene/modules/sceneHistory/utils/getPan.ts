import type Konva from "konva";
import type { MutableRefObject } from "react";

const getPan = (stageRef: MutableRefObject<Konva.Stage | null>) => {
  const stage = stageRef.current;
  if (!stage) return { x: 0, y: 0 };
  return { x: stage.x(), y: stage.y() };
};
export default getPan;
