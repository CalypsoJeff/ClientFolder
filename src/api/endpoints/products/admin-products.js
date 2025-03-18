import END_POINTS from "../../../constants/endpoints";
import { add_Product, edit_Product, load_Products, toggle_product } from "../../services/products/admin-products-service";

export const addProduct = (productData) => {
    return add_Product(END_POINTS.ADD_PRODUCT, productData)
}
export const editProduct = (productId, productData) => {
    console.log("📝 Sending Edit Request:", productData);
    return edit_Product(`${END_POINTS.EDIT_PRODUCT}/${productId}`, productData
    )
}
export const toggleProduct = (id) => {
    return toggle_product(`${END_POINTS.TOGGLE_PRODUCT}/${id}/status`)
}
export const loadProducts = () => {
    return load_Products(END_POINTS.LOAD_PRODUCTS);
}