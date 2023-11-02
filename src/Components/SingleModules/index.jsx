import React from 'react';
import './singleModules.scss';
import Galery from '../../Components/Galery';
import Submodules from '../Submodules';


function SingleModule({module, onChange, CollectionModuleConfig}) {


	const [quantity,setQuantity] = React.useState(module?.attributes?.initialAmount);

	const [modalCharacteristics, setModalCharacteristics] = React.useState(false);

	const [lightboxOpen, setLightboxOpen] = React.useState(false);
	const [skeletonState, setSkeletonState] = React.useState(true);

	const closeLightbox = () => {
		setLightboxOpen(!lightboxOpen);
	 };

	 let characteristic = '';

	if(module?.attributes?.characteristics){
	characteristic = module?.attributes?.characteristics.split(";").map((item, index) => (
		<li key={'characteristic'+index}>{item.trim()}</li>
	 ));
	}


	const handleQuantityChange = (newQuantity) => {
	  setQuantity(newQuantity);
	  onChange(module?.id,module?.attributes?.price, newQuantity); 
	 
	};

	React.useEffect(()=>{
		if(module?.attributes?.initialAmount){
			handleQuantityChange(module?.attributes?.initialAmount);
			
		}	
	},[module]);

	const submodulesClear = module?.attributes?.submodules?.data.map((submodule) => ({
		module: module?.id,
		currentIndex: 0,
		submodule: submodule?.id,
		initial: true
	  }));
	  

	  

	const [elements, setElements] = React.useState(submodulesClear);
	
	 
	   React.useEffect(()=>{
			 CollectionModuleConfig(elements);
	   },[]);


	  const updateSubmodules = (id, newIndex) => {

		setElements((prevElements) =>
		  prevElements.map((element) =>
			element.id === id ? { ...element, currentIndex: newIndex } : element
		  )
		);

		CollectionModuleConfig([{module: module?.id, currentIndex:newIndex, submodule: id,initial:false}]);
	  };
	
	

	return (
		
					<div  className={quantity === 0 ? 'modules__wrapper disabled' : 'modules__wrapper'}>


						<div className='d-flex a-i-center'>

						<div onClick={() => closeLightbox()} className='modules__img-wr'>

						<div className={skeletonState ? "skeleton-load-img active" : "skeleton-load-img"}></div>

						<img 
						className='miniature' 
						src={process.env.REACT_APP_IMG+module?.attributes?.imgCard?.data?.attributes?.url} 
						alt="miniature product"
						onLoad={()=>{setSkeletonState(false)}}
						 />
					
						</div>
						

						<div className='modules__counter'>
						<div className="product__quantity-counter d-flex a-i-center ">

<img onClick={()=> quantity > 0 && handleQuantityChange(quantity - 1)} className='quantity__arrow quantity__arrow-prev' src={process.env.PUBLIC_URL + '/img/quantity__arrow.svg'} alt="arrow" />
<p>{quantity}</p>
<img onClick={() => handleQuantityChange(quantity + 1)} className='next quantity__arrow' src={process.env.PUBLIC_URL + '/img/quantity__arrow.svg'} alt="arrow" />

</div>	
						</div>
						</div>


					

						<div className='modules__price'>${module?.attributes?.price}</div>

						<div className='modules__characteristics'>
							<button className='modules__characteristics-view-char' onClick={()=> setModalCharacteristics(!modalCharacteristics)}>View characteristics</button>
							{
								module?.attributes?.submodules?.data.map((submodules)=>(
									<Submodules 
									className='test' 
									submodule={submodules} 
									key={'submodules'+submodules.id}
									updateElement={updateSubmodules}
									 />
								))
							}
						</div>


						<Galery 
		images={module?.attributes?.imgGallery?.data}
		closeLightbox={closeLightbox}
		lightboxOpen={lightboxOpen}
		 />	
		 			<div onClick={()=> setModalCharacteristics(!modalCharacteristics)} className={modalCharacteristics ? "modal__wr active" : "modal__wr"}>
						<div className="modal__body">


							<h4>{module?.attributes?.name}</h4>
							<ul className=''>
								{characteristic}
							</ul>
						</div>
					</div>

					</div>
				
			

	)	
}

export default SingleModule;