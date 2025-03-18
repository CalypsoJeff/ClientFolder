import END_POINTS from "../../../constants/endpoints";
import { load_Trekkings } from "../../services/trekkings/user-trekking-service";

export const fetchTrekkings = () => {
    return load_Trekkings(END_POINTS.LOAD_USER_TREKKINGS);
}