import React from 'react';
import './PaymentAndRefunds.scss';
import useFetch from '../../Hooks/useFetch';
import { useSelector } from 'react-redux';


function PaymentAndRefunds() {


	// payment-and-refunds
	const languageInformation = useSelector(state => state.language.language);
	const { data: text, loading, error } = useFetch(process.env.REACT_APP_API_URL + `/payment-and-refunds?locale=${languageInformation.language}&populate=*`);


	

	return (

		loading ?

		<div className="skeleton-app">
  
    <img  src={process.env.PUBLIC_URL + '/img/preloader-application.svg'} alt="preloader" />
    
    </div> :

		<div className="content">
			<div className="payment">

					<h4 className="payment__title">{text[0]?.attributes?.title1}</h4>
					<p className="payment__p1">{text[0]?.attributes?.paragraph1}</p>
		
					<h5>{text[0]?.attributes?.title2}</h5>
					<p className='mb10'>{text[0]?.attributes?.paragraph2}</p>
					<ul className='payment__list-1'>
							<li>{text[0]?.attributes?.elementList1}</li>
							<li>{text[0]?.attributes?.elementList2}</li>
							<li>{text[0]?.attributes?.elementList3}</li>
					</ul>


					<h5>{text[0]?.attributes?.title3}</h5>
					<p className='mb10'>{text[0]?.attributes?.paragraph3}</p>
					<ul className='payment__list-2'>
						<li>{text[0]?.attributes?.elementList4}</li>
						<li>{text[0]?.attributes?.elementList5}</li>
						<li>{text[0]?.attributes?.elementList6}</li>
					</ul>
		
					<p className='payment__finalPart-p1'><b>{text[0]?.attributes?.BoltText}</b> {text[0]?.attributes?.paragraph4}</p>

					<p  className='payment__finalPart-p2'>{text[0]?.attributes?.paragraph5}</p>

					<p  className='payment__finalPart-p3'>{text[0]?.attributes?.paragraph6}</p>

			</div>	
		</div>
	);
}

export default PaymentAndRefunds;