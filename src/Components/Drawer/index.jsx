import React from 'react';
import './drawer.scss';
import Scrollbars from 'react-scrollbars-custom';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import DrawerModalElement from '../DrawerModaElement';


function Drawer({ onClick, drawerOpen, setDrawerOpen, text }) {

  const prodocodeInformation = useSelector(state => state.promocode.promocode);

  const dispatch = useDispatch();

  const products = useSelector(state => state.cart.products);

  const totalPrice = () => {
    let total = 0;
    products.forEach(item => (total += item.quantity * item.price));
    return total.toFixed(2);
  }

  const replaceStateDrawer = () => {
    onClick(false);
  };

  return (
    <>
      <div className={drawerOpen ? 'drawer__wr active' : 'drawer__wr'}>
      </div>
      <div className={drawerOpen ? 'drawer active' : 'drawer'}>

        <h4>{text[0]?.attributes?.modalCartTitle}</h4>

        <img onClick={replaceStateDrawer} className="drawer__close" src={process.env.PUBLIC_URL + '/img/drawer__close.svg'} alt="close" />

        <Scrollbars className="drawer__body">
          {products.length > 0 ? (
            products.map(product => (
                <DrawerModalElement setDrawerOpen={setDrawerOpen} text={text} product={product} key={product.id+'drawerList'} />
            ))
          ) : (
            <div className="drawer__empty">
					<img src={process.env.PUBLIC_URL + '/img/drawer__empty.svg'} alt="icon" />
					<p>{text[0]?.attributes?.modalCartEmpty1}</p>
					<button  onClick={replaceStateDrawer}>{text[0]?.attributes?.modalCartEmpty2}</button>
					</div>
          )}
        </Scrollbars>

        {products.length > 0 && (
          <div className="drawer__details">

            {
              prodocodeInformation[0]?.promocodePercent &&  <div className="drawer__promo">promo -{prodocodeInformation[0]?.promocodePercent}%</div>
            }
           

            <div className="drawer__total d-flex a-i-center j-c-space">
              <p className='upper'>{text[0]?.attributes?.modalCartTotal}</p>


              {
		prodocodeInformation[0]?.promocodePercent ?
		<p className="drawer__total-price">{+(totalPrice() * (100 - prodocodeInformation[0]?.promocodePercent) / 100).toFixed(2)}$</p>
	: 
  <p className="drawer__total-price">{totalPrice()}$</p>
	
}

            </div>
            <Link onClick={replaceStateDrawer} className='drawer__shopping-cart' to='/shopping-cart'>{text[0]?.attributes?.modalCartButtonFirst}</Link>
            <Link onClick={replaceStateDrawer} className='drawer__checkout ' to='/checkout'>{text[0]?.attributes?.modalCartButtonSecond}</Link>
          </div>
        )}

     
      </div>
    </>
  );
}

export default Drawer;
