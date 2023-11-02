 import React from 'react';
 import axios from 'axios';
 
 function CalculateShipping({modalOpen,setModalOpen,text}) {

	const [name,setName] = React.useState('');
	const [validName,setValidName] = React.useState(false);


	const [phone,setPhone] = React.useState('');
	const [validPhone,setValidPhone] = React.useState(false);

	const [country,setCountry] = React.useState('');
	const [validCountry,setValidCountry] = React.useState(false);

	const [city,setCity] = React.useState('');
	const [validCity,setValidCity] = React.useState(false);


	const [zipCode,setZipCode] = React.useState('');
	const [validZipCode,setValidZipCode] = React.useState(false);

	const [adress,setAdress] = React.useState('');
	
	const [buttonDisabledWhenLoadingApplication, setButtonDisabledWhenLoadingApplication] = React.useState(false);


	const AddNewApplicationOnServer = async () => {

		setButtonDisabledWhenLoadingApplication(!buttonDisabledWhenLoadingApplication);

		try {
			
			const response = await axios.post(
			  `${process.env.REACT_APP_API_URL}/calculate-shippings/`,
			  {
				 data: {  // Add the "data" key here
					name: name,
					phone: phone,
					country: country,
					city: city,
					zipCode: zipCode,
					adress: adress,
					status: 'Added'
				 },
			  },
			  {
				 headers: {
					Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
				 },
			  }
			);
		 
			


		setTimeout(()=>{
			setModalOpen(!modalOpen);
			setName('');
			setPhone('');
			setCountry('');
			setCity('');
			setZipCode('');
			setAdress('');
			setButtonDisabledWhenLoadingApplication(false);
		},1000);
			
		 } catch (err) {
			alert(err);
		 }
		 
			
	}


	const ValidateForms = () => {

		name.length < 2 ? setValidName(true) : setValidName(false);
		phone.length < 5 ? setValidPhone(true) : setValidPhone(false);
		country.length < 2 ? setValidCountry(true) : setValidCountry(false);
		city.length < 2 ? setValidCity(true) : setValidCity(false);
		zipCode.length < 3 ? setValidZipCode(true) : setValidZipCode(false);

		const expression = name.length >= 2 && phone.length >= 5 && country.length >= 2 && city.length >= 2 && zipCode.length >= 2;

		

		expression && AddNewApplicationOnServer();
		
	}


	

	return (
		<div className={modalOpen ? "modal__wr calculate active" : "modal__wr calculate"}>
				<div className="modal__body">
					<div onClick={()=>{setModalOpen(!modalOpen)}} className="modal__close"></div>

					<h4 className='cen'>{text[0]?.attributes?.shoppingCartModalTitle}</h4>



					<input 
					className={validName ? 'invalid' : ''}
					id='name' 
					value={name}
					onChange={(e)=> setName(e.target.value)}
					type="text" 
					placeholder={text[0]?.attributes?.shoppingCartModalPlaceholderName}
					 />

					<input 
					className={validPhone ? 'invalid' : ''}
					id='phone' 
					value={phone}
					onChange={(e)=> setPhone(e.target.value)}
					type="text" 
					placeholder={text[0]?.attributes?.shoppingCartModalPlaceholderPhone}
					 />

					<input 
					className={validCountry ? 'invalid' : ''}
					value={country}
					onChange={(e) => setCountry(e.target.value)}
					id='countryConsultation' 
					type="text" 
					placeholder={text[0]?.attributes?.shoppingCartModalPlaceholderCountry}
					 />

					<input
					className={validCity ? 'invalid' : ''} 
					value={city}
					onChange={(e) => setCity(e.target.value)}
					id='cityConsultation' 
					type="text" 
					placeholder={text[0]?.attributes?.shoppingCartModalPlaceholderCity} 
					/>	

					<input 
					value={zipCode}
					onChange={(e) => setZipCode(e.target.value)}
					className={validZipCode ? 'invalid' : ''} 
					id='zipCodeConsultation' 
					type="text" 
					placeholder={text[0]?.attributes?.shoppingCartModalPlaceholderZipCode}
					 />


					<input 
					value={adress}
					onChange={(e) => setAdress(e.target.value)}
					id='adressConsultation' 
					type="text" 
					placeholder={text[0]?.attributes?.shoppingCartModalPlaceholderAdress} 
					/>

				
					<button 
					onClick={()=>ValidateForms()}
					disabled={buttonDisabledWhenLoadingApplication ? true : false}
					>{text[0]?.attributes?.shoppingCartModalConfirmButton}</button>


				</div>
			</div>
	);

 }
 
 export default CalculateShipping;