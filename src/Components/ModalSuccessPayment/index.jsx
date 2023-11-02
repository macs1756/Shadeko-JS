import React from 'react';
import './ModalSuccessPayment.scss';


function ModalSuccessPayment() {

	const [copied, setCopied] = React.useState(false);
	const [successParam, setSuccessParam] = React.useState(null);
	const [emailParam, setEmailParam] = React.useState(null);

	

	React.useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		setSuccessParam(queryParams.get('success'));
		setEmailParam(queryParams.get('email'));

	 }, []);


	 const isSuccess = successParam !== null && successParam !== '';

	 const [openModal, setOpenModal] = React.useState(isSuccess);

	 React.useEffect(() => {
		setTimeout(()=>{
			setOpenModal(isSuccess); 
		})
	// Встановлюємо openModal залежно від isSuccess
	 }, [isSuccess]);

	const textToCopy = successParam;


	const handleCopy = () => {
		navigator.clipboard.writeText(textToCopy)
		  .then(() => {
			 setCopied(true);
			 setTimeout(() => setCopied(false), 1500);
		  })
		  .catch(error => console.error('Помилка при копіюванні:', error));
	 };




	return (
		<div className={openModal ? 'modal__wr active modal__successPayment' : 'modal__wr modal__successPayment'}>
			<div className="modal__body">

				<div onClick={()=> setOpenModal(!openModal)} className="modal__close"></div>

				<h4 className='cen'>Дякуємо за ваше замовлення!</h4>
				<h6>Деталі замовлення ми надіслали на вашу пошту <b>{emailParam}</b>.</h6>

				<div className='d-flex a-i-center order__number'>
					<h6>Номер замовлення: <b className={copied ? 'copy' : ''}>{successParam}</b></h6>
					<img onClick={handleCopy}  src={process.env.PUBLIC_URL + '/img/copy-button.svg'} alt="copy button" />
				</div>
				

				<h6>Ви можете відстежувати статус вашого замовлення на нашому сайті.</h6>
				<h6>Якщо ви втратили номер відстеження статусу замовлення, ви зможете знайти його в підвалі нашого веб-сайту.</h6>


			</div>
		</div>
	);
}

export default ModalSuccessPayment;
