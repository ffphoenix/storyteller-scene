import ApiClient from "../../../../utils/apiClient";
import fetchList from "./fetchList";

const deleteGame = async (gameId: number) => {
  ApiClient.games.delete(gameId).then(() => fetchList());
};

export default deleteGame;
