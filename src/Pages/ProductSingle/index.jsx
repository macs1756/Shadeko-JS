import React from 'react';
import './ProductSingle.scss';
import { Link } from 'react-router-dom';
import Card from './../../Components/Card';
import useFetch from '../../Hooks/useFetch';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Redux/cartReducer';
import ConfiguratorElementColor from '../../Components/ConfiguratorElementColor';
import ConfiguratorElementLong from '../../Components/ConfiguratorElementLong';
import ConfiguratorElementShort from '../../Components/ConfiguratorElementShort';
import Galery from '../../Components/Galery';
import Skeleton from 'react-loading-skeleton';
import SwiperCore, { Navigation, Thumbs, Swiper } from 'swiper';
import SingleModule from '../../Components/SingleModules';
import { Helmet } from 'react-helmet-async';



SwiperCore.use([Navigation, Thumbs]);

function ProductSingle({text}) {

	const canonicalUrl = window.location.href;
	const languageInformation = useSelector(state => state.language.language);

	const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;

	const dispatch = useDispatch();
	const {id, profile}  = useParams();

	const { data: product, loading: loadingProduct, error: errorProduct } = useFetch(`${process.env.REACT_APP_API_URL}/products/${id}?populate=*`);
	
	
	const { data: modules, loading: loadingModules, error: errorModules } = useFetch(`${process.env.REACT_APP_API_URL}/modules?filters[products][id]=${id}&populate=*`);
	const {data: seo, loading: seoLoading, error: seoError} = useFetch(process.env.REACT_APP_API_URL+`/seos?locale=${languageInformation.language}&filters[route]=single&populate=*`);


	const mainSwiperRef = React.useRef(null);
   const previewSwiperRef = React.useRef(null);

	const[modulesDrawer, setModulesDrawer] = React.useState([]);

   useEffect(() => {
      if (!loadingProduct && product) {
         mainSwiperRef.current = new Swiper('.swiper-single', {
            navigation: {
               nextEl: '.arrow__next',
               prevEl: '.arrow__previous',
            },
            thumbs: {
               swiper: previewSwiperRef.current, // Передаємо посилання на прев'ю-слайдер
            },
         });

         previewSwiperRef.current = new Swiper('.swiper-miniature', {
            slidesPerView: 6,
            spaceBetween: 4,
            slideToClickedSlide: true, // Додаємо цю опцію для зміни слайдів при кліку на прев'ю
         });
      }
   }, [loadingProduct, product]);

	
	
	const [skeletonQuantityState, setSkeletonQuantityState] = React.useState(true);

	const [skeletonPreviewSliderState, setSkeletonPreviewSliderState] = React.useState(true);
	const [skeletonMainSliderState, setSkeletonMainSliderState] = React.useState(true);

	const [quantity,setQuantity] = React.useState(1);

	const [currentColor, setCurrentColor] = React.useState(0);
	const [currentMaterial, setCurrentMaterial] = React.useState(0);

	const [dekorAdd, setDekorAdd] = React.useState(false);

	const [colorsApi,setColorsApi] = React.useState([]);
	const [colorsLoading,setColorsLoading] = React.useState(false);

	const [materialsApi,setMaterialsApi] = React.useState([]);
	const [materialsLoading,setMaterialsLoading] = React.useState([]);

	const [similarApi,setSimilarApi] = React.useState([]);

	const [collectionApi,setCollectionApi] = React.useState([]);

	const [collectionId,setCollectionId] = React.useState([]);


	const [colorsIdArr, setColorsIdArr] = React.useState([]);
	const [materialsIdArr, setMaterialsIdArr] = React.useState([]);


	const [currentSetPhoto, setCurrentSetPhoto] = React.useState(1);

	const [currentCategories,setCurrentCategories] = React.useState([]);

	const [materialPreviewIndex, setMaterialPreviewIndex] = React.useState(600);
	const [colorPreviewIndex, setColorPreviewIndex] = React.useState(600);

	const [materialArticle, setMaterialArticle] = React.useState('');
	const [colorArticle, setColorArticle] = React.useState('');

	const [materialObj, setMaterialObj] = React.useState({});
	const [colorObj, setColorObj] = React.useState({});
	



	useEffect(() => {
		setCurrentColor(0);
		setCurrentMaterial(0);	
		setCurrentSetPhoto(1);
		setMaterialObj({});
		setColorObj({});

  },[id]);

  const [lightboxOpen, setLightboxOpen] = React.useState(false); 

  const closeLightbox = () => {
	setLightboxOpen(!lightboxOpen);
 };



 	const [submodulesConfigurations, setSubmodulesConfigurations] = React.useState([]);
	
	   const CollectionModuleConfig = (newConfigs) => {
		
			newConfigs.forEach((newData) => {
				if(newData.initial === true){
					setSubmodulesConfigurations((prev) => [...prev, newData]);
				}else{

					submodulesConfigurations.forEach((old)=>{
						if(old.module === newData.module){
	
								if(old.submodule === newData.submodule){
									

									const clearArr = submodulesConfigurations.filter((el)=> el.submodule !== newData.submodule);

									newConfigs.forEach((el)=>{
										clearArr.push(el);
									})

									setSubmodulesConfigurations(clearArr);

								}

						};
					});

				}
		    });
		  
	   };
	 
	 
	const fetchData = async () =>{

		try {
			setColorsLoading(false);
			const responses = await Promise.all(
			  colorsIdArr.map(el =>
				 axios.get(`${process.env.REACT_APP_API_URL}/colors/${el}?populate=*`, {
					headers: {
					  Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
					}
				 })
			  )
			);
 
			const colorsData = responses.map(response => response.data.data);
			setColorsApi(colorsData);
			setColorArticle(colorsData[0].attributes.article);

			setColorObj(
				{
					img: process.env.REACT_APP_IMG+colorsData[0].attributes?.img?.data?.attributes?.url,
					name: colorsData[0].attributes.name
				}
			);

		 } catch (err) {
			// Обробка помилки
		 }
		 setColorsLoading(true);
		
}

	const materialsData = async () =>{

		try {
			setMaterialsLoading(false);
			const responses = await Promise.all(
			  materialsIdArr.map(el =>
				 axios.get(`${process.env.REACT_APP_API_URL}/materials/${el}?populate=*`, {
					headers: {
					  Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
					}
				 })
			  )
			);
 
			const materialsData = responses.map(response => response.data.data);
			setMaterialsApi(materialsData);

			setMaterialArticle(materialsData[0].attributes.article);

			setMaterialObj(
				{
					img: process.env.REACT_APP_IMG+materialsData[0].attributes?.img?.data?.attributes?.url,
					name: materialsData[0].attributes.name
				}
			);
				 

		 } catch (err) {
			// Обробка помилки
		 }
		 setMaterialsLoading(true);
}

	const simularData = async () =>{

		try {
			const responses = await(
			  
				 axios.get(`${process.env.REACT_APP_API_URL}/products?populate=*&[filters][subcategories][id]=${currentCategories[5][0].id}&[filters][id][$ne]=${currentCategories[3]}&pagination[page]=1&pagination[pageSize]=10`, {
					headers: {
					  Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
					}
				 })
			  
			);
 
			const simularData = responses.data.data;
			
			setSimilarApi(simularData);

		 } catch (err) {
			// Обробка помилки
		 }		 
}


const collectionData = async () =>{
	if(collectionId){
	try {
		const responses = await(
		  
			 axios.get(`${process.env.REACT_APP_API_URL}/products?filters[collection][url][$containsi]=${collectionId}&pagination[page]=1&pagination[pageSize]=10&populate=*`, {
				headers: {
				  Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
				}
			 })
		);

		const collectionData = responses.data.data;
		
		setCollectionApi(collectionData);

	 } catch (err) {
			console.log(err);
	 }	
	}
	 
}



 const [modulesState, setModules] = React.useState(modules);
 

 const handleModuleChange = (moduleId, changedPrice, newQuantity) => {
	const updatedModules = modulesState.map(module => {
	  if (module.id === moduleId) {
		 return {
			...module,
			attributes: {
			  ...module.attributes,
			  initialAmount: newQuantity,
			},
		 };
	  }
	  return module;
	});

	setModules(updatedModules);
	const newTotalPrice = calculateTotalPrice(updatedModules);
	setTotalPrice(newTotalPrice);

 };

 const calculateTotalPrice = (updatedModules) => {
	return updatedModules.reduce((total, module) => total + (module.attributes.price * module.attributes.initialAmount), 0);
 };

 const [totalPrice, setTotalPrice] = React.useState(calculateTotalPrice(modules));

 

 React.useEffect(()=>{
		setModules(modules);
		setTotalPrice(calculateTotalPrice(modules));
 },[loadingModules]);



 React.useEffect(() => {
	const extractedKeys = modulesState.map(item => ({
	  id: item.id,
	  price: item.attributes.price,
	  title: item.attributes.name,
	  quantity: item.attributes.initialAmount,
	  img: process.env.REACT_APP_IMG+item?.attributes?.imgCard?.data?.attributes?.url,
	  characteristics: item.attributes.characteristics,	 
	  submodules: [],
	}));


	submodulesConfigurations.forEach((submodules)=>{
			
			extractedKeys.forEach((el)=>{

				if(el.id === submodules.module){
					el.submodules.push(submodules);
				}

			})
			
	})


	setModulesDrawer(extractedKeys);
 }, [modulesState,submodulesConfigurations]);





	const addProductButton = () => {

			let price;
		
		
			if(profile === 'profile'){
				price = (product?.attributes?.price * ((100 - product?.attributes?.PersonalAccountDiscountPercent) / 100)).toFixed(0);
			}else{
				price = product?.attributes?.price;
			}

			
			dispatch(
				addToCart({
				  id: product.id,
				  title: product?.attributes?.title,
				  description: product?.attributes?.description,
				  img: product?.attributes?.img_card?.data?.attributes?.url,
				  price: profile === 'profile'
					 ? (
						  (
							 modules.length > 0 && !loadingModules
								? totalPrice + calculateTotalPriceModules()
								: product?.attributes?.price
								  ? product?.attributes?.price + calculateTotalPriceModules()
								  : 0
						  ) * ((100 - product?.attributes?.PersonalAccountDiscountPercent) / 100)
						).toFixed(0)
					 : (
						  modules.length > 0 && !loadingModules
							 ? totalPrice + calculateTotalPriceModules()
							 : product?.attributes?.price
								? product?.attributes?.price + calculateTotalPriceModules()
								: 0
						),
				  quantity: quantity,
				  stockQuantity: product?.attributes?.stockQuantity.toString(),
				  materialArticle: materialArticle,
				  colorArticle: colorArticle,
				  modules: modulesDrawer.filter((item)=> item.quantity > 0),
				  configurations: items,
				  color: colorObj,
				  material: materialObj,

				})
			 );
			 

		setTimeout(()=>{
			setQuantity(1);
			setDekorAdd(false);
		}, 2500);

		setDekorAdd(true);

	}

	

	

const clickOnColor = (index) =>{
	setCurrentColor(index);
	// setCurrentSetPhoto(index + 1);
}


const cliickOnColor = (index) =>{
	setCurrentMaterial(index);


	if(isTouchDevice){

		if(materialPreviewIndex === index){
			setMaterialPreviewIndex(600);
		}else{
			setMaterialPreviewIndex(index);
		}
	}


}

	

	const [items, setItems] = React.useState([]); // Стан зі списком об'єктів { id, price }

	const calculateTotalPriceModules = () => {
	  return items.reduce((total, item) => total + +item.price, 0);
	};
 
	const calculateSumModules = (id, price, title, currentValue) => {
		const itemIndex = items.findIndex(item => item.id === id);
  
		if (itemIndex !== -1) {
		  // Якщо товар з таким id вже існує, оновлюємо ціну
		  const updatedItems = [...items];

		  updatedItems[itemIndex].price = price;
		  updatedItems[itemIndex].value = currentValue;

		  setItems(updatedItems);

		} else {
		  // Інакше додаємо новий товар
		  const newItem = { id: id, price: price, title: title, value: currentValue};
		  setItems(prevItems => [...prevItems, newItem]);
		}
	 };


	


	useEffect(() => {
		if (product) {
		  
		  setColorsIdArr(product?.attributes?.colors?.data.map(color => color.id));
		  setMaterialsIdArr(product?.attributes?.materials?.data.map(materials => materials.id));

		  setCollectionId(product?.attributes?.collection?.data?.attributes?.url);
		
		  setCurrentCategories(prevState => {
			const updatedCategories = [...prevState];
			updatedCategories.splice(3, 3, product?.id, product?.attributes?.categories?.data, product?.attributes?.subcategories?.data);
			return updatedCategories;
		 });

		
		}
	 }, [product]); 


	 
	 
	 useEffect(() => {
		collectionData();
  },[collectionId]);


	 useEffect(() => {
		fetchData();
  },[colorsIdArr]);

	 useEffect(() => {
		materialsData();

  },[materialsIdArr]);


	 useEffect(() => {
		simularData();

  },[currentCategories]);


	//characteristic
	let characteristic = '';

	if(product?.attributes?.characteristics){
	characteristic = product?.attributes?.characteristics.split(";").map((item, index) => (
		<li key={index}>{item.trim()}</li>
	 ));
	}

	

	
	return (

		   <div className='content'>


			<Helmet>
      		  <title>{product?.attributes?.title}</title>
				  <meta property="og:title" content={product?.attributes?.title} />

     			  <meta name="description" content={product?.attributes?.description} />
				  <meta property="og:description" content={product?.attributes?.description}  />

    		     <meta name="keywords" content={seo[0]?.attributes?.keywords}  />

				  <link rel="canonical" href={canonicalUrl} />      
				  <meta name="Publisher" content="https://shadeko.eu/" />		 	
   	   </Helmet>

			<div className="product__bread-crumbs d-flex">
				<Link to='/'>{text[0]?.attributes?.breadCrumbHome}</Link>
				<span> / </span>
				<Link to={'/'+product?.attributes?.categories?.data[0].attributes.url}>{product?.attributes?.categories?.data[0].attributes.name}</Link>
				<span> / </span>
				<Link to={'/'+product?.attributes?.subcategories?.data[0].attributes.url}>{product?.attributes?.subcategories?.data[0].attributes.title}</Link>
				<span> / </span>
				<p>{product?.attributes?.title}</p>
			</div>



			<div className="product__net">


				<div className="product__net-img">

					<div className="product__img-wr">


					{
                
					 (typeof product?.attributes?.PersonalAccountDiscountPercent === 'number' && profile === 'profile') && 
 <>
					  <div className='account__discount'></div>
					  <span className='account__discount-text'>-{product?.attributes?.PersonalAccountDiscountPercent}%</span>
 </>
					}
 

{/* main photo  */}




<div className="swiper-container swiper-single">
<div className="swiper-wrapper">


{	
				errorProduct ? "error on server" : (
				loadingProduct ? 
				<div className="skeletonMainSlider"></div>
				 :
				product?.attributes?.[`img_color_${currentSetPhoto}`]?.data.map((el,index)=>(
				<div className="swiper-slide">
					<div className="swiper-slide__wr">

					<div className={skeletonMainSliderState ? "skeleton-load-img z1 active" : "skeleton-load-img z1"}></div>


				<img 
				
				src={process.env.REACT_APP_IMG+el?.attributes?.url} 
				alt=" "
				onClick={()=>{closeLightbox()}}
				onLoad={()=> index === 0 && setSkeletonMainSliderState(false)}
				 />
				</div>
				</div>
			))
			
				)
}
					</div>

</div>	
<div className="arrow__previous">
					<img src={process.env.PUBLIC_URL + '/img/product-single__arrow.svg'} alt="arrow" />
					</div>
					<div  className="arrow__next">
						<img src={process.env.PUBLIC_URL + '/img/product-single__arrow.svg'} alt="arrow" />
					</div>
</div>	


{/* preview ///////////// */}

					
					<div className="swiper-container swiper-miniature">
					<div className="swiper-wrapper">
				
					{	
				errorProduct ? "error on server" : (
				loadingProduct ? 
				<>
				<div className="skeleton-preview"></div>
				<div className="skeleton-preview"></div>
				<div className="skeleton-preview"></div>
				<div className="skeleton-preview"></div>
				<div className="skeleton-preview"></div>
				<div className="skeleton-preview"></div>
				</>
				
				 :
				product?.attributes?.[`img_color_${currentSetPhoto}`]?.data.map((el,index)=>(
					<div className="swiper-slide">
					<div 
					key={el.id+'img_set'} 
					
					className="product__preview-wr">
						<div className='shadow'></div>
						<div className={skeletonPreviewSliderState ? "skeleton-load-img active" : "skeleton-load-img"}></div>

				<img 
				className='preview'  
				src={process.env.REACT_APP_IMG+el?.attributes?.url} 
				alt="product"
				onLoad={() => index === product?.attributes?.[`img_color_${currentSetPhoto}`]?.data?.length - 1 && setSkeletonPreviewSliderState(false)}
				 />

					</div>
					</div>
			))
			
				)
}

					</div>
					</div>
				

				</div>

				<div className="product__net-text">
						<h2>{product?.attributes?.title}</h2>

{/* ///price /////////////////////						 */}

						{
							profile === 'profile' ?

							<h3 className="price">
								{(
									(modules.length > 0 && !loadingModules ? 
									(totalPrice ? totalPrice + +calculateTotalPriceModules() : '0') : 
									(product?.attributes?.price ? product?.attributes?.price + +calculateTotalPriceModules() : '0'))
									* ((100 - product?.attributes?.PersonalAccountDiscountPercent) / 100)).toFixed(0) }$</h3>
							:


							<h3 className="price">

								${
									modules.length > 0 && !loadingModules ? 
									(totalPrice ? totalPrice + +calculateTotalPriceModules() : '0') : 
									(product?.attributes?.price ? product?.attributes?.price + +calculateTotalPriceModules() : '0')	
								}
								</h3>


						}

						

						<p className='product__p'>{product?.attributes?.description}</p>
	

	
		
						<section className="product__color">

							{
								colorsApi.length > 0 &&
								<h4>{text[0]?.attributes?.productSingleTitleColor}</h4>
							}
							
{
							colorsLoading ?

							(<div className={colorsApi.length > 0  ? "product__color-net" : "product__color-net m0"} >

								{


								 colorsApi.map((item,index)=>(
												<div className="material__wr">

													<div className={colorPreviewIndex === index ? "material__wr-preview active" : "material__wr-preview"}>
												
													<h6>{item?.attributes?.article}</h6>


												<img 
												key={item+index} 
												onClick={()=>{setCurrentMaterial(index)}} 
												src={process.env.REACT_APP_IMG+item?.attributes?.img?.data?.attributes?.url} 
												alt="material" 
												className={currentColor == index ?  'material active' : 'material'} 
												
												/>
											
											
											
										</div>

										<img 
										key={item+index}
										onMouseOut={()=>{setColorPreviewIndex(600)}}  
										onMouseEnter={()=>{setColorPreviewIndex(index)}}  

										onClick={(e)=>{
											clickOnColor(index);
											setColorArticle(e.target.dataset.article);
											setColorObj(
												{
													img: e.target.src,
													name: e.target.dataset.name,
												}
											)
										}} 
										src={process.env.REACT_APP_IMG+ item?.attributes?.img?.data?.attributes?.url} 
										alt="color" 
										className={currentColor == index ?  'color active' : 'color'} 
										data-article={item?.attributes?.article}
										data-name={item?.attributes?.name}
										/>
										</div>
									))
								}

							</div>)
							:
									<div className="skeleton-curcle">
										<Skeleton />
										<Skeleton />
										<Skeleton />
										
									</div>
}			
						</section>  



{/* materials //////////////////////// */}

<section className="product__material">

							{
								materialsApi.length > 0 &&
								<h4>{text[0]?.attributes?.productSingleTitleMaterial}</h4>
							}
							

							<div className={materialsApi.length > 0 ? "product__material-net" : "product__material-net m0"}>
								{
									materialsLoading  ? 

									(materialsApi.map((item,index)=>(
										<div className="material__wr">


											<div className={materialPreviewIndex === index ? "material__wr-preview active" : "material__wr-preview"}>
												
												<h6>{item?.attributes?.article}</h6>


												<img 
												key={item+index} 
												onClick={()=>{setCurrentMaterial(index)}} 
												src={process.env.REACT_APP_IMG+item?.attributes?.img?.data?.attributes?.url} 
												alt="material" 
												className={currentMaterial == index ?  'material active' : 'material'} 
												
												/>
											
											
											
											</div>

											<img  
											onMouseOut={()=>{setMaterialPreviewIndex(600)}}  
											onMouseEnter={()=>{setMaterialPreviewIndex(index)}} 
											key={item+index+'material'} 
											onClick={(e)=>{
												cliickOnColor(index);
												setMaterialArticle(e.target.dataset.article);
												setMaterialObj(
													{
														img: e.target.src,
														name: e.target.dataset.name
													}
												);
											}} 


											src={process.env.REACT_APP_IMG+item?.attributes?.img?.data?.attributes?.url}
											alt="material" className={currentMaterial == index ?  'material active' : 'material'} 
											data-article={item?.attributes?.article}
											data-name={item?.attributes?.name}
											/>
										</div>

									))) :

                        <div className="skeleton-curcle">
									<Skeleton />
									<Skeleton />
									<Skeleton />
								</div>
								}

							</div>
									
						</section>

					

						<div className='max60'>
						{
  errorProduct ? "error on server" : (
    loadingProduct ? 

	 <div className="skeleton-configuration">
		<Skeleton />
		<Skeleton />
	 </div>



	  :
    product?.attributes?.configurations?.data
      .sort((a, b) => {
        // Визначте бажаний порядок сортування за типом (color, short, long)
        const order = ['color', 'short', 'long'];
        return order.indexOf(a.attributes.type) - order.indexOf(b.attributes.type);
      })
      .map((el) => {
        switch (el.attributes.type) {
          case 'color':
            return <ConfiguratorElementColor id={el.id} title={el.attributes.name} arr={el.attributes.value} />;
          case 'short':
            return <ConfiguratorElementShort calculateSumModules={calculateSumModules}  id={el.id} title={el.attributes.name} arr={el.attributes.value} />;
          case 'long':
            return <ConfiguratorElementLong calculateSumModules={calculateSumModules} id={el.id} def={el.attributes.name} arr={el.attributes.value} />;
          default:
            return null; // Можливо, якщо тип не відповідає жодному з визначених варіантів.
        }
      })
  )
}

						</div>

					
	{/* quantity	///////////////// */}

						<section className="product__quantity">
							<h4>{text[0]?.attributes?.modalCartQuantity}</h4>

							<div className="product__quantity-net di-flex a-i-center">

								<div className="miniature__wr">

								<div className={skeletonQuantityState ? "skeleton-load-img active" : "skeleton-load-img"}></div>

								<img 
								className='miniature' 
								src={process.env.REACT_APP_IMG+product?.attributes?.[`img_color_${currentSetPhoto}`]?.data[0]?.attributes?.url}
								alt=" "
								onLoad={()=>{setSkeletonQuantityState(false)}}
								 />
								</div>
				


								<div className="product__quantity-counter d-flex a-i-center ">

									<p  onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : prev)} className='quantity__arrow-mobile minus-mobile'>-</p>
									<img onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : prev)} className='quantity__arrow quantity__arrow-prev' src={process.env.PUBLIC_URL + '/img/quantity__arrow.svg'} alt="arrow" />
									<p>{quantity}</p>
									<img onClick={() => setQuantity(prev => prev + 1)} className='next quantity__arrow' src={process.env.PUBLIC_URL + '/img/quantity__arrow.svg'} alt="arrow" />

									<p onClick={() => setQuantity(prev => prev + 1)} className='quantity__arrow-mobile'>+</p>
				
								</div>


							</div>


						<div className='modules'>		



							{
loadingModules ? 
<div className="skeleton-modules">
<Skeleton />
<Skeleton />
</div>
:
								modules.map((el)=>(
										<SingleModule 
										module={el}
										key={el.id+'module-part'}
										onChange={handleModuleChange} 
										CollectionModuleConfig={CollectionModuleConfig}
										 />
								))
							}
						</div>

							

							<div className="product__buttons">



				<div className="addToDrawer__wr">

				<span className={dekorAdd ? 'addToDrawerDekor active dekor1' : 'addToDrawerDekor dekor1' }>+{quantity}</span>
				<span className={dekorAdd ? 'addToDrawerDekor active dekor2' : 'addToDrawerDekor dekor2' }>+{quantity}</span>
				<span className={dekorAdd ? 'addToDrawerDekor active dekor3' : 'addToDrawerDekor dekor3' }>+{quantity}</span>

				
				<button onClick={()=>{addProductButton()}}  className='addToCard upper'>{text[0]?.attributes?.buttonAddToCart}</button>

</div>

									<Link to='/checkout' className='checkOut upper'>{text[0]?.attributes?.modalCartButtonSecond}</Link>
							</div>


						{
		
					characteristic &&
							(<div className="description__wr">
								<h4>{text[0]?.attributes?.productSingleTitleDescription}</h4>


							 <ul className="description__list">
								{characteristic}							
								</ul> 

							</div>)
}	
						</section>



				</div>


			</div>

	

 {	collectionApi.length > 1 && (
			<div className="product__similar">

				<h3>Products from the collection</h3>

				<div className="product__similar-net">
				{
					
				collectionApi.map((collection)=>(
					collection.id !== +id &&
					 <Card 
					 key={collection.id+'collectionProducts'} 
					 product={collection} 
					 type='catalog'
					 addCart={text[0]?.attributes?.buttonAddToCart}
					 addFavorite={text[0]?.attributes?.buttonAddToFavorite}
				    deleteFavorite={text[0]?.attributes?.deleteFavorite} 
					  />
				))
				}
				
				</div>
			</div>)
} 




{	similarApi.length > 0 && (
			<div className="product__similar">

				<h3>{text[0]?.attributes?.productSingleTitleSimularProducts}</h3>

				<div className="product__similar-net">
				{
					
				similarApi.map((simular)=>(
					 <Card 
					 key={simular.id+'collectionProducts'} 
					 product={simular} 
					 type='catalog'
					 addCart={text[0]?.attributes?.buttonAddToCart}
					 addFavorite={text[0]?.attributes?.buttonAddToFavorite}
				    deleteFavorite={text[0]?.attributes?.deleteFavorite} 
					  />
				))
				}
				
				</div>
			</div>)
}


		<Galery 
		images={product?.attributes?.[`img_color_${currentSetPhoto}`]?.data}
		closeLightbox={closeLightbox}
		lightboxOpen={lightboxOpen}
		 />
		</div>
	)
}

export default ProductSingle;