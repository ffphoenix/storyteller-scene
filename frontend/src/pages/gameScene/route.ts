import GameLayout from "../../layouts/GameLayout";
import GameScenePage from "./index";
import loadScene from "./store/actions/loadScene";

export const GameSceneRoute = {
  path: "play",
  Component: GameLayout,
  children: [
    {
      path: ":gameId",
      loader: async ({ params }) => {
        console.log(params);
        loadScene(params.gameId);
      },
      Component: GameScenePage,
    },
  ],
};
