import ApiClient from "../../../../utils/apiClient";
import { runInAction } from "mobx";
import DataStorage from "../Games";

export default () => {
  ApiClient.games.findAll().then((response) => {
    runInAction(() => (DataStorage.list = response.data));
  });
};
