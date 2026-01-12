import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { observer } from "mobx-react-lite";
import DataStorage from "./store/Games";
import openPopupForEdit from "./store/actions/openPopupForEdit";
import { Button } from "primereact/button";
import deleteGame from "./store/actions/deleteGame";
import { useNavigate } from "react-router";

const dataTableConfig = [
  { header: "ID", key: "id", data: "id" },
  { header: "Name", key: "name", data: "name" },
  { header: "ShortURL", key: "shortUrl", data: "shortUrl" },
];

export default observer(() => {
  const navigate = useNavigate();
  return (
    <div>
      <DataTable
        reorderableRows
        onRowReorder={(e) => console.log(e)}
        value={DataStorage.list}
        size={"small"}
        onSort={(e) => console.log(e)}
        onRowClick={(e) => openPopupForEdit(e.data.id)}
      >
        <Column rowReorder style={{ width: "3rem" }} />
        {dataTableConfig.map((column) => (
          <Column key={column.key} field={column.data} header={column.header} />
        ))}
        <Column
          columnKey={"actions"}
          header="Actions"
          style={{ width: "10rem" }}
          body={(rowData) => {
            return (
              <>
                <Button
                  icon="pi pi-play"
                  className="p-button-rounded p-button-sm"
                  tooltip="Play Game"
                  onClick={() => navigate(`/play/${rowData.shortUrl}`)}
                />
                <span className={"pl-3"} />
                <Button
                  icon="pi pi-trash"
                  className="p-button-rounded p-button-sm"
                  onClick={() => deleteGame(rowData.id)}
                />
              </>
            );
          }}
        />
      </DataTable>
    </div>
  );
});
