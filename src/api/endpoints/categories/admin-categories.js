import END_POINTS from "../../../constants/endpoints"
import { add_Category, delete_Category, edit_Category, load_Categories } from "../../services/categories/admin-category-service"

export const addCategory = (categoryData) => {
    return add_Category(END_POINTS.ADD_CATEGORY, categoryData)
}
export const editCategory = (categoryId, categoryData) => {
    return edit_Category(`${END_POINTS.EDIT_CATEGORY}/${categoryId}`, categoryData
    )
}
export const deleteCategory = (id) => {
    return delete_Category(`${END_POINTS.DELETE_CATEGORY}/${id}`)
}
export const loadCategories = () => {
    return load_Categories(END_POINTS.LOAD_CATEGORIES);
}