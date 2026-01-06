import DataStorage from "../Games";
import setCurrent from "./setCurrent";
import { runInAction } from "mobx";

export default async (id: number) => {
  await setCurrent(id);
  runInAction(() => {
    DataStorage.togglePopup();
  });
};
