import React from 'react';
import './contacts.scss';
import ConsultationModal from '../../Components/ConsultationModal';
import { useSelector }  from 'react-redux';
import useFetch from '../../Hooks/useFetch';


function Contacts() {


	const languageInformation = useSelector(state => state.language.language);
	const { data, loading, error } = useFetch(process.env.REACT_APP_API_URL + `/abouts?locale=${languageInformation.language}&populate=*`);
	const [modalOpen,setModalOpen] = React.useState(false);

	return (

		loading ?

		<div className="skeleton-app">
  
    <img  src={process.env.PUBLIC_URL + '/img/preloader-application.svg'} alt="preloader" />
    
    </div> :

		<div className="content">
			<div className="contacts">

				<h4 className='contacts__title cen'>{data[0]?.attributes?.contactTitle}</h4>

				<div className="contacts__net">

					<div className="contacts__net-map">
						<iframe 
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2562.588317305365!2d14.338425976127283!3d50.03780951698949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b960a6e57eb25%3A0xf9525a9031883536!2zS3Vyem92YSAyMjIyLzE2LCAxNTUgMDAgUHJhaGEgMTMsINCn0LXRhdC40Y8!5e0!3m2!1sru!2sua!4v1692351872765!5m2!1sru!2sua" 
						allowfullscreen="" 
						loading="lazy" 
						referrerpolicy="no-referrer-when-downgrade"></iframe>
					</div>

					<div className="contacts__net-text">

						<section>
								<b>{data[0]?.attributes?.contactAddressLabel}</b>
								<span>{data[0]?.attributes?.contactAddressBody}</span>
						</section>


						<section>
								<b>{data[0]?.attributes?.contactPhoneLabel}</b>
								<span>{data[0]?.attributes?.contactPhoneBody}</span>
						</section>


						<section>
								<b>{data[0]?.attributes?.contactEmailLabel}</b>
								<span>{data[0]?.attributes?.contactEmailBody}</span>
						</section>

						<button 
						onClick={() => setModalOpen(!modalOpen)} 
						className='contacts__open-modal'
						>{data[0]?.attributes?.buttonText}</button>
						

					</div>


				</div>


		</div>

		<ConsultationModal modalOpen={modalOpen} setModalOpen={setModalOpen} text={data} />


		</div>
	);
}

export default Contacts;