import React, { PureComponent } from 'react';
import {Mutation} from '@apollo/client/react/components/Mutation';
import { Link } from 'react-router-dom';
import AddShopping from '../assets/images/AddShopping.png';
import { AppCart, ProductsCart } from '../graphql/graphqls';

class Product extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {preload} = this.props;
        return (
            <div className='product'>
                <img src={preload[0]} alt="" />
                <div className="product__content">
                    <Link to={`/product-view?${preload[1]}`}> {preload[2]} </Link>
                    <p>{`${preload[6]} - ${preload[preload.length-1]}${preload[4]}`}</p>
                </div>
                <Mutation mutation={AppCart}>
                {(AddProductCart, {data}) => (                
                <button onClick={(e) => {
                    e.preventDefault();
                    AddProductCart({ 
                        variables: { id: preload[1] },
                        refetchQueries: [{ query: ProductsCart }]    
                    });
                    console.log(...preload, data);             
                }}>
                    <img src={AddShopping} alt='img' />
                </button>
                )}
                </Mutation>
            </div>
        )
    }
}

export default Product
