import END_POINTS from "../../../constants/endpoints"
import { add_Category, toggle_Category, edit_Category, load_Categories } from "../../services/categories/admin-category-service"

export const addCategory = (categoryData) => {
    return add_Category(END_POINTS.ADD_CATEGORY, categoryData)
}
export const editCategory = (categoryId, categoryData) => {
    console.log("📝 Sending Edit Request:", categoryData);
    return edit_Category(`${END_POINTS.EDIT_CATEGORY}/${categoryId}`, categoryData
    )
}
export const toggleCategory = (id) => {
    return toggle_Category(`${END_POINTS.TOGGLE_CATEGORY}/${id}/status`);
};

export const loadCategories = () => {
    return load_Categories(END_POINTS.LOAD_CATEGORIES);
}