import React from 'react';
import './collectionSingle.scss';
import { useParams,Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import useFetch from '../../Hooks/useFetch';
import Card from '../../Components/Card';

function CollectionSingle(props) {

	const { type,id } = useParams();
	
	const { data: product, loading: loadingProduct, error: errorProduct } = useFetch(`${process.env.REACT_APP_API_URL}/products?filters[collection][url][$containsi]=${id}&populate=*`);
	
	return(

		<div className="content collection-single">
				<div className="product__bread-crumbs collection__bread-crumbs d-flex">
				<Link to='/'>{props.text[0]?.attributes?.breadCrumbHome}</Link>
				<span> / </span>
				<Link to={type === 'bedroom' ? '/bedroom' : '/dining'}>{type === 'bedroom' ? props.text[0]?.attributes?.breadCrumbCategory2 : props.text[0]?.attributes?.breadCrumbCategory3}</Link>
				<span> / </span>
				<Link to={type === 'bedroom' ? '/bedroom/bedroom-sets' : '/dining/dining-sets'}>{type === 'bedroom' ? props.text[0]?.attributes?.breadCrumbBedroomSets : props.text[0]?.attributes?.breadCrumbDiningSets}</Link>
			</div>



	
			{errorProduct ? (
  "Помилка на сервері"
) : (
  loadingProduct ? (
    <div className='catalog__net'>
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
    </div>
  ) : product.length === 0 ? (

    <div className='catalog__empty'>		
	 	<img  src={process.env.PUBLIC_URL + '/img/empty-catalog.svg'} alt="header__logo" />
		<p>{props.text[0]?.attributes?.emptyCatalog}</p>
		</div>

  ) : (
	<div className="catalog__net">
		{
    product.map((el) => (
      <Card 
		key={el.id + el.attributes.title+'catalog'} 
		product={el} type='catalog'
		addCart={props.text[0]?.attributes?.buttonAddToCart}
		addFavorite={props.text[0]?.attributes?.buttonAddToFavorite}
		deleteFavorite={props.text[0]?.attributes?.deleteFavorite}
		 />
    ))
	 }
	 </div>
  )
)}
	


		</div>
	);
}

export default CollectionSingle;