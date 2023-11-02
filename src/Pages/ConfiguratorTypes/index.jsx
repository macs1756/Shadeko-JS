import React from 'react';
import './ConfiguratorTypes.scss';
import {Link} from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { Helmet } from 'react-helmet-async';

function ConfiguratorTypes({text}) {

	const canonicalUrl = window.location.href;

	const { type } = useParams();
	const languageInformation = useSelector(state => state.language.language);
	const [skeletonState, setSkeletonState] = React.useState(true);

	const {data, loading, error} = useFetch(process.env.REACT_APP_API_URL+`/kategoriyi-konfiguratoras?locale=${languageInformation.language}&populate=*`);
	const {data: seo, loading: seoLoading, error: seoError}= useFetch(process.env.REACT_APP_API_URL+`/seos?locale=${languageInformation.language}&filters[route]=configurator-types&populate=*`);

	return (
		<div className='configurator'>

		<Helmet>
        <title>{seo[0]?.attributes?.title}</title>
		  <meta property="og:title" content={seo[0]?.attributes?.title} />

        <meta name="description" content={seo[0]?.attributes?.description} />
		  <meta property="og:description" content={seo[0]?.attributes?.description}  />

        <meta name="keywords" content={seo[0]?.attributes?.keywords}  />

		  <link rel="canonical" href={canonicalUrl} />      
		  <meta name="Publisher" content="https://shadeko.eu/" />		 	
      </Helmet>
			
				<div className="configurator__title d-flex a-i-center j-c-space">


					<div className="configurator__bread-crumbs d-flex a-i-center">
						<Link to='/'>{text[0]?.attributes?.breadCrumbHome}</Link>
						<span>/</span>
						<p>{text[0]?.attributes?.breadCrumbConfigurator}</p>
					</div>


					<h2>{text[0]?.attributes?.titleConfiguratorTypes}</h2>


					<div className="configurator__bread-crumbs d-flex a-i-center opacity0">
						<Link to='/'>Home</Link>
						<span>/</span>
						<p>Configurator</p>
					</div>



				</div>

			<div className="configurator__net">


			{	
				error ? "error on server" : (
				
					loading ?
					<>
						<div className="skeleton-categories-h"><Skeleton /></div>
						<div className="skeleton-categories-h"><Skeleton /></div>
						<div className="skeleton-categories-h"><Skeleton /></div>
					</>
					:
				data.map((section,index) =>
	
<div key={section.id} className="configurator__net-item">
<div className={skeletonState ? "skeleton-load-img active" : "skeleton-load-img"}></div>

<Link className='configurator__item-link categories__item-link' 

to={type === 'luxury' ? '/'+section.attributes.url+'/luxury' : '/'+section.attributes.url}>

	
	{section.attributes.title}</Link>


<img 
className='main' 
src={process.env.REACT_APP_IMG+section.attributes.img.data.attributes.url} 
alt="header__logo-short"
onLoad={()=>{data.length - 1 === index && setSkeletonState(false)}}
 />
</div>
				)
				)
}


			</div>
		</div>
	);
}

export default ConfiguratorTypes;