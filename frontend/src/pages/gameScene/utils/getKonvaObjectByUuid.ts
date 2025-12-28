import type Konva from "konva";

export const getKonvaObjectByUuid = (stage: Konva.Stage, uuid: string) => {
  return stage.findOne(`#${uuid}`);
};
