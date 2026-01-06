import { Card } from "primereact/card";
import { Button } from "primereact/button";
import EntityPopup from "./FormPopup";
import { observer } from "mobx-react-lite";
import DataStorage from "./store/Games";
import List from "./List";

export default observer(() => {
  return (
    <Card>
      <div className="flex justify-between content-center mb-2">
        <h1 className="text-2xl font-bold mb-4">My Games</h1>
        <Button label="Add" icon="pi pi-plus" onClick={() => DataStorage.togglePopup()} />
      </div>
      <List />
      <EntityPopup />
    </Card>
  );
});
