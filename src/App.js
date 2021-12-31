import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components/Query';
import { useState } from 'react';
import CartPage from './components/CartPage';
import Navbar from './components/Navbar';
import PLP from './components/PLP';
import ProductView from './components/ProductView';
import './style/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Product_Query } from './graphql/graphqls';


function App() {

  const [ProdGender, setProdGender] = useState('');
  const [ProdCatg, setProdCatg] = useState('');
  const [CurrencyListener, setCurrencyListener] = useState('$');
  // const Product_Query = gql`query ItemQuery{
  //     ProductsData{
  //       id, title, description, price, category, gender, sizes, selected
  //     }
  // }`;   

  return (
    <Router>
    <div className="App">
      <Query query={Product_Query}>{
      ({loading, error, data}) => {
      if(loading) return <h4>loading ...</h4>
      if(error) console.log(error);
      console.log(data);

      return (<>
        <Navbar  dt={data}  ProdCatg = {ProdCatg} setProdCatg = {setProdCatg}  ProdGender = {ProdGender}  setProdGender = {setProdGender} CurrencyListener={CurrencyListener} setCurrencyListener={setCurrencyListener} />
        <Routes>          
          <Route path='/'  element={<PLP ProdCatg = {ProdCatg} ProdGender = {ProdGender} CurrencyListener={CurrencyListener} />} />
          <Route path='/cart'  element={<CartPage CurrencyListener={CurrencyListener} />} />
          <Route path='/product-view'  element={<ProductView CurrencyListener={CurrencyListener} />} />
          {/* <PLP ProdGender = {ProdGender} CurrencyListener={CurrencyListener} />
          <CartPage CurrencyListener={CurrencyListener} />
          <ProductView CurrencyListener={CurrencyListener} /> */}
        </Routes>
      </>)
      }}</Query>
      <div className='miniCart-overlay'></div>
    </div>
    </Router>
  );
}

export default App;
