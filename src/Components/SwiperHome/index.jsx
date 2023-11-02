import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, { Navigation, Pagination, Swiper } from 'swiper';
import 'swiper/swiper-bundle.css';
import useFetch from './../../Hooks/useFetch';
import Skeleton from 'react-loading-skeleton';
import {useSelector} from 'react-redux';





const MySwiperComponent = () => {

	SwiperCore.use([Navigation, Pagination]);

	const [skeletonState, setSkeletonState] = React.useState(true);
	
	
	const languageInformation = useSelector(state => state.language.language);
	
	const {data, loading, error} = useFetch(process.env.REACT_APP_API_URL+`/slajdi-dlya-golovnoyi-storinkis?locale=${languageInformation.language}&populate=*`);

	useEffect(() => {
		

		const swiper = new Swiper('.swiper-container', {
			
		  
		  navigation: {
			 nextEl: '.slider-button-next',
			 prevEl: '.slider-button-prev',
		  },
		  pagination: {
			 el: '.swiper-pagination',
			 clickable: true,
		  },
		});
	 }, [skeletonState,data]);

	 

  return (
	<>
    <div className="swiper-container">


      <div className="swiper-wrapper">


		{	
				error ? "error on server" : (
				loading ? <div className="skeleton__wr swiper"><Skeleton className='swiper-skeleton' /></div>
				 :
				data.map((slide,index) =>
				<div key={slide.id} className="swiper-slide">
				<div className={skeletonState ? "swiper-slide-wr skeleton-load w100 h100" : "swiper-slide-wr w100 h100"}>

					<div className="initial__slide-text d-flex a-i-center j-c-space">
						<h2>{slide.attributes.title}</h2>
						<Link to={'/'+slide.attributes.linkConfigurator} className='initial__text-btn'>
							<b>{slide.attributes.textForButton}</b>

							<img src={process.env.PUBLIC_URL + '/img/initial__button-arrow.svg'} alt="arrow" />
						</Link>
					</div>

		
					<img className='bg' 
						  src={process.env.REACT_APP_IMG+slide.attributes.img.data.attributes.url} 
						  alt=""
						  onLoad={()=>{data.lenght - 1 === index &&  setSkeletonState(false)}}
						   />

					
					
				</div>
        </div>
				)
				)
}  
      </div>
    </div>
	 
	 <div className="swiper-pagination"></div>

	  <div className="slider-button-next">
	  <img className='bg' src={process.env.PUBLIC_URL + '/img/swiper__navigation.svg'} alt="arrow" />
  </div>

  <div className="slider-button-prev">
	  <img className='bg' src={process.env.PUBLIC_URL + '/img/swiper__navigation.svg'} alt="arrow" />
  </div>
  </>
  );
};

export default MySwiperComponent;