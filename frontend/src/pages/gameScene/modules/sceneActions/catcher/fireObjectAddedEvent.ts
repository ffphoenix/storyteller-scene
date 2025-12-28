import type { ActionProducer } from "../types";
import type Konva from "konva";
import { checkObjectUUIDs } from "../utils/checkObjectUUIDs";

const fireObjectAddedEvent = (stage: Konva.Stage, producer: ActionProducer, object: Konva.Node, event?: any) => {
  // checkObjectUUIDs(object);
  // stage.fire("sc:object:added", { producer, target: object, e: event });
};
export default fireObjectAddedEvent;
