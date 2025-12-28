import type { Stage } from "konva/lib/Stage";
import type { MutableRefObject } from "react";

export default (stage: Stage, containerRef: MutableRefObject<HTMLElement | null>) => {
  if (!containerRef.current) return;
  const { clientWidth, clientHeight } = containerRef.current;
  const height = Math.max(clientHeight, window.innerHeight);
  const width = Math.max(clientWidth, 800);

  stage.width(width);
  stage.height(height);
};
