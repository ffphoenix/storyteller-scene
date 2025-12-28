import type Konva from "konva";
import { checkObjectUUIDs } from "../utils/checkObjectUUIDs";
import type { ModifyActionType } from "../types";

const fireObjectModifiedEvent = (stage: Konva.Stage, event: Konva.KonvaEventObject<any>) => {
  // const target = event.target;
  // const producer = target.getAttr("changeMadeBy") ?? "self";
  // if (producer !== "self") return;
  //
  // if (target.getAttr("isChangedByHistory")) {
  //   target.setAttr("isChangedByHistory", false);
  //   return;
  // }
  //
  // const objects = [target];
  // checkObjectUUIDs(objects);

  // Konva doesn't have a direct 'actionType' in move events, but we can infer it
  // if we're using a Transformer, we'd listen to its events.
  // For now, let's assume 'drag' as it's the most common manual modification.
  const actionType: ModifyActionType = "drag";

  // stage.fire("sc:object:modified", { producer, target: objects, actionType });
};
export default fireObjectModifiedEvent;
