import { type MutableRefObject, useEffect } from "react";
import SceneHistoryStore from "./store/SceneHistoryStore";
import type Konva from "konva";
import isKeyDownInterceptable from "../../utils/isKeyDownInterceptable";
import undoSceneAction from "./store/actions/undoSceneAction";
import redoSceneAction from "./store/actions/redoSceneAction";
import getPan from "./utils/getPan";
import { autorun, toJS } from "mobx";

export default function useSceneHistory(stageRef: MutableRefObject<Konva.Stage | null>) {
  useEffect(() => {
    autorun(
      () => {
        console.log("Scene History UNDO changed", toJS(SceneHistoryStore.undoHistory));
        console.log("Scene History REDO changed", toJS(SceneHistoryStore.redoHistory));
      },
      { delay: 500 },
    );
    const stage = stageRef.current;
    if (!stage) return;

    const onObjectAdded = (e: any) => {
      const object = e.target;
      console.log("[object:added][history]", object);
      SceneHistoryStore.addUndoHistoryItem("add", { pan: getPan(stageRef), object });
    };
    stage.on("sc:object:added", onObjectAdded);

    const onObjectModified = (e: any) => {
      const object = e.target;
      // Konva doesn't have transform.original, we might need to store it before drag
      SceneHistoryStore.addUndoHistoryItem("modify", {
        object,
        pan: getPan(stageRef),
        originalProps: e.originalProps ?? undefined,
        actionType: e.actionType,
      });
    };
    stage.on("sc:object:modified", onObjectModified);

    const onObjectRemoved = ({ producer, target }: any) => {
      if (producer !== "self") return;
      SceneHistoryStore.addUndoHistoryItem("remove", { pan: getPan(stageRef), object: target });
    };
    stage.on("sc:object:removed", onObjectRemoved);

    const onKeyDown = (e: KeyboardEvent) => {
      if (!isKeyDownInterceptable(e, stage)) return;
      const isCtrlOrMeta = e.ctrlKey || e.metaKey;
      if (isCtrlOrMeta && e.code === "KeyZ") {
        console.log(`[history][ctrl + z][shift: ${e.shiftKey}]`);

        if (e.shiftKey) {
          redoSceneAction(stageRef);
        } else {
          undoSceneAction(stageRef);
        }

        e.preventDefault();
        return;
      }
      if (isCtrlOrMeta && e.code === "KeyY") {
        redoSceneAction(stageRef);
        e.preventDefault();
        return;
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      stage.off("sc:object:added", onObjectAdded);
      stage.off("sc:object:modified", onObjectModified);
      stage.off("sc:object:removed", onObjectRemoved);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);
}
