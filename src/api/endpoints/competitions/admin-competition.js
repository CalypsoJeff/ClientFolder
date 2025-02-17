import END_POINTS from "../../../constants/endpoints"
import { competitionAdd, competitionDelete, competitionEdit, competitionLoad } from "../../services/competitions/admin-competition-service"

export const addCompetition = (competitionData) => {
    return competitionAdd(END_POINTS.ADD_COMPETITION, competitionData)
}
export const editCompetition = (competitionId, competitionData) => {
    return competitionEdit(`${END_POINTS.EDIT_COMPETITION}/${competitionId}`, competitionData
    )
}
export const deleteCompetition = (id) => {
    return competitionDelete(`${END_POINTS.DELETE_COMPETITION}/${id}`)
}
export const loadCompetitions = () => {
    return competitionLoad(END_POINTS.LOAD_COMPETITIONS);
}