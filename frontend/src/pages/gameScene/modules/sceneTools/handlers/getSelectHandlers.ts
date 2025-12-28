import Konva from "konva";
import type { Stage } from "konva/lib/Stage";
import type { MouseHandlers } from "../useSceneTools";
import getActiveLayer from "../utils/getActiveLayer";
import drawActiveLayer from "../utils/drawActiveLayer";

const getSelectHandlers = (stage: Stage): MouseHandlers => {
  const activeLayer = getActiveLayer(stage);
  let transformer = stage.findOne("Transformer") as Konva.Transformer;

  if (!transformer) {
    transformer = new Konva.Transformer({
      draggable: true,
      //shouldOverdrawWholeArea: true,
    });
    if (activeLayer) {
      activeLayer.add(transformer);
      transformer.moveToTop();
    }
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
  let isClickSelecting = false;
  let isSelectingArea = false;
  let startPosition: Konva.Vector2d | null = null;

  const onMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.evt.button !== 0) return;
    const pos = stage.getPointerPosition();
    if (!pos) return;

    const transform = stage.getAbsoluteTransform().copy().invert();
    startPosition = transform.point(pos);
    isClickSelecting = true;
  };

  const onMouseMove = () => {
    if (!startPosition) return;
    const pos = stage.getPointerPosition();
    if (!pos) return;

    const transform = stage.getAbsoluteTransform().copy().invert();
    const currentPosition = transform.point(pos);
    const dx = Math.abs(currentPosition.x - startPosition.x);
    const dy = Math.abs(currentPosition.y - startPosition.y);
    if (dx > 2 || dy > 2) {
      isClickSelecting = false;
      isSelectingArea = true;
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

    if (isClickSelecting) {
      isClickSelecting = false;
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
    }

    if (isSelectingArea) {
      isSelectingArea = false;
      startPosition = null;
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
      stage.batchDraw();
    }
  };

  return {
    onMouseDown,
    onMouseUp,
    onMouseMove,
    handlerDisposer: () => {
      transformer.nodes([]);
      transformer.destroy();
      selectionRectangle.destroy();
      stage.batchDraw();
    },
  };
};

export default getSelectHandlers;
