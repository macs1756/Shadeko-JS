import React from 'react';
import axios from 'axios';


function ConsultationModal( { setModalOpen, modalOpen, text } ) {


	const [name,setName] = React.useState('');
	const [validName,setValidName] = React.useState(false);


	const [phone,setPhone] = React.useState('');
	const [validPhone,setValidPhone] = React.useState(false);
	const [buttonDisabledWhenLoadingApplication, setButtonDisabledWhenLoadingApplication] = React.useState(false);

	const AddNewApplicationOnServer = async () => {

		setButtonDisabledWhenLoadingApplication(!buttonDisabledWhenLoadingApplication);

		try {
			
			const response = await axios.post(
			  `${process.env.REACT_APP_API_URL}/zayavki-na-konsultacziyus/`,
			  {
				 data: {  // Add the "data" key here
					name: name,
					phone: phone,
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
			setButtonDisabledWhenLoadingApplication(false);
		},1000);
			
		 } catch (err) {
			alert(err);
		 }
		 
			
	}



	const ValidateForms = () => {

		name.length < 2 ? setValidName(true) : setValidName(false);
		phone.length < 5 ? setValidPhone(true) : setValidPhone(false);
		

		const expression = name.length > 2 && phone.length > 5;

		expression && AddNewApplicationOnServer();
		
	}




	return (
		<div className={modalOpen ? "modal__wr calculate active" : "modal__wr calculate"}>
		<div className="modal__body">
			<div onClick={()=>{setModalOpen(!modalOpen)}} className="modal__close"></div>

			<h4 className='cen'>{text[0]?.attributes?.titleModal}</h4>



			<input 
			className={validName ? 'invalid' : ''}
			id='name' 
			value={name}
			onChange={(e)=> setName(e.target.value)}
			type="text" 
			placeholder={text[0]?.attributes?.placeholderInput1}
			 />
			 

			<input 
			className={validPhone ? 'invalid' : ''}
			id='phone' 
			value={phone}
			onChange={(e)=> setPhone(e.target.value)}
			type="text" 
			placeholder={text[0]?.attributes?.placeholderInput2}
			 />

		
			<button 
			onClick={()=>ValidateForms()}
			disabled={buttonDisabledWhenLoadingApplication ? true : false}
			>{text[0]?.attributes?.buttonText}</button>


		</div>
	</div>
	);
}

export default ConsultationModal;