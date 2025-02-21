import END_POINTS from "../../../constants/endpoints"
import { add_Trekking, delete_Trekking, edit_Trekking, load_Trekkings } from "../../services/trekkings/admin-trekking-service"

export const loadTreks = () => {
    return load_Trekkings(END_POINTS.LOAD_TREKKINGS)
}
export const addTrek = (trekkingData) => {
    return add_Trekking(END_POINTS.ADD_TREKKING, trekkingData)
}
export const editTrek = (trekkingId, trekkingData) => {
    return edit_Trekking(`${END_POINTS.EDIT_TREKKING}/${trekkingId}`, trekkingData)
}
export const deleteTrek = (id) => {
    return delete_Trekking(`${END_POINTS.DELETE_TREKKING}/${id}`)
}
