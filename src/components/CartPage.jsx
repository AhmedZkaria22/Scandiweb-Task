import React, { PureComponent } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components/Query';
import img1 from '../assets/images/shirt.png';
import { Mutation } from '@apollo/client/react/components/Mutation';
import { Link } from 'react-router-dom';

class CartPage extends PureComponent {

    IncreAmount = gql`
    mutation IncreProductAmount($id: Int!){
        IncreProductAmount(id: $id) {
            id, amount
        }
    }`;

    DecreAmount = gql`
    mutation DecreProductAmount($id: Int!){
        DecreProductAmount(id: $id) {
            id, amount
        }
    }`;

    DltCartItm = gql`
    mutation DeleteCartItem($id: Int!){
        DeleteCartItem(id: $id) {
            id, selected
        }
    }`;

    ProductsCart = gql`
    query UserProductsCart{
    UserProductsCart{
        id, title, description, price, category, gender, sizes, selected, amount
    }
    }`;

    render() {
        const Minicart_Query = gql`query CartQuery{
            UserProductsCart{
                id, title, description, price, category, gender, sizes, selected, amount
            }
        }`;
        const {CurrencyListener} = this.props;

        return (
            <section className='cartPage'>
                <h1>cart 
                    <Link to='/'>&larr;</Link>
                </h1>
                <Query query={Minicart_Query}>{
                    ({loading, error, data}) => {
                        if(loading) return <h4>loading ...</h4>
                        if(error) console.log(error);
                        console.log(data);
                        return <>{  data.UserProductsCart.map( (prd, i) => {
                            return(
                                // (i < 2) &&
                                <div className="cart-container__item" key={i}>
                                    <div className="cart-container__item__col1">
                                        <p>{prd.title}</p>
                                        <p>{`${CurrencyListener}${prd.price}`}</p>
                                        <div className="cartItem-sizes">{
                                            prd.sizes.split(' ').map( (itmsz, j) => {
                                                return(
                                                    <button key={j}>{itmsz}</button>
                                                )
                                            } )
                                        }
                                        <Mutation mutation={this.DltCartItm}>   
                                        {(DeleteCartItem, {data}) => {return(
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                DeleteCartItem({ variables: { id: prd.id } ,
                                                    refetchQueries: [{ query: this.ProductsCart }]
                                                });                                                        
                                            }}>Remove</button>
                                        )}}</Mutation>                                        
                                        </div>
                                        {/* <button>Remove</button> */}
                                    </div>
                                    <div className="cart-container__item__col2">
                                        <div className="cartItem-amount">
                                        <Mutation mutation={this.IncreAmount}>   
                                        {(IncreProductAmount, {data}) => {return(
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                IncreProductAmount({ variables: { id: prd.id } });                                                    
                                            }}></button>
                                        )}}</Mutation>
                                        <p>{prd.amount}</p>
                                        <Mutation mutation={this.DecreAmount}>   
                                        {(DecreProductAmount, {data}) => {return(
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                DecreProductAmount({ variables: { id: prd.id } });
                                            }}></button>
                                        )}}</Mutation>
                                            {/* <button></button>
                                            <p>{prd.amount}</p>
                                            <button></button> */}
                                        </div>
                                        <img src={img1} alt="" />
                                    </div>
                                </div>
                            )
                        } ) }</>
                    }
                }</Query>
            </section>
        )
    }
}

export default CartPage
