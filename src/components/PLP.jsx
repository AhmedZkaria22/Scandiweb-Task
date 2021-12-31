import React, { PureComponent } from 'react';
import { gql } from '@apollo/client';
import { Product_Query } from '../graphql/graphqls';
import QueryComponent from './QueryComponent';

class PLP extends PureComponent {
    constructor(props){
        super(props);     
        this.state={ genderListener: '', categListener: '' }
    }

    componentDidUpdate(prevProps){
        if( this.props !== prevProps ){
            this.setState({ genderListener: this.props.ProdGender, categListener: this.props.ProdCatg });
        }
    }
    

    render() {
        const {ProdCatg, ProdGender, CurrencyListener} = this.props;
        const genderListener = this.state.genderListener;
        const categListener = this.state.categListener;        

        const Gender_Query = gql`query Gender_Query{
            ProductsDataByGender(gender: "${ProdGender}"){
                id, title, price, category, gender, sizes
            }
        }`;
        
        const Categ_Query = gql`query Categ_Query{
            ProductsDataByCategory(categ: "${ProdCatg}"){
                id, title, price, category, gender, sizes
            }
        }`;

        const Gender_Categ_Query = gql`query Gender_Categ_Query{
            ProductsDataByGender_Category(gender: "${ProdGender}", categ: "${ProdCatg}"){
                id, title, price, category, gender, sizes
            }
        }`;

    
        return (
            <section className='plp'>
                <h2>{ProdCatg}</h2>
                <div className='products-wrapper'>
                {
                    (genderListener === '' && categListener === '' ) &&
                    <QueryComponent     QueryProp={Product_Query}     CurrencyListenerProp={CurrencyListener}     TargetData={'ProductsData'}/>
                }
                
                {
                    ((genderListener === 'women' || genderListener === 'men' || genderListener === 'kids') && categListener === '') &&
                    <QueryComponent     QueryProp={Gender_Query}     CurrencyListenerProp={CurrencyListener}     TargetData={'ProductsDataByGender'}/>
                }
                
                {
                    ((categListener === 'all' || categListener === 'tech' || categListener === 'clothes') && genderListener === '') &&
                    <QueryComponent     QueryProp={Categ_Query}     CurrencyListenerProp={CurrencyListener}     TargetData={'ProductsDataByCategory'}/>
                }

                {
                    (   (categListener === 'all' || categListener === 'tech' || categListener === 'clothes') 
                        && (genderListener === 'women' || genderListener === 'men' || genderListener === 'kids') 
                    )   &&
                    <QueryComponent    QueryProp={Gender_Categ_Query}     CurrencyListenerProp={CurrencyListener}     TargetData={'ProductsDataByGender_Category'}/>
                }
                </div>                
            </section>
        )
    }
}

export default PLP
