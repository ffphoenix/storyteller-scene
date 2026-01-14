import type { SceneActionEvent } from "../sceneActions/types";
import SceneStore from "../../store/SceneStore";
import socketManager from "../../../../utils/socketManager";
import CurrentUser from "../../../../globalStore/users/CurrentUser";
import nodesToJSON from "../../utils/nodes/nodesToJSON";
import getNodeTransformProps from "../sceneTransformer/getNodeTransformProps";
import type Konva from "konva";
import { useEffect } from "react";

const useSceneSocket = () => {
  const socket = socketManager.socket("/game-scene");
  socket.connect();
  useEffect(() => {
    const onObjectAdded = (event: CustomEvent<SceneActionEvent>) => {
      console.log(event);
      if (event.detail.producer !== "self") return;
      const { nodes, layerId } = event.detail;
      console.log(CurrentUser);
      socket.emit("addObject", { layerId, sceneId: SceneStore.activeSceneId, payload: nodesToJSON(nodes) });
    };

    document.addEventListener("sc:object:added", onObjectAdded as EventListener);

    const onObjectModified = (e: CustomEvent<SceneActionEvent>) => {
      if (e.detail.producer !== "self") return;
      const { layerId, actionType, originalProps, transformer, nodes } = e.detail;
      if (!transformer) throw new Error("Transformer is required");
      const nodesJSON = nodesToJSON(transformer.nodes());
      socket.emit("modifyObject", {
        actionType,
        layerId,
        sceneId: SceneStore.activeSceneId,
        payload: nodesJSON,
        currentGroupProps: { ...getNodeTransformProps(nodes as Konva.Shape), x: transformer.x(), y: transformer.y() },
        originalGroupProps: originalProps,
      });
    };
    document.addEventListener("sc:object:modified", onObjectModified as EventListener);

    const onObjectRemoved = (e: CustomEvent<SceneActionEvent>) => {
      const { nodes, layerId, producer } = e.detail;
      if (producer !== "self") return;

      socket.emit("deleteObject", { layerId, sceneId: SceneStore.activeSceneId, payload: nodesToJSON(nodes) });
    };
    document.addEventListener("sc:object:removed", onObjectRemoved as EventListener);
    return () => {
      document.removeEventListener("sc:object:added", onObjectAdded as EventListener);
      document.removeEventListener("sc:object:modified", onObjectModified as EventListener);
      document.removeEventListener("sc:object:removed", onObjectRemoved as EventListener);
    };
  }, []);
};
export default useSceneSocket;
