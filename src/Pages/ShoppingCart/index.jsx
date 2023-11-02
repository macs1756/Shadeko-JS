import React, {useState} from 'react';
import ShoppingCartElement from '../../Components/shoppingCartElement';
import './shoppingCart.scss';
import Scrollbars from 'react-scrollbars-custom';
import {Link} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';
import {  replaceItem } from '../../Redux/cartReducer';
import { useEffect } from 'react';

import { addPromocode, resetPromocode } from '../../Redux/promocodeReducer';
import CalculateShipping from '../../Components/CalculateShipping';




function ShoppingCart({text}) {

	const prodocodeInformation = useSelector(state => state.promocode.promocode);

	const [modalPreview, setModalPreview] = React.useState(false);
	
	
	const dispatch = useDispatch();
	const [promocodeStatus, setPromocodeStatus] = useState('');
	const [promocodeValue, setPromocodeValue] = useState('');
	const [promoFlag, setPromoFlag] = useState(false);
	const [activityPromocode, setActivityPromocode] = useState(false);
	
	const [finalPrice, setFinalPrice] = useState('');

	const [modalOpen,setModalOpen] = React.useState(false);

	const products = useSelector(state=>state.cart.products);

	let total =  0;


	

	useEffect(()=>{
		products.forEach(item=> (total+=item.quantity * item.price));
		setFinalPrice(total.toFixed(2));
	}, [products]);


	useEffect(()=>{

		if(prodocodeInformation[0]?.promocodeName){
			setPromocodeValue(prodocodeInformation[0].promocodeName);
		}

		if(prodocodeInformation[0]?.promocodePercent){
			setActivityPromocode(true);
			setPromocodeStatus(`${text[0]?.attributes?.shoppingCartCouponActive} <span>${prodocodeInformation[0].promocodePercent}%</span>`);
		}
		

		setTimeout(()=>{
			setModalPreview(!modalPreview);
		},2000);


	}, []);

	const deletePromocode = () => {
		dispatch(resetPromocode());
		setPromocodeStatus('');
		setActivityPromocode(false);
		setPromoFlag(false);
		setPromocodeValue('');
	}


	const AddPromocode = async (promocode) =>{

		

		try {

			const response = await fetch(`${process.env.REACT_APP_API_URL}/promocodes?filters[name][$eq]=${promocode}&populate=*`,{
			headers: {
			  Authorization: "Bearer "+process.env.REACT_APP_API_TOKEN,
		  }}
  
			);
			let data = await response.json();
		  	
			

			if(data.data.length === 0){
				setPromocodeStatus(text[0]?.attributes?.shoppingCartCouponNotFound);
				setPromoFlag(false);
			}else{
				
				let promocode = data.data[0];

				let endDate = promocode.attributes.date;
				const dateObject = new Date(endDate);
				const dateCuponEndMs = dateObject.getTime();
				
				
				const currentDate = new Date();
				const currentDateMs = currentDate.getTime();

				if(currentDateMs > dateCuponEndMs){
					setPromocodeStatus(text[0]?.attributes?.shoppingCartCouponInvalid);
					setPromoFlag(false);
				}else{

					let percentServerRequest = promocode.attributes.percent;
					let percent = (100 - percentServerRequest) / 100;



					

					if(activityPromocode){
						setPromocodeStatus(text[0]?.attributes?.shoppingCartCouponActive);
					}else{

								
						setPromoFlag(true);
						setActivityPromocode(true);
						setPromocodeStatus(`${text[0]?.attributes?.shoppingCartCouponActive} <span>${percentServerRequest}%</span>`);

						

						dispatch(addPromocode({
							promocodeName: promocode.attributes.name,
							promocodePercent: percentServerRequest,
							finalPrice: finalPrice,
							status: true
						}));
						
					}
				}

			}
			
			
  

		 } catch (error) {
			console.log(error);	
		 }
	
	}


const replaceCard = () => {
	Object.keys(counterValues).forEach((productId) => {
	  dispatch(replaceItem({
		 id: productId,
		 quantity: counterValues[productId]
	  }));
	});
 };
 


//reverse count element 

const [counterValues, setCounterValues] = useState({});



const handleCounterChange = (productId, value) => {
	setCounterValues((prevValues) => ({
	  ...prevValues,
	  [productId]: value,
	}));
 };





	return (
		<div className='shoppingCart content'>


			<div className="shoppingCart__main">
					<h4>{text[0]?.attributes?.shoppingCartTitleLeft}</h4>


					<div className="shoppingCart__net-wr">

					<Scrollbars className="shoppingCart__net" >

						{
							products?.map((product)=>(
								<ShoppingCartElement 
								product={product}
								key={product.id}
								onCounterChange={handleCounterChange}
								  />
							))
						}

</Scrollbars>
					</div>
					

					<div className="shoppingCart__coupon d-flex a-i-center j-c-space">

						<div className='shoppingCart__coupon-first'>
						<input value={promocodeValue} onChange={(e)=>{setPromocodeValue(e.target.value)}} placeholder='Coupon code' type="text" />
						<button onClick={()=>{AddPromocode(promocodeValue)}} className='shoppingCart__coupon-button'>{text[0]?.attributes?.shoppingCartAddCoupon}</button>
						<div className='promocode__status' dangerouslySetInnerHTML={{ __html: promocodeStatus }}></div>
						</div>

						

						<button onClick={()=>{replaceCard()}}  className="shoppingCart__update-cart upper">{text[0]?.attributes?.shoppingCartUpdateCart}</button>
						
					</div>
					<button className='promocode__delete' onClick={()=>{deletePromocode()}}>{text[0]?.attributes?.shoppingCartRemoveCoupon}</button>
			</div>


			<div className="shoppingCart__details">
					<h4>{text[0]?.attributes?.shoppingCartTitleRight}</h4>

					<div className="shoppingCart__details-net">


							<div className="details__price w100 d-flex a-i-center j-c-space">
									<h5>{text[0]?.attributes?.shoppingCartSubtotal}</h5>

{
		prodocodeInformation[0]?.promocodePercent ?
		<h5>{(finalPrice * (100 - prodocodeInformation[0]?.promocodePercent) / 100).toFixed(2)}$</h5>
	: 
		<h5>{finalPrice}$</h5>
	
}

									


									
							</div>
							
							<div className="details__shipping">
								<h5>{text[0]?.attributes?.choppingCardShippingTitle}</h5>

								<section className='details__shipping-option d-flex a-i-center j-c-space'>
									<div className="option-text">
										<input checked id='shipping1' onChange={()=>{}} name='shipping' type="radio" />
										<label htmlFor="shipping1">{text[0]?.attributes?.shoppingCartShippingOption}</label>

									</div>
									<div className="option-price">$10,00</div>
								</section>

								
							</div>

							<div className="details__adress">


							

						
							<section className="details__tootal-price ">
							
									<button onClick={()=>{setModalOpen(!modalOpen)}} className='d-flex a-i-center calculate__shipping'>	
									<img  src={process.env.PUBLIC_URL + '/img/calculate__shipping.svg'} alt="header__logo" />
										<span>{text[0]?.attributes?.shoppingCartModalTitle}</span>
									</button>
								
									

									<p className={promoFlag || prodocodeInformation[0]?.status ? 'details__promo active' : 'details__promo'}>promo</p>
									<div className='d-flex a-i-center j-c-space'>
										<h5>{text[0]?.attributes?.shoppingCartTotal}</h5>

										{
		prodocodeInformation[0]?.promocodePercent ?
		<h5>{+(finalPrice * (100 - prodocodeInformation[0]?.promocodePercent) / 100).toFixed(2) + 10}$</h5>
	: 
		<h5>{+finalPrice + 10}$</h5>
	
}
										


									</div>
									
								</section>

								<Link className='shoppingCart__update-cart upper w100 cen d-flex a-i-center j-c-center' to='/checkout'>{text[0]?.attributes?.shoppingCartCheckoutButton}</Link>

							</div>

					</div>

			</div>


			<div onClick={() => setModalPreview(!modalPreview )} className={modalPreview ? "modal__wr modal-checkout d-flex a-i-center j-c-center active" : "modal__wr modal-checkout d-flex a-i-center j-c-center"} >
				<div className="modal__body">
					<h4>{text[0]?.attributes.modalGrowImage}</h4>
				</div>
			</div>
			
			<CalculateShipping text={text} setModalOpen={setModalOpen} modalOpen={modalOpen} />

		</div>
	);
}

export default ShoppingCart;