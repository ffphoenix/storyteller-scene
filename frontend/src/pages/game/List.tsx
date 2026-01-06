import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { observer } from "mobx-react-lite";
import DataStorage from "./store/Games";
import openPopupForEdit from "./store/actions/openPopupForEdit";

const dataTableConfig = [
  { header: "ID", key: "id", data: "id" },
  { header: "Name", key: "name", data: "name" },
  { header: "ShortURL", key: "shortUrl", data: "shortUrl" },
];

export default observer(() => {
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
      </DataTable>
    </div>
  );
});
