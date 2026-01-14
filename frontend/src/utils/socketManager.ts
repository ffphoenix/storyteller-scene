import { Manager } from "socket.io-client";

const socketManager = new Manager(import.meta.env.VITE_API_URL);
export default socketManager;
