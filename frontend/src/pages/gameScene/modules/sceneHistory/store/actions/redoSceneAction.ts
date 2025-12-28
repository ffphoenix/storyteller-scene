import type Konva from "konva";
import SceneHistoryStore from "../SceneHistoryStore";
import type { MutableRefObject } from "react";
import doHistoryAction from "./doHistoryAction";
import { getObjectTransformProps } from "../../utils/getObjectTransformProps";
import { toJS } from "mobx";

const redoSceneAction = (stageRef: MutableRefObject<Konva.Stage | null>) => {
  const stage = stageRef.current;
  if (!stage) return;

  const historyItem = SceneHistoryStore.latestRedoHistoryItem;
  if (!historyItem) return;

  try {
    const { originalProps, object, action, pan } = toJS(historyItem);
    let transformProps;
    if (Array.isArray(object)) {
      object.forEach((obj: any) => {
        doHistoryAction("redo", stage, action, obj, pan, originalProps);
      });
    } else {
      transformProps = getObjectTransformProps(object as Konva.Node);
      doHistoryAction("redo", stage, action, object as Konva.Node, pan, originalProps);
    }

    SceneHistoryStore.popRedoHistoryItem();
    SceneHistoryStore.addUndoHistoryItem(action, { pan, object, originalProps: transformProps }, true);
  } catch (e) {
    console.error(e);
    SceneHistoryStore.popRedoHistoryItem();
  }
  stage.batchDraw();
};

export default redoSceneAction;
