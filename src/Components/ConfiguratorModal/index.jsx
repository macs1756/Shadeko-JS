import React, {useState} from 'react';
import './configuratorModal.scss';
import ConfiguratorElementColor from '../../Components/ConfiguratorElementColor';
import ConfiguratorElementLong from '../../Components/ConfiguratorElementLong';
import ConfiguratorElementShort from '../../Components/ConfiguratorElementShort';
import useFetch from '../../Hooks/useFetch';
import axios from 'axios';
import 'swiper/swiper-bundle.min.css';
import SwiperCore, { Navigation, Pagination} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SingleModule from '../../Components/SingleModules';
import Skeleton from 'react-loading-skeleton';

// Install Swiper modules
SwiperCore.use([Navigation, Pagination]);

function ConfiguratorModal({modalOpen, setModalOpen, id, activeTab, setActiveTab, setProduct1,setProduct2,setProduct3, text}) {


	const [items, setItems] = React.useState([]);

	const calculateTotalPriceModules = () => {
		return items.reduce((total, item) => total + +item.price, 0);
	  };
	

	const [colorsIdArr, setColorsIdArr] = React.useState([]);
	const [materialsIdArr, setMaterialsIdArr] = React.useState([]);
	const [colorsApi,setColorsApi] = React.useState([]);
	const [materialsApi,setMaterialsApi] = React.useState([]);

	const [currentColor, setCurrentColor] = React.useState(0);
	const [currentMaterial, setCurrentMaterial] = React.useState(0);



	const { data: product, loading: loadingProduct, error: errorProduct } = useFetch(`${process.env.REACT_APP_API_URL}/products/${id}?populate=*`);
	//const { data: configuration, loading: configurationLoading, error: configurationError } = useFetch(`${process.env.REACT_APP_API_URL}/configurations?filters[products][$eq]=${id}?populate=*`);
	const { data: modules, loading: loadingModules, error: errorModules } = useFetch(`${process.env.REACT_APP_API_URL}/modules?filters[products][id]=${id}&populate=*`);
	

	const [modulesState, setModules] = React.useState(modules);

	React.useEffect(()=>{
		setModules(modules);
		setTotalPrice(calculateTotalPrice(modules));
   },[loadingModules]);
	
 

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

	const calculateTotalPrice = (updatedModules) => {
		return updatedModules.reduce((total, module) => total + (module.attributes.price * module.attributes.initialAmount), 0);
	 };

	 


	
	const [totalPrice, setTotalPrice] = React.useState(calculateTotalPrice(modules));
	
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

	   
	React.useEffect(() => {
		if (product) {

		  setColorsIdArr(product?.attributes?.colors?.data.map(color => color.id));
		  setMaterialsIdArr(product?.attributes?.materials?.data.map(materials => materials.id));
		
		 };

	
	 }, [product]); 




	const nextStepConfigurator = () =>{
		setModalOpen(!modalOpen);
		setActiveTab(++activeTab);
	}

	const clickOnColor = (index) =>{
		setCurrentColor(index);
	}


	const colorsData = async () =>{

		try {
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
		 } catch (err) {
			// Обробка помилки
		 }
}

const materialsData = async () =>{

	try {
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

	 } catch (err) {
		// Обробка помилки
	 }
}


React.useEffect(() => {
	colorsData();
},[colorsIdArr]);

 React.useEffect(() => {
	materialsData();

},[materialsIdArr]);

	
const productConfig = {
	id: product.id,
	price: product?.attributes?.price,
	title: product?.attributes?.title,
	img: product?.attributes?.img_card?.data?.attributes?.url,
}


const addProductInConfigurator = () => {
	nextStepConfigurator();

	if(activeTab === 2){

		setProduct1(productConfig);

	}else if(activeTab === 3){

		setProduct2(productConfig);

	}else if(activeTab === 4){

		setProduct3(productConfig);
		
	}

}


	return (

	
		id !== 0 &&
		<div className={modalOpen ? 'modal__wr active' : 'modal__wr'}>

			<div className="modal__body">

				<div onClick={()=>{setModalOpen(!modalOpen)}} className="configurator__modal-close"></div>

				<h5>{text[0]?.attributes?.configuratorModalTitle}</h5>

				<div className="d-flex a-i-start configurator__modal-wr w100">



					<div className="configurator__modal-body">




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





						<div className='wrapper'>

						{
							colorsApi.length > 0 &&

						<section className="product__color">
							<h4>Color:</h4>

						
					
						
							<div className="product__color-net">

								{
								 colorsApi.map((item,index)=>(
										<img key={item+index} onClick={()=>{clickOnColor(index)}} src={process.env.REACT_APP_IMG+ item?.attributes?.img?.data?.attributes?.url} alt="color" className={currentColor == index ?  'color active' : 'color'} />
									))
								}
							</div>
						
						</section>
}



{
							materialsApi.length > 0 &&

						<section className="product__material">
							<h4>Fabrics:</h4>
							<div className="product__material-net">
								{
									materialsApi.map((item,index)=>(
										<img key={item+index} onClick={()=>{setCurrentMaterial(index)}} src={process.env.REACT_APP_IMG+item?.attributes?.img?.data?.attributes?.url} alt="material" className={currentMaterial == index ?  'material active' : 'material'} />
									))
								}	
							</div>	
						</section>
}


						{
  errorProduct ? (
    <div>Error on server</div>
  ) : loadingProduct ? (
    <div>Loading...</div>
  ) : product ? (
     product?.attributes?.configurations?.data?.length  ? (
      product?.attributes?.configurations?.data
        .sort((a, b) => {
          const order = ['color', 'short', 'long'];
          return order.indexOf(a.attributes.type) - order.indexOf(b.attributes.type);
        })
        .map((el,index) => {
          switch (el.attributes.type) {
            case 'color':
              return <ConfiguratorElementColor 
			  key={el.id+index+'modalColors'+Date.now()} 
			  title={el.attributes.name} 
			  arr={el.attributes.value}
			  
			   />;
            case 'short':
              return <ConfiguratorElementShort 
			  key={el.id+index+'modalShort'+Date.now()} 
			  title={el.attributes.name} 
			  arr={el.attributes.value}
			  calculateSumModules={calculateSumModules}
			   />;
            case 'long':
              return <ConfiguratorElementLong key={el.id+index+'modalLong'+Date.now()} def={el.attributes.name} arr={el.attributes.value} />;
            default:
              return null;
          }
        })
    ) : (
      <h4></h4>
    )
  ) : (
    <div>Product data not available</div>
  )
}




		

						</div>
					</div>


					<div className="configurator__modal-img-wr">
						 

						 <div className="d-flex j-c-space a-i-start gap8">
						 		<h4>{product?.attributes?.title}</h4>
								 <h4 className="price">

${
	modules.length > 0 && !loadingModules ? 
	(totalPrice ? totalPrice + +calculateTotalPriceModules() : '0') : 
	(product?.attributes?.price ? product?.attributes?.price + +calculateTotalPriceModules() : '0')	
}
</h4>
						 </div>

						<div className='configurator__modal-img'>


						<Swiper
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
	  
    >

{
product?.attributes?.img_color_1?.data.map((el)=>(
	<SwiperSlide key={'swiper-slide'+el.id}>
        <img src={process.env.REACT_APP_IMG + el?.attributes?.url } alt="Slide 1" />
    </SwiperSlide>
))
}
    </Swiper>

						</div>
					
						<p className='description'>{product?.attributes?.description}</p>

					</div>

				</div>
				
				<div className='d-flex j-c-center w100'>
					<button onClick={()=>{addProductInConfigurator()}} className='configurator__button'>{text[0]?.attributes?.configuratorModalButton}</button>
				</div>
				

			</div>
			
			</div>
	);
}

export default ConfiguratorModal;