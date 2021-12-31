import { gql } from '@apollo/client';
import { Mutation } from '@apollo/client/react/components/Mutation';
import { Query } from '@apollo/client/react/components/Query';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/images/shirt.png';
import checkLogo from '../assets/images/checkout.png';
import shoppingLogo from '../assets/images/shopping.png';
import CategoriesOpen from '../assets/images/Categories.png';
import CategoriesClose from '../assets/images/Close.png';
import { DecreAmount, IncreAmount, ProductsCart } from '../graphql/graphqls';
import { handelCategory, handelCurrency, handelGender, handelSizes, handelTotal, ShowCategoriesList } from '../graphql/handelFunctionality';

class Navbar extends PureComponent {

    constructor(props){
        super(props);
        // this.state = { genderListener: '', dataListener: this.props.dt.ProductsData }
        // this.state = { genderListener: '', categListener: false }
        this.state = { genderListener: '' }
    }
    
    catShowRef = React.createRef(null);
    catHideRef = React.createRef(null);

    componentDidUpdate(prevProps){
      if( this.props !== prevProps ){
        // this.setState({ genderListener: this.props.ProdGender, categListener: false });
        this.setState({ genderListener: this.props.ProdGender });
        console.log(this.props.ProdGender, this.state.genderListener);
      }
    }

    render() {
        const {dt, ProdCatg, setProdCatg, ProdGender, setProdGender, CurrencyListener, setCurrencyListener} = this.props;
        const miniRef = React.createRef(null);
        const curMenRef = React.createRef(null);
        const curShowRef = React.createRef(null);
        const curHideRef = React.createRef(null);
        const catLstRef = React.createRef(null);    
        const Product_Sizes = ['xs', 's', 'm', 'l'];

        return (
            <div id='navbar'> 
                <div className='navbar__gender-filter'>
                    <button ref={this.catShowRef} onClick={() => ShowCategoriesList(catLstRef.current, this.catShowRef.current, this.catHideRef.current, this.catShowRef.current)}>
                        <img src={CategoriesOpen} alt='img'/>
                    </button>
                    <button ref={this.catHideRef} onClick={() => ShowCategoriesList(catLstRef.current, this.catHideRef.current, this.catShowRef.current, this.catShowRef.current)}>
                        <img src={CategoriesClose} alt='img'/>
                    </button>
                    <button name='women' onClick={(e) => handelGender(e, setProdGender)}> women </button>
                    <button name='men' onClick={(e) => handelGender(e, setProdGender)}> men </button>
                    <button name='kids' onClick={(e) => handelGender(e, setProdGender)}> kids </button>
                </div>

                <button className='navbar__checkOut'>   <img src={checkLogo} alt='img' />   </button>

                <div className='navbar__controls'>
                    <div>
                        <span>{CurrencyListener}</span>
                        <button ref={curShowRef} onClick={() => {
                            curMenRef.current.style.display = 'flex';    
                            curHideRef.current.style.display = 'flex';
                            curShowRef.current.style.display = 'none';
                        }}></button>
                        <button ref={curHideRef} onClick={() => {
                            curMenRef.current.style.display = 'none';
                            curHideRef.current.style.display = 'none';
                            curShowRef.current.style.display = 'flex';       
                        }}></button>
                    </div>
                    <button onClick={() => {
                        miniRef.current.style.display = 'block';
                        document.querySelector('.miniCart-overlay').style.display = 'block';
                    }} >
                        <img src={shoppingLogo} alt='img' />
                        <Query query={ProductsCart}>{
                        ({loading, error, data}) => {
                            if(loading) return <h4>loading ...</h4>
                            if(error) console.log(error);
                            console.log(data);
                            return <span>{ data.UserProductsCart.length }</span>;
                        }
                        }</Query>
                    </button>
                </div>

                <div className="miniCart-container" ref={miniRef}>
                    {
                        <Query query={ProductsCart}>{
                            ({loading, error, data}) => {
                                if(loading) return <h4>loading ...</h4>
                                if(error) console.log(error);
                                console.log(data);
                                return(<>
                                    <h5>
                                    <p>My Bag<span>, {data.UserProductsCart.length} items</span></p>
                                    <button className="miniCart-close" onClick={() => {
                                        miniRef.current.style.display = 'none';
                                        document.querySelector('.miniCart-overlay').style.display = 'none';
                                    }}>x</button>
                                    </h5>            

                                    <>{data.UserProductsCart.map( (miniItem, i) => { return(
                                        <div className="miniCart-container__item" key={i}>
                                            <div className="miniCart-container__item__col1">
                                                <p>{miniItem.title}</p>
                                                <p>{`${CurrencyListener}${miniItem.price}`}</p>
                                                <div className="cartItem-sizes">{
                                                    Product_Sizes.map( (sz, i) => { return(
                                                        (miniItem.sizes.split(' ').indexOf(sz) !== -1)
                                                        ? <button className='available-size' key={i} onClick={(e) => handelSizes(e)}>{sz}</button>                                                                                
                                                        : <button className='disable-size' key={i}>{sz}</button>
                                                    ) } )
                                                }</div>
                                            </div>
                                            <div className="miniCart-container__item__col2">
                                                <div className="cartItem-amount">
                                                    <Mutation mutation={IncreAmount}>   
                                                    {(IncreProductAmount, {data}) => {return(
                                                        <button onClick={(e) => {
                                                            e.preventDefault();
                                                            IncreProductAmount({ variables: { id: miniItem.id } });                                                    
                                                        }}></button>
                                                    )}}</Mutation>
                                                    <p>{miniItem.amount}</p>
                                                    <Mutation mutation={DecreAmount}>   
                                                    {(DecreProductAmount, {data}) => {return(
                                                        <button onClick={(e) => {
                                                            e.preventDefault();
                                                            DecreProductAmount({ variables: { id: miniItem.id } });
                                                        }}></button>
                                                    )}}</Mutation>
                                                </div>
                                                <img src={img1} alt="" />
                                            </div>
                                        </div>
                                    ) })}</>

                                    <div className="miniCart-container__total">
                                        <p>Total</p>
                                        <p>{ `${CurrencyListener}${handelTotal(data.UserProductsCart)}` }</p>
                                    </div>
                                </>)
                        }}</Query>
                    }

                    <div className="miniCart-container__btns">
                        <Link to='/cart' onClick={() => {
                            miniRef.current.style.display = 'none';
                            document.querySelector('.miniCart-overlay').style.display = 'none';                            
                        }}> view bag </Link>          
                        <button>check out</button>
                    </div>
                </div>

                <div className="currency-menu" ref={curMenRef}>
                    <button name='$' onClick={(e) => handelCurrency(e.target.name, setCurrencyListener)}> $ USD </button>
                    <button name='€' onClick={(e) => handelCurrency(e.target.name, setCurrencyListener)}> € EUR </button>
                    <button name='¥' onClick={(e) => handelCurrency(e.target.name, setCurrencyListener)}> ¥ JPY </button>
                </div>

                <div className="category-list" ref={catLstRef}>
                    <button name='all' onClick={(e) => handelCategory(e, setProdCatg)}> All </button>
                    <button name='tech' onClick={(e) => handelCategory(e, setProdCatg)}> Tech </button>
                    <button name='clothes' onClick={(e) => handelCategory(e, setProdCatg)}> Clothes </button>
                </div>
            </div>
        )
    }
}

export default Navbar