import React from 'react';
import './aboutUs.scss';
import { useSelector }  from 'react-redux';
import useFetch from '../../Hooks/useFetch';
import ConsultationModal from '../../Components/ConsultationModal';

function AboutUs() {

	const languageInformation = useSelector(state => state.language.language);
	const { data, loading, error } = useFetch(process.env.REACT_APP_API_URL + `/abouts?locale=${languageInformation.language}&populate=*`);
	const [skeletonState, setSkeletonState] = React.useState(true);
	const [modalOpen,setModalOpen] = React.useState(false);


	return (

		loading ?

		<div className="skeleton-app">
  
    <img  src={process.env.PUBLIC_URL + '/img/preloader-application.svg'} alt="preloader" />
    
    </div> :

		<div className="about content">

			<div className="about__title">{data[0]?.attributes?.title}</div>

			<div className="about__net">


				<div className="about__net-img">
				<img
                src={process.env.REACT_APP_IMG + data[0]?.attributes?.img?.data?.attributes?.url}
                alt="background"
					 onLoad={()=> setSkeletonState(false)}
              />

				  <div className={skeletonState ? "skeleton-load-img active" : "skeleton-load-img"}></div>

				</div>

				<div className="about__net-text">
						<p>{data[0]?.attributes?.paragraph_1}</p>
						<p>{data[0]?.attributes?.paragraph_2}</p>
						<p>{data[0]?.attributes?.paragraph_3}</p>
						<p>{data[0]?.attributes?.paragraph_4}</p>
				
					<div className='d-flex w100 j-c-end about__button-wrapper'>

						<button onClick={()=> setModalOpen(!modalOpen) }>{data[0]?.attributes?.buttonText}</button>	
					</div>
			
				</div>

			</div>

			<ConsultationModal modalOpen={modalOpen} setModalOpen={setModalOpen} text={data} />

		</div>
	);
}

export default AboutUs;