import { deleteAsync } from "del";

export const remove = () => {
    return deleteAsync(`./build`);
}