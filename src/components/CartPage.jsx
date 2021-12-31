import React, { PureComponent } from 'react';
import { Query } from '@apollo/client/react/components/Query';
import img1 from '../assets/images/shirt.png';
import { Mutation } from '@apollo/client/react/components/Mutation';
import { Link } from 'react-router-dom';
import { DecreAmount, DltCartItm, IncreAmount, ProductsCart } from '../graphql/graphqls';

class CartPage extends PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        const {CurrencyListener} = this.props;

        return (
            <section className='cartPage'>
                <h1>cart 
                    <Link to='/'>&larr;</Link>
                </h1>
                <Query query={ProductsCart}>{
                    ({loading, error, data}) => {
                        if(loading) return <h4>loading ...</h4>
                        if(error) console.log(error);
                        console.log(data);
                        return <>{  data.UserProductsCart.map( (prd, i) => {
                            return(
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
                                        <Mutation mutation={DltCartItm}>   
                                        {(DeleteCartItem, {data}) => {return(
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                DeleteCartItem({ variables: { id: prd.id } ,
                                                    refetchQueries: [{ query: ProductsCart }]
                                                });                                                        
                                            }}>Remove</button>
                                        )}}</Mutation>                                        
                                        </div>
                                    </div>
                                    <div className="cart-container__item__col2">
                                        <div className="cartItem-amount">
                                        <Mutation mutation={IncreAmount}>   
                                        {(IncreProductAmount, {data}) => {return(
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                IncreProductAmount({ variables: { id: prd.id } });                                                    
                                            }}></button>
                                        )}}</Mutation>
                                        <p>{prd.amount}</p>
                                        <Mutation mutation={DecreAmount}>   
                                        {(DecreProductAmount, {data}) => {return(
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                DecreProductAmount({ variables: { id: prd.id } });
                                            }}></button>
                                        )}}</Mutation>
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
