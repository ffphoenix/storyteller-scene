import type Konva from "konva";
import { getKonvaObjectByUuid } from "../../../utils/getKonvaObjectByUuid";

const removeObject = (stage: Konva.Stage, object: Konva.Node) => {
  const objectToDelete = getKonvaObjectByUuid(stage, object.getAttr("UUID") ?? "");
  if (!objectToDelete) throw new Error(`Cannot delete object - object not found by UUID: ${object.getAttr("UUID")}`);
  objectToDelete.setAttr("isChangedByHistory", true);
  objectToDelete.destroy();
  stage.batchDraw();
};
export default removeObject;
