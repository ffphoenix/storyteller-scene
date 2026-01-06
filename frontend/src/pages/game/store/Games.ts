import type { GameResponseDto } from "../../../../generated/api";
import createDataStorage from "../../../components/crud/createDataStorage";

const getDefaultSystem = () => ({
  id: 0,
  name: "",
  status: "CREATED" as "CREATED" | "STARTED",
  shortUrl: "",
});
const SystemsStorage = createDataStorage<GameResponseDto>(getDefaultSystem);

export default SystemsStorage;
