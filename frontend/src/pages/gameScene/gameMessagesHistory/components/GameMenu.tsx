import React, { type MutableRefObject } from "react";
import { Button } from "primereact/button";
import { LayersIcon } from "../../icons";
import "./GameMenu.css";
import SceneStore from "../../store/SceneStore";
import { observer } from "mobx-react-lite";
import type { Stage } from "konva/lib/Stage";
import ChatPanel from "./chat/ChatPanel";
import ChatToggleButton from "./chat/ChatToggleButton";

type Props = {
  stageRef: MutableRefObject<Stage | null>;
};

const GameMenu: React.FC<Props> = ({ stageRef }) => {
  return (
    <>
      <ChatPanel />
      <div className="flex h-full w-full flex-col gap-3 pb-60">
        {/* Tools */}
        <div className="flex flex-col gap-2">
          <ChatToggleButton />
          <Button
            aria-label="Layer Manager"
            text
            raised
            icon={<LayersIcon />}
            className={(SceneStore.activeTool == "moveLayer" ? "tooltip-button-selected" : "") + " tooltip-button"}
            onClick={() => SceneStore.setActiveTool("moveLayer")}
          />
        </div>

        <div className="h-px w-full bg-gray-200" />
      </div>
    </>
  );
};

export default observer(GameMenu);
