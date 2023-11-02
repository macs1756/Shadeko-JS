import React from 'react';
import './PrimeryCatalog.scss';
import Catalog from '../../Components/Catalog/';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import useFetch from '../../Hooks/useFetch';
import { Helmet } from 'react-helmet-async';

function PrimeryCatalog({text}) {

	const canonicalUrl = window.location.href;

	const { subcategory,type,category } = useParams();


	const languageInformation = useSelector(state => state.language.language);

	const {data, loading, error} = useFetch(`${process.env.REACT_APP_API_URL}/subcategories?locale=${languageInformation.language}&filters[url][$containsi]=${subcategory}&populate=*`);
	const {data: seo, loading: seoLoading, error: seoError}= useFetch(process.env.REACT_APP_API_URL+`/seos?locale=${languageInformation.language}&filters[route]=catalog&populate=*`);
	
	let expression = subcategory ? 

		(type === 'luxury' ?
		`&filters[$and][0][subcategories][url][$containsi]=${subcategory}&filters[$and][1][categories][url][$containsi]=luxury`
		 :
		`&filters[subcategories][url][$containsi]=${subcategory}`)
	
		 : '';
	

	 

	return (

		data[0] && 

		<div className='primeryCatalog'>

<Helmet>
        <title>{seo[0]?.attributes?.title}</title>
		  <meta property="og:title" content={seo[0]?.attributes?.title} />

        <meta name="description" content={seo[0]?.attributes?.description} />
		  <meta property="og:description" content={seo[0]?.attributes?.description}  />

        <meta name="keywords" content={seo[0]?.attributes?.keywords}  />

		  <link rel="canonical" href={canonicalUrl} />      
		  <meta name="Publisher" content="https://shadeko.eu/" />		 	
      </Helmet>


			<Catalog 
			title='' 
			text = {text} 
			filterOpenState = {true}
			filterExp = {expression}
			filterDefault={data[0]?.attributes?.category?.data[0]?.attributes?.name} 
			defaultSubcategory={data[0]?.attributes?.title}
			categoryUrlSortForSubcategory={category}
			 />
		</div>
	);
}

export default PrimeryCatalog;