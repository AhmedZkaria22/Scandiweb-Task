import React from 'react'
import { gql } from '@apollo/client';
import {Query} from '@apollo/client/react/components/Query';
import Product from './Product';
import img1 from '../assets/images/shirt.png';
import { Mutation } from '@apollo/client/react/components/Mutation';
// import { filter } from '../index';

// const Item_Query = gql`
// query Item_Query($gender: String!) {
//     Products(gender: $gender) {
//     id, title, description, price, category, gender
//   }
// }
// `;

// const Client_Item_Query = gql`
// query Client_Item_Query{
//     filteredProducts @client {
//         id, title, description, price, category, gender
//     }
//     Products {
//         id, title, description, price, category, gender
//     }
// }`;


const Product_Query = gql`
query Product_Query{
    UserProductsCart{
        id, title, price, category, gender, selected, sizes
    }
}
`


// function Prds() {
//     // filter("men");

//     const { loading, error, data } = useQuery(Client_Item_Query, {
//       variables: { gender: "men" },
//     });
  
//     if (loading) return null;
//     if (error) return `Error! ${error}`;
//     console.log(data);

//     return <div className='products-wrapper'>{
//         data.Products.map( (prd, i) => {
//         return(
//             <Product key={i} preload={[ img1, prd.title, prd.price ]} />
//         )
//         } ) 
//     }</div>
// }

const UpdateProd = () => {
    const Product_Muta = gql`
        mutation AddProductCart($id: number!) {
            AddProductCart(id: $id) {
            id, title, price, category, gender, selected, sizes
        }
        }
    `;

    // let prodId;
    // const [AddProductCart, { data, loading, error }] = useMutation(Product_Muta);
    // if (loading) return 'Submitting...';
    // if (error) return `Submission error! ${error.message}`;
    // console.log(data);
    return(<>
        {/* <input type='text' ref={ val => prodId = val }/>
        <button onClick={() => {
            AddProductCart( { variables: {id: parseInt(prodId.value)} } );
            prodId.value = '';
        }}>Update</button> */}

        {/*<Mutation mutation={Product_Muta}>{
            ({loading, error, data}) => {
            //     console.log(loading, error, data);
            // if (loading) return 'Submitting...';
            // if (error) return `Submission error! ${error.message}`;
            // if( ! error && ! loading ){
            //     console.log(data);
                return <>
                    <input type='text' ref={ val => prodId = val }/>
                    <button onClick={() => {
                        console.log(data);
                        data.AddProductCart( { variables: {id: parseInt(prodId.value)} } );
                        prodId.value = '';
                    }}>Update</button>
                </>
            
        }}</Mutation>*/}


        <Query query={Product_Query}>{
            ({loading, error, data}) => {
                if(loading) return <h4>loading ...</h4>
                if(error) return null; console.log(error);
                if( ! error && ! loading ){
                    console.log(data);
                    return <>{  data.UserProductsCart.map( (prd, i) => {
                        return(  <h2 key={i}>{`#${prd.id} ${prd.title} - $${prd.price} : ${prd.selected}`}</h2>  )
                    } ) }</>
                }
            }
        }</Query>
    </>)
}

export default UpdateProd
