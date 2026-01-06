import ApiClient from "../../../../utils/apiClient";
import DataStorage from "../Games";
import fetchList from "./fetchList";
import saveCurrent from "../../../../components/crud/form/actions/saveCurrent";

export default () => {
  const current = DataStorage.current;

  saveCurrent(
    DataStorage,
    () => ApiClient.games.create(current),
    () => ApiClient.games.update(current.id, current),
    () => fetchList(),
  );
};
