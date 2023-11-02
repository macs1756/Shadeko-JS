import React, {useState} from 'react';
import './luxury.scss';
import {Link} from 'react-router-dom';
import Catalog from '../../Components/Catalog';
import useFetch from '../../Hooks/useFetch';
import Skeleton from 'react-loading-skeleton';
import {useSelector} from 'react-redux';
import { Helmet } from 'react-helmet-async';

function Luxury({text}) {

	const canonicalUrl = window.location.href;

	const [categoryOpen, setCategoryOpen] = useState(true);
	const [filtersOpen, setFiltersOpen] = useState(true);
	const languageInformation = useSelector(state => state.language.language);
	const [skeletonState, setSkeletonState] = React.useState(true);
	
	const {data, loading, error} = useFetch(process.env.REACT_APP_API_URL+`/categories-luxury?locale=${languageInformation.language}&populate=*`);
	const {data: seo, loading: seoLoading, error: seoError}= useFetch(process.env.REACT_APP_API_URL+`/seos?locale=${languageInformation.language}&filters[route]=luxury-style&populate=*`);

	
		return (
		<div className='sofas'>

	<Helmet>
        <title>{seo[0]?.attributes?.title}</title>
		  <meta property="og:title" content={seo[0]?.attributes?.title} />

        <meta name="description" content={seo[0]?.attributes?.description} />
		  <meta property="og:description" content={seo[0]?.attributes?.description}  />

        <meta name="keywords" content={seo[0]?.attributes?.keywords}  />

		  <link rel="canonical" href={canonicalUrl} />      
		  <meta name="Publisher" content="https://shadeko.eu/" />		 	
   </Helmet>

		
		<div className="content">
					<div className="sofas__bread-crumbs d-flex a-i-center">
						<Link to='/'>{text[0]?.attributes?.breadCrumbHome}</Link>
						<span>/</span>
						<p>{text[0]?.attributes?.breadCrumbCategory6}</p>
					</div>

			<div className="mobile__controls d-flex a-i-center">

<button onClick={()=>{setCategoryOpen(!categoryOpen)}}>
	<span>{text[0]?.attributes?.mobileControlsCategories}</span>
	<img className={!categoryOpen && 'rotate'} src={process.env.PUBLIC_URL + '/img/header__list-arrow.svg'} alt="arrow" />
</button>

<button onClick={()=>{setFiltersOpen(!filtersOpen)}}>
	<span>{text[0]?.attributes?.mobileControlsFilter}</span>
	<img className={!filtersOpen && 'rotate'} src={process.env.PUBLIC_URL + '/img/header__list-arrow.svg'} alt="arrow" />
</button>



			</div>


		</div>
		
			<div>
		
			</div>


			<div className={categoryOpen ? "flooring__net" : 'd-none'}>

			{	
				error ? "error on server" : (
				loading ? 
				
				<>
					<div className="skeleton-categories"><Skeleton /></div>
					<div className="skeleton-categories"><Skeleton /></div>
					<div className="skeleton-categories"><Skeleton /></div>
					<div className="skeleton-categories"><Skeleton /></div>
				</>
				 :
				data.map((category,index) =>
			
		index === 0 ? 

		<div key={category.id} className="bedroom__net-item i2">

		<div className={skeletonState ? "skeleton-load-img active" : "skeleton-load-img"}></div>


	 <h6>{category.attributes.title}</h6>
	<img className='main'  src={process.env.REACT_APP_IMG+category.attributes.img.data.attributes.url} alt="" />

	<div className="bedroom__button-wr">
		<Link to={'/'+category.attributes.url} className='bedroom__configurator-btn'>{text[0]?.attributes?.categoriesConfigureNow}</Link>
		<img className='bedroom__configurator-arrow' src={process.env.PUBLIC_URL + '/img/bedroom__arrow.svg'} alt="arrow" />
	</div>
	


</div>
			
		:
<div key={category.id} className="sofas__net-item">

	<div className={skeletonState ? "skeleton-load-img active" : "skeleton-load-img"}></div>

	<Link to={'/'+category.attributes.url} className='sofas__item-link'>{category.attributes.title}</Link>
	<img 
	className='main'  
	src={process.env.REACT_APP_IMG+category.attributes.img.data.attributes.url} 
	alt="bg"
	onLoad={()=>{data.length - 1 === index && setSkeletonState(false)}}
	 />
</div>

				)
				)
}
	
			</div>

			<Catalog  
			title={text[0]?.attributes?.catalogTitleLuxuryStyle} 
			text={text} filterDefault={text[0]?.attributes?.breadCrumbCategory6} 
			filterExp ='&filters[categories][url][$containsi]=Luxury-style' 
			filterOpenState={filtersOpen}
			 />

		</div>
	);
}

export default Luxury;
