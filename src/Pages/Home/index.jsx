import React, {useState, useEffect} from 'react';
import Swiper from '../../Components/SwiperHome/';
import './home.scss';
import { Link } from 'react-router-dom';
import Catalog from '../../Components/Catalog';
import useFetch from '../../Hooks/useFetch';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import ModalSuccessPayment from '../../Components/ModalSuccessPayment';
import { Helmet } from 'react-helmet-async';

function Home({text}) {

	const canonicalUrl = window.location.href;

	const languageInformation = useSelector(state => state.language.language);

	const [categoryOpen, setCategoryOpen] = useState(true);
	const [filtersOpen, setFiltersOpen] = useState(true);
	const [skeletonState, setSkeletonState] = React.useState(true);
	
	const {data, loading, error}= useFetch(process.env.REACT_APP_API_URL+`/categories?locale=${languageInformation.language}&populate=*`);

	const {data: seo, loading: seoLoading, error: seoError}= useFetch(process.env.REACT_APP_API_URL+`/seos?locale=${languageInformation.language}&filters[route]=home&populate=*`);

	

	return (  
		<div>

		<Helmet>
        <title>{seo[0]?.attributes?.title}</title>
		  <meta property="og:title" content={seo[0]?.attributes?.title} />

        <meta name="description" content={seo[0]?.attributes?.description} />
		  <meta property="og:description" content={seo[0]?.attributes?.description}  />

        <meta name="keywords" content={seo[0]?.attributes?.keywords}  />

		  <link rel="canonical" href={canonicalUrl} />      
		  <meta name="Publisher" content="https://shadeko.eu/" />		 	
      </Helmet>

		<section className='initial'>
			<Swiper />
		</section>

		<div className="mobile__controls d-flex a-i-center">

			<button onClick={()=>{setCategoryOpen(!categoryOpen)}}>
				<span>{text[0]?.attributes?.mobileControlsCategories}</span>
				<img className={categoryOpen ? 'rotate' : ''} src={process.env.PUBLIC_URL + '/img/header__list-arrow.svg'} alt="arrow" />
			</button>

			<button onClick={()=>{setFiltersOpen(!filtersOpen)}}>
				<span>{text[0]?.attributes?.mobileControlsFilter}</span>
				<img className={filtersOpen ? 'rotate' : ''} src={process.env.PUBLIC_URL + '/img/header__list-arrow.svg'} alt="arrow" />
			</button>


		</div>
		

		<section className={categoryOpen ? 'categories w100' : 'categories none w100' }>

				


				{	
				error ? "error on server" : (
				loading ? 
				<>
				
			<div className="skeleton-categories"><Skeleton /></div>
			<div className="skeleton-categories"><Skeleton /></div>
			<div className="skeleton-categories"><Skeleton /></div>
			<div className="skeleton-categories"><Skeleton /></div>
			<div className="skeleton-categories"><Skeleton /></div>
			<div className="skeleton-categories"><Skeleton /></div>
				</>
				 :
				data.map((category,index) =>
				<div key={category.id+category.attributes.name} className='categories__item'>

						<div className={skeletonState ? "skeleton-load-img active" : "skeleton-load-img"}></div>
					
						<img 
						className='main' 
						src={process.env.REACT_APP_IMG+category.attributes.img.data.attributes.url} 
						alt=""
						onLoad={()=>{data.length - 1 === index && setSkeletonState(false)}}
						 />

						
						<Link to={'/'+category.attributes.url} className='cen w100 categories__item-link'>
							{category.attributes.name}
						</Link>
				</div>
				)
				)
}



		</section>

		
		<Catalog  
		filterOpenState={filtersOpen} 
		text={text} 
		title={text[0]?.attributes?.catalogTitleHome}
		  />

		
		<ModalSuccessPayment />
	
		
		</div>
	);
}

export default Home;