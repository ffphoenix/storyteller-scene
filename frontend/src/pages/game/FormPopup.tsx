import { Dialog } from "primereact/dialog";
import { observer } from "mobx-react-lite";
import GamesStorage from "./store/Games";
import saveCurrent from "./store/actions/saveCurrent";
import CrudForm from "../../components/crud/form/CrudForm";
import notEmpty from "../../components/crud/form/validators/notEmpty";
import maxLength from "../../components/crud/form/validators/maxLength";
import minLength from "../../components/crud/form/validators/minLength";
import type { FormConfig } from "../../components/crud/form/crudForm";
import type { GameResponseDto } from "../../../generated/api";

export default observer(() => {
  const formConfig: FormConfig = {
    onSubmit: () => saveCurrent(),
    fields: [
      {
        type: "text",
        label: "Name",
        dataKey: "name",
        validators: [notEmpty()],
      },
      {
        type: "text",
        label: "Short URL",
        dataKey: "shortUrl",
        validators: [minLength(8), maxLength(8)],
      },
    ],
  };

  return (
    <div>
      <Dialog
        header={GamesStorage.isCurrentNew ? "Create new Game" : "Edit Game"}
        visible={GamesStorage.isPopupVisible}
        maximizable
        style={{ width: "50vw" }}
        onHide={() => {
          if (!GamesStorage.isPopupVisible) return;
          GamesStorage.togglePopup();
        }}
      >
        <CrudForm<GameResponseDto> config={formConfig} storageData={GamesStorage} />
      </Dialog>
    </div>
  );
});
