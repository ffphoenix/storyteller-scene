import type Konva from "konva";

export const checkObjectUUIDs = (object: Konva.Node | Konva.Node[]) => {
  if (Array.isArray(object)) {
    for (const obj of object) {
      if (!obj.getAttr("UUID")) throw new Error("Object must have UUID");
    }
  } else if (!object.getAttr("UUID")) throw new Error("Object must have UUID");
};
