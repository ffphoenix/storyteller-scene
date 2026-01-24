import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { PaperPlaneIcon } from "../../../../../icons";
import gameHistoryMessages from "../../store/GameHistoryMessages";
import CurrentUser from "../../../../../globalStore/users/CurrentUser";
import gameStore from "../../../store/GameStore";

const ChatInput: React.FC = () => {
  const [text, setText] = useState("");
  const handleSend = async () => {
    console.log("Sending message...");
    const trimmed = text.trim();
    if (trimmed) {
      if (!gameStore?.game?.id) return;

      // For now using "Player" as placeholder author
      gameHistoryMessages.addUserMessage(CurrentUser.id, trimmed);
      console.log("Message sent");
      document.dispatchEvent(
        new CustomEvent("history:messages:added", {
          detail: {
            type: "CHAT_MESSAGE",
            body: { message: trimmed },
            gameId: gameStore.game.id,
            userId: 1,
          },
        }),
      );
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="p-3 border-t bg-white flex gap-2 items-center">
      <InputText
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1 p-inputtext-sm"
      />
      <Button
        icon={<PaperPlaneIcon />}
        onClick={handleSend}
        disabled={!text.trim()}
        className="p-button-sm p-button-rounded"
        aria-label="Send"
      />
    </div>
  );
};

export default ChatInput;
