import Konva from "konva";
import type { Stage } from "konva/lib/Stage";
import type { MouseHandlers } from "../useSceneTools";
import getActiveLayer from "../utils/getActiveLayer";
import drawActiveLayer from "../utils/drawActiveLayer";

const onMouseUpSelectByClick = (
  stage: Stage,
  e: Konva.KonvaEventObject<MouseEvent>,
  transformer: Konva.Transformer,
) => {
  const node = e.target as Konva.Node;
  // clicked on transformer - do nothing
  if (node.getParent() === transformer || node === transformer) {
    return;
  }

  // clicked on empty area - remove all selections
  if (node === stage) {
    transformer.nodes([]);
    drawActiveLayer(stage);
    return;
  }

  // click on non-object
  if (!node.hasName("object")) {
    transformer.nodes([]);
    drawActiveLayer(stage);
    return;
  }
  node.setDraggable(true);

  // clicked on some node
  const isSelected = transformer.nodes().includes(node);

  if (!e.evt.shiftKey && !isSelected) {
    // select only one
    transformer.nodes([node]);
  } else if (e.evt.shiftKey && isSelected) {
    // remove from selection
    const nodes = transformer.nodes().slice(); // clone array
    nodes.splice(nodes.indexOf(node), 1);
    transformer.nodes(nodes);
  } else if (e.evt.shiftKey && !isSelected) {
    // add to selection
    const nodes = transformer.nodes().concat([node]);
    transformer.nodes(nodes);
  }
  stage.batchDraw();
};

const onMouseUpSelectByArea = (stage: Stage, transformer: Konva.Transformer, selectionRectangle: Konva.Rect) => {
  setTimeout(() => {
    selectionRectangle.visible(false);
  });
  const box = selectionRectangle.getClientRect();
  const selected = getActiveLayer(stage).getChildren((node) => {
    return (
      Konva.Util.haveIntersection(box, node.getClientRect()) &&
      node.id() !== "selection-rectangle" &&
      node !== transformer
    );
  });
  selected.forEach((node) => node.setDraggable(true));
  transformer.nodes(selected);
  transformer.moveToTop();
  stage.batchDraw();
};

const getSelectHandlers = (stage: Stage): MouseHandlers => {
  const activeLayer = getActiveLayer(stage);
  let transformer = stage.findOne("Transformer") as Konva.Transformer;

  if (!transformer) {
    transformer = new Konva.Transformer({
      name: "Transformer",
      draggable: true,
      shouldOverdrawWholeArea: true,
    });
    transformer.on("mousedown touchstart", function (e) {
      console.log("mousedown touchstart");
      e.evt.stopPropagation();
    });
  }
  if (activeLayer) {
    activeLayer.add(transformer);
    console.log("add transformer");
    transformer.moveToTop();
    drawActiveLayer(stage);
  }

  let selectionRectangle = stage.findOne("#selection-rectangle") as Konva.Rect;
  if (!selectionRectangle) {
    selectionRectangle = new Konva.Rect({
      fill: "rgba(0,0,255,0.3)",
      visible: false,
      id: "selection-rectangle",
    });
    activeLayer.add(selectionRectangle);
  }
  let isSelectingByClick = false;
  let isSelectingByArea = false;
  let startPosition: Konva.Vector2d | null = null;

  const onMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const node = e.target as Konva.Node;
    if (e.evt.button !== 0 || node.getParent() === transformer || node === transformer) {
      return;
    }

    const pos = stage.getPointerPosition();
    if (!pos) return;

    const transform = stage.getAbsoluteTransform().copy().invert();
    startPosition = transform.point(pos);

    isSelectingByClick = true;
  };

  const onMouseMoveWindow = () => {
    if (!startPosition) return;
    const pos = stage.getPointerPosition();
    if (!pos) return;

    const transform = stage.getAbsoluteTransform().copy().invert();
    const currentPosition = transform.point(pos);
    const dx = Math.abs(currentPosition.x - startPosition.x);
    const dy = Math.abs(currentPosition.y - startPosition.y);
    if (dx > 5 || dy > 5) {
      isSelectingByClick = false;
      isSelectingByArea = true;
      selectionRectangle.visible(true);
      selectionRectangle.width(dx);
      selectionRectangle.height(dy);
      selectionRectangle.x(Math.min(startPosition.x, currentPosition.x));
      selectionRectangle.y(Math.min(startPosition.y, currentPosition.y));
      stage.batchDraw();
    }
  };

  const onMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.evt.button !== 0) return;

    if (isSelectingByClick) {
      onMouseUpSelectByClick(stage, e, transformer);
      isSelectingByArea = false;
      isSelectingByClick = false;
      startPosition = null;
    }
  };

  const onMouseUpWindow = (e: MouseEvent) => {
    if (e.button !== 0) return;

    if (isSelectingByArea) {
      onMouseUpSelectByArea(stage, transformer, selectionRectangle);
    }
    isSelectingByArea = false;
    isSelectingByClick = false;
    startPosition = null;
  };
  document.addEventListener("mousemove", onMouseMoveWindow);
  document.addEventListener("mouseup", onMouseUpWindow);

  return {
    onMouseDown,
    onMouseUp,
    onMouseMove: () => {},
    handlerDisposer: () => {
      transformer.nodes([]);
      transformer.destroy();
      selectionRectangle.destroy();
      stage.batchDraw();
      document.removeEventListener("mousemove", onMouseMoveWindow);
      document.removeEventListener("mouseup", onMouseUpWindow);
    },
  };
};

export default getSelectHandlers;
