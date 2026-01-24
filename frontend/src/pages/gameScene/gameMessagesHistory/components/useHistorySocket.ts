import socketManager from "../../../../utils/socketManager";
import { useEffect } from "react";
import gameStore from "../../store/GameStore";
import gameHistoryMessages from "../store/GameHistoryMessages";

const useHistorySocket = () => {
  useEffect(() => {
    const socket = socketManager.socket("/game-history");

    socket.connect();
    socket.emit("subscribeToGame", gameStore.game?.id);

    socket.on("historyItemCreated", (data) => {
      console.log(data);
      gameHistoryMessages.addUserMessage(data.userId, data.body.message);
    });
    const onMessageAdded = (data: CustomEvent<string>) => {
      socket.emit("createHistoryItem", data.detail);
    };
    document.addEventListener("history:messages:added", onMessageAdded as EventListener);
    return () => {
      socket.emit("unsubscribeFromGame", gameStore.game?.id);
      socket.disconnect();
      document.removeEventListener("history:messages:added", onMessageAdded as EventListener);
    };
  }, []);
};
export default useHistorySocket;
