import React, { PureComponent } from 'react'
import Product from './Product';
import img1 from '../assets/images/shirt.png';
import { Query } from '@apollo/client/react/components/Query';

class QueryComponent extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const {QueryProp, CurrencyListenerProp, TargetData} = this.props;
        return (
            <Query query={QueryProp}>{
                ({loading, error, data}) => {
                    if(loading) return <h4>loading ...</h4>
                    if(error) console.log(error);
                    console.log(data);
                    return <>{  data[TargetData].map( (prd, i) => {
                        return(
                            <Product key={i} preload={[ img1, prd.id, prd.title, prd.description, prd.price, prd.category, prd.gender, prd.sizes, CurrencyListenerProp]} />
                        )
                    } ) }</>
                }
            }</Query>
        )
    }
}

export default QueryComponent
