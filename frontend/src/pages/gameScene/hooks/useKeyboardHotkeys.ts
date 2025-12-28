import { type MutableRefObject, useEffect } from "react";
import Konva from "konva";
import isKeyDownInterceptable from "../utils/isKeyDownInterceptable";
import fireObjectRemovedEvent from "../modules/sceneActions/catcher/fireObjectRemovedEvent";

const handleDeleteSelected = (stage: Konva.Stage) => {
  if (!stage) return;
  // Konva doesn't have a direct 'getActiveObjects' but we can find them if we use a Transformer
  // or by name/tag. For now, let's assume objects have 'name: object' and we might want to delete
  // nodes that are selected. Without a full selection system integrated yet,
  // we'll just implement a placeholder or use stage selection if implemented.

  // Example of finding nodes with name 'object' that might be considered "selected":
  // This is just a placeholder until a proper selection system (Transformer) is in place.
  const selectedNodes: Konva.Node[] = [];
  // stage.find('.selected') ...

  if (selectedNodes.length) {
    selectedNodes.forEach((o) => o.destroy());
    stage.batchDraw();
    fireObjectRemovedEvent(stage, "self", selectedNodes);
  }
};

const useKeyboardHotkeys = (stageRef: MutableRefObject<Konva.Stage | null>) => {
  useEffect(() => {
    if (!stageRef.current) return;
    const stage = stageRef.current;

    const onKeyDown = (e: KeyboardEvent) => {
      if (!isKeyDownInterceptable(e, stage)) return;
      if (e.code === "Delete" || e.code === "Backslash") {
        console.log("Delete/Backspace pressed");
        handleDeleteSelected(stage);

        // prevent navigating back on Backspace when nothing is focused
        e.preventDefault();
        return;
      }

      // Escape: cancel measuring / arrow drawing
      if (e.code === "Escape") {
        // @TODO: implement escape logic for Konva if needed
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
};

export default useKeyboardHotkeys;
