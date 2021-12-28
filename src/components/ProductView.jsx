import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components/Query';
import React, { PureComponent } from 'react';
import img1 from '../assets/images/shirt.png';

export class ProductView extends PureComponent {
    render() {
        const ProdUrl = window.location.href; 
        const ProdId = ProdUrl.slice( ProdUrl.indexOf('?')+1, ProdUrl.length );
        const {CurrencyListener} = this.props;
        const Product_Query = gql`query Product_Query{
            ProductsDataById(id: ${ProdId}){
                id, title, description, price, sizes
            }
        }`;
        const Product_Sizes = ['xs', 's', 'm', 'l'];
        const handelSizes = (e) => {
            const curBtn = e.target;
            const availBtns = document.querySelectorAll('.productView__content__sizes button:not(.disable-size)');
            for(let i = 0; i< availBtns.length; i++){
                availBtns[i].classList.remove('activeSize');
                availBtns[i].classList.add('available-size');
                if( availBtns[i] === curBtn ){ 
                    availBtns[i].classList.remove('available-size');
                    availBtns[i].classList.add('activeSize'); 
                }
            }
        }
        return (
            <Query query={Product_Query}>{
                ({loading, error, data}) => {
                    if(loading) return <h4>loading ...</h4>
                    if(error) console.log(error);
                    console.log(data);          
                    return(
                                             
                    <section className='ProductView'>
                        {/* <h2>{`hello ${data.ProductsDataById.id} - ${data.ProductsDataById.title}`}</h2> */}
                        <div className="productView__gallery">
                            <button></button>
                            <button></button>
                            <button></button>
                        </div>
                        <div className="productView__fig">
                            <img src={img1} alt="" />
                        </div>
                        <div className="productView__content">
                            <p>{data.ProductsDataById.title}</p>
                            <div className="productView__content__sizes">
                                <span>size:</span>
                                {
                                    Product_Sizes.map( (sz, i) => { return(
                                        (data.ProductsDataById.sizes.split(' ').indexOf(sz) !== -1)
                                        ? <button className='available-size' key={i} onClick={(e) => handelSizes(e)}>{sz}</button>                                                                                
                                        : <button className='disable-size' key={i}>{sz}</button>
                                    ) } )
                                }
                            </div>
                            <div className="productView__content__price">
                                <span>price:</span>
                                <p>{`${CurrencyListener}${data.ProductsDataById.price}`}</p>
                            </div>
                            <button>add to card</button>
                            <p>{data.ProductsDataById.description}</p>
                        </div>
                    </section>
                    )
                }
            }</Query>
        )
    }
}

export default ProductView
