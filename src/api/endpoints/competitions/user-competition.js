import END_POINTS from "../../../constants/endpoints";
import { load_Competition } from "../../services/competitions/user-competition-service";

export const fetchCompetitions = () => {
    return load_Competition(END_POINTS.LOAD_USER_COMPETITIONS);
}