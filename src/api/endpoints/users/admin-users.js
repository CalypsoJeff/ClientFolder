import END_POINTS from "../../../constants/endpoints"
import { user_List } from "../../services/users/admin-users-service"

export const userList = ()=>{
    return user_List(END_POINTS.USERLIST)
}      