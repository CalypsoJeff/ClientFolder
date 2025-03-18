import END_POINTS from "../../../constants/endpoints";
import { load_Product_Details, load_Products, load_Shop_Products } from "../../services/products/user-products-service";

export const loadProducts = () => {
    return load_Products(END_POINTS.LOAD_USER_PRODUCTS);
}
export const loadShopProducts = () => {
    return load_Shop_Products(END_POINTS.LOAD_SHOP_PRODUCTS);
}
export const loadProductDetails = (id) => {
    return load_Product_Details(END_POINTS.LOAD_PRODUCT_DETAILS, id);
};
