import DataStorage from "../Games";

export default () => {
  if (DataStorage.current.id) {
    DataStorage.resetCurrent();
  }
  DataStorage.togglePopup();
};
