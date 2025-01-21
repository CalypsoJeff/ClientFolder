import END_POINTS from "../../../constants/endpoints";


export const loginUser = (userData)=>{
    return login(END_POINTS.LOGIN, userData);
}