import React, { PureComponent } from 'react';
import { gql } from '@apollo/client';
import {Query} from '@apollo/client/react/components/Query';
import Product from './Product';
import img1 from '../assets/images/shirt.png';


class PLP extends PureComponent {
    constructor(props){
        super(props);     
        this.state={ genderListener: '' }
    }

    componentDidUpdate(prevProps){
        if( this.props !== prevProps ){
            this.setState({ genderListener: this.props.ProdGender });
            console.log(this.props.ProdGender, this.state.genderListener);
        }
    }
    

    render() {
        const {ProdGender, CurrencyListener} = this.props;
        const genderListener = this.state.genderListener;
        const Item_Query = gql`query ItemQuery{
            ProductsData{
                id, title, description, price, category, gender
            }
        }`;
        const Gender_Query = gql`query Gender_Query{
            ProductsDataByGender(gender: "${ProdGender}"){
                id, title, price, category, gender, sizes
            }
        }`;
    
        return (
            <section className='plp'>
                <h2>Category name</h2>                
                <div className='products-wrapper'>
                {
                    // (genderListener === '' || genderListener === undefined) &&
                    (genderListener !== 'women' && genderListener !== 'men' && genderListener !== 'kids') &&
                    <Query query={Item_Query}>{
                        ({loading, error, data}) => {
                            if(loading) return <h4>loading ...</h4>
                            if(error) console.log(error);
                            console.log(data);
                            return <>{  data.ProductsData.map( (prd, i) => {
                                return(
                                    // <Product key={i} preload={[ img1, prd.title, prd.price, prd.gender ]} />
                                    <Product key={i} preload={[ img1, prd.id, prd.title, prd.description, prd.price, prd.category, prd.gender, prd.sizes, CurrencyListener]} />
                                )
                            } ) }</>
                        }
                    }</Query>
                    // <>{ dt.ProductsData.map( (prd, i) => {
                    //     return(
                    //         <Product key={i} preload={[ img1, prd.id, prd.title, prd.description, prd.price, prd.category, prd.gender, prd.sizes, CurrencyListener]} />
                    //     )
                    // } ) }</>

                }
                {
                    // (genderListener !== '' && genderListener.length > 2) &&
                    (genderListener === 'women' || genderListener === 'men' || genderListener === 'kids') &&
                    <Query query={Gender_Query}>{
                        ({loading, error, data}) => {
                            if(loading) return <h4>loading ...</h4>
                            if(error) console.log(error);
                            console.log(data);
                            return <>{  data.ProductsDataByGender.map( (prd, i) => {
                                return(
                                    // <Product key={i} preload={[ img1, prd.title, prd.price, prd.gender ]} />
                                    <Product key={i} preload={[ img1, prd.id, prd.title, prd.description, prd.price, prd.category, prd.gender, prd.sizes, CurrencyListener]} />
                                )
                            } ) }</>
                        }
                    }</Query>
                }
                </div>                
            </section>
        )
    }
}

export default PLP
