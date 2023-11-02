import React, { useState }  from 'react';
import CheckoutItem from '../../Components/CheckoutItem';
import './checkout.scss';
import {Link, useNavigate} from 'react-router-dom';
import Scrollbars from 'react-scrollbars-custom';

import {useSelector, useDispatch} from 'react-redux';
import {  replaceItem, resetCart } from '../../Redux/cartReducer';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import { makeRequest } from '../../Components/MakeRequest';
import { addTimestamp } from '../../Redux/timestampReducer';


function Checkout({ text }) {
	
	let navigate = useNavigate();
	const dispatch = useDispatch();


	const [modalPreview, setModalPreview] = React.useState(false);

	const products = useSelector(state=>state.cart.products);
	const profile = useSelector(state=>state.login.login);
	const [profileData, setProfileData] = React.useState({});
	const prodocodeInformation = useSelector(state => state.promocode.promocode);
	const [disabledButton,setDisabledButton] = React.useState(false);


	const [activeButtonData, setActiveButtonData] = useState('getting');

	const handleRadioChange = (event) => {
	  const data = event.target.getAttribute('data');
	  setActiveButtonData(data);
	};

	



	const [inputFirstName, setInputFirstName] = React.useState('');
	const [inputSecondName, setInputSecondName] = React.useState('');
	const [inputCompanyName, setInputCompanyName] = React.useState('');
	const [inputCountry, setInputCountry] = React.useState('');
	const [inputCity, setInputCity] = React.useState('');
	const [inputRegion, setInputRegion] = React.useState('');
	const [inputZipCode, setInputZipCode] = React.useState('');
	const [inputAdress, setInputAdress] = React.useState('');
	const [inputPhone, setInputPhone] = React.useState('');
	const [inputEmail, setInputEmail] = React.useState('');
	const [inputDetails, setInputDetails] = React.useState('');

	const [validityInputName, setValidityInputName] = React.useState(false);
	const [validityInputCountry, setValidityInputCountry] = React.useState(false);
	const [validityInputCity, setValidityInputCity] = React.useState(false);
	const [validityInputZipCode, setValidityInputZipCode] = React.useState(false);
	const [validityInputAdress, setValidityInputAdress] = React.useState(false);
	const [validityInputPhone, setValidityInputPhone] = React.useState(false);
	const [validityInputEmail, setValidityInputEmail] = React.useState(false);

	

	React.useEffect(() => {
		setInputFirstName(profileData.username || '');
		setInputSecondName(profileData.lastName || '');
		setInputCompanyName(profileData.companyName || '');
		setInputCountry(profileData.country || '');
		setInputCity(profileData.city || '');
		setInputRegion(profileData.region || '');
		setInputZipCode(profileData.zipCode || '');
		setInputAdress(profileData.adress || '');
		setInputPhone(profileData.phone || '');
		setInputEmail(profileData.email || '');
		setInputDetails('');

		setTimeout(()=>{
			setModalPreview(!modalPreview);
		},2000);

  }, [profileData]);
	


	const fetchData = async () => {

		if(profile.length > 0){
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${profile[0].profileId}?populate=*`,
			 
			{
				headers: {
					Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
				 },
			});
			
		
			setProfileData(response.data);
			
			// Перенаправлення на захищену сторінку або виконання інших дій
			// ...
		 } catch (error) {
			// Обробка помилок аутентифікації
			console.log(error);
		 }	
		}
	 };

	 React.useEffect(()=>{
		fetchData();
	 }, []);



	 const stripePromise = loadStripe(process.env.REACT_APP_PAYMENT_KEY);



const [createOrdersProductsId, setCreateOrdersProductsId] = useState([]);


const selectedKeys = 

	['id', 'title', 'price', 'quantity', 'materialArticle', 'colorArticle', 'modules', 'configurations', 'img', 'material', 'color', 'stockQuantity'];

const cleanProducts = products.map(item => {
  const newItem = {};

  for (const key of selectedKeys) {
    if (item[key]) {
      newItem[key] = item[key];
    }
  }

  return newItem;
});


  React.useEffect(() => {
    const ids = products.map(item => item.id);
    setCreateOrdersProductsId(ids);
  }, [products]);


	 const createOrder = async () => {

		const currentTimestamp = Date.now();


		const userInformation = {
			Name: inputFirstName,
			LastName: inputSecondName,
			CompanyName: inputCompanyName,
			Country: inputCountry,
			City: inputCity,
			Region: inputRegion,
			ZipCode: inputZipCode,
			Adress: inputAdress,
			Phone: inputPhone,
			EmailAddress: inputEmail,
			OrderNotes: inputDetails,
		}




		setDisabledButton(!disabledButton);
	
		try{
		
			const res = await makeRequest.post('/unpaid-orders', {
				data: {
				status: 'Pending maneger review',
				timeStamp: currentTimestamp.toString(),
				clientInformation: userInformation,
				commentForOrder: '',
				products: createOrdersProductsId,
				totalPrice: +totalPrice(),
				productsDetails: cleanProducts,
				promocodePercent: prodocodeInformation[0]?.promocodePercent ? prodocodeInformation[0]?.promocodePercent.toString() : '0',
				}
			});

			if(res.status === 200){

				setDisabledButton(false);

				dispatch(resetCart());
				dispatch(addTimestamp(currentTimestamp));
			    
				 setTimeout(()=>{
		 				navigate(`/?success=${currentTimestamp.toString()}&email=${inputEmail}`);
				 },1000);


			};
	
		
			}catch(err){
				console.log(err);
				setDisabledButton(!disabledButton);
			}
	 }

	 const createPayment = async () => {
		setDisabledButton(!disabledButton);
		try{
		const stripe = await stripePromise;
		const res = await makeRequest.post('/orders', {
			products,
			email: profileData.email
		});
		await stripe.redirectToCheckout({
			sessionId: res.data.stripeSession.id
		})
		}catch(err){
			console.log(err);
			setDisabledButton(!disabledButton);
		}
	 }



	 const handlePayment = () => {


		if (inputCountry.length < 2) {		 
			 setValidityInputCountry(true);		 
		}else{
			setValidityInputCountry(false);		 
		}

		if (inputFirstName.length < 2) {		 
			 setValidityInputName(true);		 
		}else{
			setValidityInputName(false);		 
		}


		if (inputPhone.length < 5) {		 
			 setValidityInputPhone(true);		 
		}else{
			setValidityInputPhone(false);		 
		}


		if (inputEmail.length < 5) {		 
			 setValidityInputEmail(true);		 
		}else{
			setValidityInputEmail(false);		 
		}


		if (inputAdress.length < 2) {		 
			 setValidityInputAdress(true);		 
		}else{
			setValidityInputAdress(false);		 
		}


		if (inputZipCode.length < 2) {		 
			 setValidityInputZipCode(true);		 
		}else{
			setValidityInputZipCode(false);		 
		}


		if (inputCity.length < 2) {		 
			 setValidityInputCity(true);		 
		}else{
			setValidityInputCity(false);
		}

		const expression = 
		inputCountry.length >= 2 && inputCity.length >= 2 && inputFirstName.length >= 2 && inputPhone.length >= 5 && inputEmail.length >= 5 && inputZipCode.length >= 2 && inputAdress.length >= 2;

		

		if(expression){


			if(activeButtonData === 'stripe'){
				createPayment();
			}else{
				createOrder();
	
				
			}
		
		}

  };
  

	 const totalPrice = (type) => {
		let total = 0;
		products.forEach(item => {
		  if (item.stockQuantity === 0) {
			 total += item.quantity * item.price / 2;
		  } else {
			 total += item.quantity * item.price;
		  }
		});


	  if(prodocodeInformation[0]?.promocodePercent) {
		 total = +(total * (100 - prodocodeInformation[0]?.promocodePercent) / 100);
	  }

		return total.toFixed(2);
	 };
	

	 const [counterValues, setCounterValues] = useState({});

	const handleCounterChange = (productId, value) => {
		setCounterValues((prevValues) => ({
			...prevValues,
			[productId]: value,
		}));
	};

	const replaceCardParent = (id,count) => {
		  dispatch(replaceItem({
			 id: id,
			 quantity: count
		  }));
	};


	

	

	return (
		<div className='checkout content'>
			<div className="checkout__details">
				<h4>{text[0]?.attributes?.checkoutTitleLeft}</h4>





				<section className='part d-flex a-i-start j-c-space'>



					<div className='part__item'>
						<label htmlFor="userName">{text[0]?.attributes?.checkoutFirstName}</label>
						<input className={validityInputName ? 'invalid' : ''} value={inputFirstName} onChange={(e)=> setInputFirstName(e.target.value)} type="text" id="username" />
					</div>

			

					<div className='part__item'>
						<label htmlFor="lastName">{text[0]?.attributes?.checkoutLastName}</label>
						<input value={inputSecondName} onChange={(e)=> setInputSecondName(e.target.value)} type="text" id="lastName" />
					</div>


				</section>


				<section>
					<label htmlFor="companyName">{text[0]?.attributes?.checkoutCompanyName}</label>
					<input value={inputCompanyName} onChange={(e)=> setInputCompanyName(e.target.value)} type="text" id="companyName" />
				</section>


				<section>
					<label htmlFor="country">{text[0]?.attributes?.checkoutCountry}</label>
					<input className={validityInputCountry ? 'invalid' : ''} value={inputCountry} onChange={(e) => setInputCountry(e.target.value)} type="text" id='country' />
				</section>


				<section>
					<label htmlFor="city">{text[0]?.attributes?.checkoutCity}</label>
					<input className={validityInputCity ? 'invalid' : ''} value={inputCity} onChange={(e) => setInputCity(e.target.value)} type="text" id='city' />
				</section>


				<section>
					<label htmlFor="region">{text[0]?.attributes?.checkoutRegion}</label>
					<input value={inputRegion} onChange={(e) => setInputRegion(e.target.value)} type="text" id='region' />
				</section>


				<section>
					<label htmlFor="zipCode">{text[0]?.attributes?.checkoutZIPcode}</label>
					<input className={validityInputZipCode ? 'invalid' : ''} value={inputZipCode} onChange={(e) => setInputZipCode(e.target.value)} type="text" id='zipCode' />				
				</section>


				<section>
					<label htmlFor="adress">{text[0]?.attributes?.checkoutAdress}</label>
					<input className={validityInputAdress ? 'invalid' : ''} value={inputAdress} onChange={(e) => setInputAdress(e.target.value)} type="text" id='adress' />
				</section>


				<section>
					<label htmlFor="phone">{text[0]?.attributes?.checkoutPhone}</label>
					<input className={validityInputPhone ? 'invalid' : ''} value={inputPhone} onChange={(e) => setInputPhone(e.target.value)} type="text" id='phone' />				
				</section>


				<section>
					<label htmlFor="email">{text[0]?.attributes?.checkoutEmail}</label>
					<input className={validityInputEmail ? 'invalid' : ''} value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} type="text" id='email' />				
				</section> 



				<h4 className='m0'>{text[0]?.attributes?.checkoutDetailsTitle}</h4>


				<section>
					<label htmlFor="shoppingDetails">{text[0]?.attributes?.checkoutDetailsLabel}</label>
					<textarea value={inputDetails} onChange={ (e) => setInputDetails(e.target.value)} id="shoppingDetails"></textarea>
				</section>


				<Link className="checkout__button w100 cen mobile-version" to='/'>Proceed <span>to PayPal</span></Link>


			</div>
			<div className="checkout__order">
					<h4>{text[0]?.attributes?.checkoutTitleRight}</h4>

					<div className="checkout__order-net-wr">

					<Scrollbars className='checkout__order-net'>

					   {
							products?.map((product)=>(
								<CheckoutItem
								product={product}
								key={product.id}
								onCounterChange={handleCounterChange}
								replaceCardPerent ={replaceCardParent}
								text={text}
								  />
							))
						}
						
					</Scrollbars>
					
					</div>



					<div className="checkout__price">

						{
              prodocodeInformation[0]?.promocodePercent &&  <div className="drawer__promo">promo -{prodocodeInformation[0]?.promocodePercent}%</div>
            }

						<div className="checkout__price-total d-flex a-i-center j-c-space">
							<h5>{text[0]?.attributes?.checkoutTotal}</h5>

  							<h5>{totalPrice()}$</h5>

						</div>


					</div>
			

					<div className="checkout__types">

					<div className="checkout__types-item  d-flex a-i-center">

<input 
id='paymentype2' 
data='getting' 
checked={activeButtonData === 'getting'}
  onChange={handleRadioChange}
name='type'  
type="radio"

 />

<label htmlFor="paymentype2">{text[0]?.attributes?.paymentType2}</label>
					</div>


					<div className="checkout__types-item border-bottom d-flex a-i-center">

						<input 
						 
						data='stripe' 
						id='paymentype1' 
						checked={activeButtonData === 'stripe'}
						onChange={handleRadioChange}
						name='type'
						type="radio" />

						<label htmlFor="paymentype1">{text[0]?.attributes?.paymentType1}</label>
					</div>


					
					</div>

					
					<button disabled={disabledButton} onClick={handlePayment} className="checkout__button w100 cen pc-version">
				
						{
							activeButtonData === 'stripe' ? 			
							text[0]?.attributes?.paymentType1ButtonText				
							:					
							text[0]?.attributes?.paymentType2ButtonText					
						}

						


						</button>

			</div>


			<div onClick={() => setModalPreview(!modalPreview )} className={modalPreview ? "modal__wr modal-checkout d-flex a-i-center j-c-center active" : "modal__wr modal-checkout d-flex a-i-center j-c-center"} >
				<div className="modal__body">
					<h4>В цьому розділі сайту ви маєте можливість збільшити зображення, просто клікнувши на нього.</h4>
				</div>
			</div>
		
		</div>
	);
}

export default Checkout;
