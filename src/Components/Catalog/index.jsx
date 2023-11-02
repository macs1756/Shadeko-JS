import React, { useState, useEffect, useRef } from 'react';
import './Calalog.scss';

import CatalogFilter from '../CatalogFilter';
import Card from '../Card';
import useFetch  from '../../Hooks/useFetch';
import Skeleton from 'react-loading-skeleton';
import Pagination from '../../Components/Pagination';
import { useSelector } from 'react-redux';


function Catalog(props) {


	const languageInformation = useSelector(state => state.language.language);
	

	const [currentColorFilter, setCurrentColorFilter] = React.useState('');
	const [defaultValueColor,setDefaultValueColor] = React.useState('Colour');


	const [currentShapeFilter, setCurrentShapeFilter] = React.useState('');
	const [defaultValueShape,setDefaultValueShape] = React.useState('Shape');

	const [currentCategoryFilter, setCurrentCategoryFilter] = React.useState('');

	const [defaultValueCategory,setDefaultValueCategory] = React.useState(props.filterDefault ? props.filterDefault :  props.text[0]?.attributes?.defaultValueCatalog);


	const [currentMaterialFilter, setCurrentMaterialFilter] = React.useState('');
	const [defaultValueMaterial,setDefaultValueMaterial] = React.useState('Material');

	const [currentSubcategoryFilter, setCurrentSubcategoryFilter] = React.useState(props.filterExp ? props.filterExp : '');
	const [defaultValueSubcategory,setDefaultValueSubcategory] = React.useState(props.defaultSubcategory ? props.defaultSubcategory : 'Subcategory');

	const [currentSortFilter, setCurrentSortFilter] = React.useState('');
	const [defaultValueSort,setDefaultValueSort] = React.useState('Sort');

	const [currentPage, setCurrentPage] = React.useState(1);
	const [currentPaginationPage, setCurrentPaginationPage] = React.useState(1);


	const [paginationData, setPaginationData] = React.useState([]);

	const [categoryUrlSortForSubcategory, setCategoryUrlSortForSubcategory] = React.useState('');

	

	
	
	React.useEffect(()=>{
		setDefaultValueSubcategory('Subcategory');
		setCurrentSubcategoryFilter('');
	},[currentCategoryFilter]);
 
		
	const handlePageChange = (page) => {
		setCurrentPaginationPage(page); 
		setCurrentPage(page);
	 };

	 const componentRef = useRef(null);

	const [product, setProducts] = useState([]);
	const [loadingProduct, setLoading] = useState(true);
	const [errorProduct, setError] = useState(null);

	const [luxuryType, setLuxuryType] = useState(false);

	useEffect(() => {
		// Отримати поточний URL
		const currentUrl = window.location.href;
	 
		// Перевірити, чи містить URL слово 'luxury'
		if (currentUrl.includes('luxury')) {
			setLuxuryType(true);
		}
	 }, []);


	 const clickMoreProduct = () => {
		//setCurrentPaginationPage(currentPage + 1);
		setCurrentPage((prev)=>(prev + 1));
	 }
	

	
	
	
	const fetchProducts = async (type) => {

		let currentPageState = currentPage;

		
		if(type === 'full-pagination'){
			currentPageState = currentPaginationPage;
		}

	  try {

		const exp = currentColorFilter+currentShapeFilter+currentCategoryFilter+currentMaterialFilter+currentSortFilter+currentSubcategoryFilter+`&pagination[page]=${currentPageState}&pagination[pageSize]=9&sort=createdAt:desc`;

		 const response = 
		 await fetch(`${process.env.REACT_APP_API_URL}/products?locale=${languageInformation.language}&populate=*${exp}`,{
		
			headers: {
			Authorization: "Bearer "+process.env.REACT_APP_API_TOKEN,
		}}

		 );
		 let data = await response.json();
		let dataRes = data.data;

		if(type === 'pagination'){
			setProducts((prevProducts) => [...prevProducts, ...dataRes]);
			setPaginationData(data);
			
			setLoading(false);
		}else{
			if(type === 'full-pagination'){

			
				
					setProducts(dataRes);

					if(product.length !== 0){

						if(componentRef.current){
							setTimeout(()=>{
								componentRef.current.scrollIntoView({ behavior: 'smooth' });
							},100);
						}
						
					}
					
					
				
				

			}else{

				setProducts(dataRes);
			}
		
			setPaginationData(data);
			setLoading(false);
		}

		 


	  } catch (error) {
		 setError(error);
		 setLoading(false);
	  }
	};


	
	
	useEffect(() => {
	  fetchProducts('pagination');
	}, [currentPage]);

	useEffect(() => {
	  fetchProducts('full-pagination');
	}, [currentPaginationPage]);


	

	useEffect(() => {
		fetchProducts('filter');
	 }, [currentSubcategoryFilter,currentColorFilter,currentCategoryFilter,currentShapeFilter,currentMaterialFilter,currentSortFilter]);


	 
	
	const { data: catalogColors, loading: loadingCatalogColors, error: errorCatalogColors } = useFetch(`${process.env.REACT_APP_API_URL}/colors?locale=${languageInformation.language}&populate=*`);
	const { data: catalogShape, loading: loadingCatalogShape, error: errorCatalogShape } = useFetch(`${process.env.REACT_APP_API_URL}/shapes?locale=${languageInformation.language}&populate=*`);
	const { data: catalogCategory, loading: loadingCatalogCategory, error: errorCatalogCategory } = useFetch(`${process.env.REACT_APP_API_URL}/categories?locale=${languageInformation.language}&populate=*`);

	let exp = '';

	if(categoryUrlSortForSubcategory === 'luxury-style'){
		exp = `${process.env.REACT_APP_API_URL}/categories-luxury?locale=${languageInformation.language}&filters[url][$notContainsi]=configurator&populate=*`
	}else{
		exp = `${process.env.REACT_APP_API_URL}/subcategories?locale=${languageInformation.language}&filters[url][$containsi]=${categoryUrlSortForSubcategory}&populate=*`
	}

	
	
	
	const { data: catalogSubcategory, loading: loadingCatalogSubcategory, error: errorCatalogSubcategory } = useFetch(exp);

	
	
	
	const { data: catalogMaterial, loading: loadingCatalogMaterial, error: errorCatalogMaterial } = useFetch(`${process.env.REACT_APP_API_URL}/materials?locale=${languageInformation.language}&populate=*`);

	const { data: catalogSort, loading: loadingCatalogSort, error: errorCatalogSort } = useFetch(`${process.env.REACT_APP_API_URL}/sorts?locale=${languageInformation.language}&populate=*`);

	
	const [activeIndex, setActiveIndex] = useState(null);
	const handleItemClick = (index) => {
	   setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
	};


	
	const handleChildItemClick = (e) => {
		setActiveIndex(null); // Закрити всі випадаючі списки
		
		setCurrentPage(1);
		

		if(e.target.dataset.type === 'color'){

			
			e.target.innerText === props.text[0]?.attributes?.textAllValue ? setDefaultValueColor(props.text[0]?.attributes?.defaultValueColour) : setDefaultValueColor(e.target.innerText);

			setCurrentColorFilter(e.target.dataset.filter);

		}else if(e.target.dataset.type === 'shape'){


			e.target.innerText === props.text[0]?.attributes?.textAllValue ? setDefaultValueShape(props.text[0]?.attributes?.defaultValueShape) :	setDefaultValueShape(e.target.innerText);

			setCurrentShapeFilter(e.target.dataset.filter);

		}else if(e.target.dataset.type === 'category'){

			e.target.innerText === props.text[0]?.attributes?.textAllValue ? setDefaultValueCategory(props.text[0]?.attributes?.defaultValueCategory) : setDefaultValueCategory(e.target.innerText);

			setCategoryUrlSortForSubcategory(e.target.dataset.url);

			setCurrentCategoryFilter('');
			setCurrentCategoryFilter(e.target.dataset.filter);
			

		}else if(e.target.dataset.type === 'material'){


			e.target.innerText === props.text[0]?.attributes?.textAllValue ? setDefaultValueMaterial(props.text[0]?.attributes?.defaultValueMaterial) : setDefaultValueMaterial(e.target.innerText);
			
			setCurrentMaterialFilter(e.target.dataset.filter);
		}else if(e.target.dataset.type === 'subcategory'){


			e.target.innerText === props.text[0]?.attributes?.textAllValue ? setDefaultValueSubcategory(props.text[0]?.attributes?.defaultValueSubcategory) : setDefaultValueSubcategory(e.target.innerText);
			
			setCurrentSubcategoryFilter('');
			setCurrentSubcategoryFilter(e.target.dataset.filter);

		}else{

			e.target.innerText === props.text[0]?.attributes?.textAllValue ? setDefaultValueSort(props.text[0]?.attributes?.defaultValueSort) : setDefaultValueSort(e.target.innerText);
			setCurrentSortFilter(e.target.dataset.filter);
		}
	

	 };


	 React.useEffect(()=>{

		 setCategoryUrlSortForSubcategory(props.categoryUrlSortForSubcategory);

		setDefaultValueColor(props.text[0]?.attributes?.defaultValueColour);
		setDefaultValueSort(props.text[0]?.attributes?.defaultValueSort);
		setDefaultValueMaterial(props.text[0]?.attributes?.defaultValueMaterial);
		setDefaultValueShape(props.text[0]?.attributes?.defaultValueShape);
		setDefaultValueCategory(props.filterDefault ? props.filterDefault : props.text[0]?.attributes?.defaultValueCategory);
		setDefaultValueSubcategory(props.defaultSubcategory ? props.defaultSubcategory : props.text[0]?.attributes?.defaultValueSubcategory);
		
	},[]);

	

	return (

	

		<section id='catalog' className='catalog'>
			
			

			<h3 ref={componentRef} className='catalog__title'>{props.title}</h3>

			<div className={!props.filterOpenState ? 'd-none' : ''}>
				<div className="catalog__filters d-flex a-i-start j-c-start">

<CatalogFilter

 title={defaultValueSort}
 list={[props.text[0]?.attributes?.textAllValue, ...catalogSort]}
 isActive={activeIndex === 0}
 onItemClick={() => handleItemClick(0)}
  onChildItemClick={handleChildItemClick}
  type='sort'
  filterBody ={catalogSort}

 />


<CatalogFilter			
title={defaultValueColor}
list={[props.text[0]?.attributes?.textAllValue, ...catalogColors]}
isActive={activeIndex === 1}
 onItemClick={() => handleItemClick(1)}
 onChildItemClick={handleChildItemClick}		
 filterBody = "&[filters][colors][id]="
 type='color'
/>



<CatalogFilter			
title={defaultValueShape}
list={[props.text[0]?.attributes?.textAllValue,...catalogShape]}
isActive={activeIndex === 2}
 onItemClick={() => handleItemClick(2)}
 onChildItemClick={handleChildItemClick}		
 filterBody = "&[filters][shape][id]="	
 type='shape' 
/>


<CatalogFilter		

title={defaultValueCategory}
list={[props.text[0]?.attributes?.textAllValue, ...catalogCategory]}
isActive={activeIndex === 3}
 onItemClick={() => handleItemClick(3)}
 onChildItemClick={handleChildItemClick}	
	filterBody = {luxuryType ? '&filters[$and][0][categories][id]=6&filters[$and][1][categories][id]=' : "&[filters][categories][id]="}
 
 type='category' 		 
/>



<CatalogFilter			
title={defaultValueSubcategory}
list={[props.text[0]?.attributes?.textAllValue, ...catalogSubcategory]}
isActive={activeIndex === 4}
 onItemClick={() => handleItemClick(4)}
 onChildItemClick={handleChildItemClick}	
 filterBody = "&[filters][subcategories][id]="	
 type='subcategory' 		
 category={currentCategoryFilter}	
 filterExp = {props.filterExp}
/>



<CatalogFilter			
title={defaultValueMaterial}
list={[props.text[0]?.attributes?.textAllValue, ...catalogMaterial]}
isActive={activeIndex === 5}
 onItemClick={() => handleItemClick(5)}
 onChildItemClick={handleChildItemClick}	
 filterBody = "&[filters][materials][id]="	
 type='material' 		

/>


				</div>
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
		key={el.id+'catalog'+ Date.now()} 
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

			<div className="catalog__pagination-wr  w100 d-flex a-i-center j-c-center flex-column">

			{((paginationData?.meta?.pagination?.pageCount !== 1 ||  paginationData?.meta?.pagination?.pageCount === 0) && product.length > 0) && (
 
<button disabled={paginationData?.meta?.pagination?.pageCount === currentPage ? true : false} onClick={()=>{clickMoreProduct()}} className='product__more-button'>{props.text[0]?.attributes?.buttonMoreProduct}</button>
)}



<div className='catalog__pagination d-flex a-i-center j-c-center'>

		
				<Pagination
				  currentPage={currentPaginationPage}
				  totalPages={paginationData?.meta?.pagination?.pageCount}
				  onPageChange={handlePageChange}
				 />
			</div>

			</div>

		</section>
	);
}

export default Catalog;