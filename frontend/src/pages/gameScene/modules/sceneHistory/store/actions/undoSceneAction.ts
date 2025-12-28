import type Konva from "konva";
import SceneHistoryStore from "../SceneHistoryStore";
import type { MutableRefObject } from "react";
import doHistoryAction from "./doHistoryAction";
import { getObjectTransformProps } from "../../utils/getObjectTransformProps";
import { toJS } from "mobx";

const undoSceneAction = (stageRef: MutableRefObject<Konva.Stage | null>) => {
  const stage = stageRef.current;
  if (!stage) return;

  const historyItem = SceneHistoryStore.latestUndoHistoryItem;
  if (!historyItem) return;

  if (historyItem.action === "modify" && !historyItem.originalProps) return;

  try {
    const { originalProps, object, action, pan } = toJS(historyItem);
    let transformProps;

    // Simplification for Konva: handle multi-selection by iterating or creating a group if needed
    // For now, let's focus on single objects or simple arrays
    if (Array.isArray(object)) {
      // @TODO: handle multi-object undo/redo properly in Konva
      object.forEach((obj: any) => {
        doHistoryAction("undo", stage, action, obj, pan, originalProps);
      });
    } else {
      transformProps = getObjectTransformProps(object as Konva.Node);
      doHistoryAction("undo", stage, action, object as Konva.Node, pan, originalProps);
    }

    SceneHistoryStore.popUndoHistoryItem();
    SceneHistoryStore.addRedoHistoryItem(action, { pan, object, originalProps: transformProps });
  } catch (e) {
    console.error(e);
    SceneHistoryStore.popUndoHistoryItem();
  }
  stage.batchDraw();
};
export default undoSceneAction;
