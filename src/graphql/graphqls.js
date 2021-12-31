import { gql } from "@apollo/client";

export const Product_Query = gql`
query ProductsQuery{
    ProductsData{
        id, title, description, price, category, gender, sizes, selected, amount
    }
}`;

export const IncreAmount = gql`
mutation IncreProductAmount($id: Int!){
    IncreProductAmount(id: $id) {
        id, amount
    }
}`;

export const DecreAmount = gql`
mutation DecreProductAmount($id: Int!){
    DecreProductAmount(id: $id) {
        id, amount
    }
}`;

export const DltCartItm = gql`
mutation DeleteCartItem($id: Int!){
    DeleteCartItem(id: $id) {
        id, selected
    }
}`;

export const ProductsCart = gql`
query UserProductsCart{
UserProductsCart{
    id, title, description, price, category, gender, sizes, selected, amount
}
}`;

export const AppCart = gql`
mutation AddProductCart($id: Int!){
    AddProductCart(id: $id) {
        id, title, description, price, category, gender, sizes
    }
    }
`; 