import type Konva from "konva";
import type { ActionProducer } from "../types";
import { checkObjectUUIDs } from "../utils/checkObjectUUIDs";

const fireObjectRemovedEvent = (
  stage: Konva.Stage,
  producer: ActionProducer,
  object: Konva.Node | Konva.Node[],
  event?: any,
) => {
  // checkObjectUUIDs(object);
  // stage.fire("sc:object:removed", { producer, target: object, e: event });
};
export default fireObjectRemovedEvent;
