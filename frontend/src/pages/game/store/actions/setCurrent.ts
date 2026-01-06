import ApiClient from "../../../../utils/apiClient";
import { runInAction } from "mobx";
import GamesStorage from "../Games";

export default async (id: number) => {
  ApiClient.games.findOne(id.toString()).then((response) => {
    runInAction(() => {
      GamesStorage.current = response.data;
    });
  });
};
