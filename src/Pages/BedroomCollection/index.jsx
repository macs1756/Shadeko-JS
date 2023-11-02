import React from 'react';
import './bedroomCollection.scss';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import Skeleton from 'react-loading-skeleton';
import CollectionElement from '../../Components/CollectionElement';
import Catalog from '../../Components/Catalog';

function BedroomCollection({text}) {

	const { type } = useParams(); 
	const [filtersOpen, setFiltersOpen] = React.useState(true);
	const { data: product, loading: loadingProduct, error: errorProduct } = useFetch(`${process.env.REACT_APP_API_URL}/collections?filters[type][$containsi]=Bedroom&populate=*`);

	

	return (

		<>
		
		<div className='content collection-wrapper'>	
			<div className="product__bread-crumbs collection__bread-crumbs d-flex">
				<Link to='/'>{text[0]?.attributes?.breadCrumbHome}</Link>
				<span> / </span>
				<Link to='/bedroom'>{text[0]?.attributes?.breadCrumbCategory2}</Link>
				<span> / </span>
				<p>{type ? text[0]?.attributes?.breadCrumbCollectionLuxury : text[0]?.attributes?.breadCrumbCollection}</p>
			</div>

			<div className="catalog__net">
					{
						errorProduct ? "error on server" : (
							loadingProduct ? 
							
							<>
							<Skeleton className="custom-skeleton" />
							<Skeleton className="custom-skeleton" />
							<Skeleton className="custom-skeleton" />
							<Skeleton className="custom-skeleton" />
							<Skeleton className="custom-skeleton" />
							<Skeleton className="custom-skeleton" />
							<Skeleton className="custom-skeleton" />
						 </>
							 : 
							
								product.map((el)=> (
									<CollectionElement key={el.id+'collectionsElements'} el={el} />
								))
							)
					}
			</div>
			</div>
			<Catalog  
			title={text[0]?.attributes?.catalogTitleBedroomSets} 
			text={text} 
			filterDefault={text[0]?.attributes?.breadCrumbCategory6} 
			filterExp ='&[filters][collection][type][$containsi]=Bedroom'
			filterOpenState={filtersOpen}
			 />
			</>
	);

}

export default BedroomCollection;