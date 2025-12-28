import type Konva from "konva";
import removeObject from "../../../sceneActions/producer/removeObject";
import modifyObject from "../../../sceneActions/producer/modifyObject";
import addObject from "../../../sceneActions/producer/addObject";

export const doHistoryAction = (
  queue: "undo" | "redo",
  stage: Konva.Stage,
  action: "add" | "modify" | "remove",
  object: Konva.Node,
  pan: { x: number; y: number },
  originalProps: any = {},
) => {
  const undoMapByAction = {
    add: () => removeObject(stage, object),
    modify: () => modifyObject(stage, object, originalProps, pan),
    remove: () => addObject(stage, object, pan),
  };

  const redoMapByAction = {
    add: () => addObject(stage, object, pan),
    modify: () => modifyObject(stage, object, originalProps, pan),
    remove: () => removeObject(stage, object),
  };

  const actionMap = queue === "undo" ? undoMapByAction : redoMapByAction;
  const actionFunction = actionMap[action];
  if (!action) throw new Error(`Cannot perform action ${action}`);
  actionFunction();
};
export default doHistoryAction;
