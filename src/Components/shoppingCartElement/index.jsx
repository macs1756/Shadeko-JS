import React, {useState} from 'react';
import {removeItem} from '../../Redux/cartReducer';
import {useSelector, useDispatch} from 'react-redux';
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import ShoppingCartModule from '../ShoppingCartModule';



function ShoppingCartElement({ product,  onCounterChange }) {

	const dispatch = useDispatch();
	const [quantity,setQuantity] = React.useState(product.quantity);
	const [accordionConfiguration, setAccordionConfiguration] = React.useState(false);

	const [closeLightbox, setCloseLightbox] = React.useState(false);
	const [lightboxSrc,setLightboxSrc] = React.useState('');

		const handleCounterChange = (value) => {
		  onCounterChange(product.id, value);
		  
		};

		
		const growImage = (e) => {
			setLightboxSrc(e.target.src);
			setCloseLightbox(!closeLightbox);	
		}

		const closeGalery = () => {
			setLightboxSrc('');
			setCloseLightbox(!closeLightbox);
		}
	

	return (
		<div className="shoppingCart__net-item-wr">

		
		<div className="shoppingCart__net-item">
		<div className="main__wr">
		<img onClick={(e) =>  growImage(e)} className='main' src={process.env.REACT_APP_IMG+product.img} alt="miniature" />
		</div>

		<div className="shoppingCart__item-details">

			<div className="shoppingCart__item-title d-flex a-i-start j-c-space w100">
				<h3>{product?.title}</h3>
				<img onClick={()=>{dispatch(removeItem(product.id))}} className='delete' src={process.env.PUBLIC_URL + '/img/drawer__close.svg'} alt="close" />
			</div>

			<div className="shoppingCart__item-quantity d-flex a-i-center w100 j-c-space">
				<p className='desc'>Qty</p>

				<div className="shoppingCart__quantity-body d-flex a-i-center ">

					<span  onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : prev)} className='shoppingCart__minus'>-</span>

					<p onChange={handleCounterChange} className='shoppingCart__count'>{quantity}</p>
				
					<span onClick={() => setQuantity(prev => prev + 1)} className='shoppingCart__plus'>+</span>

				</div>

				<div className="w100 d-flex j-c-end price">{(product.price * quantity).toFixed(2)}$</div>

			</div>

			<div className="shoppingCart__main-characteristicts">


{

product?.color?.name &&
				<section className='d-flex a-i-center shoppingCart__main-characteristicts-net'>
					<p className="shoppingCart__main-characteristicts-p">Color: </p>
					<p>{product.color.name}</p>
					<img onClick={(e) => growImage(e)} src={product.color.img} alt="color" />
				</section>
}		


{
product?.material?.name &&
				<section className='d-flex a-i-center shoppingCart__main-characteristicts-net'>
					<p className="shoppingCart__main-characteristicts-p">Material: </p>
					<p>{product.material.name}</p>
					<img onClick={(e) => growImage(e) } src={product.material.img} alt="color" />
				</section>
}		



			</div>

		</div>

		
		

		</div>

		<div className="drawer__item-modules">
			{
				product?.modules.map((module) => (
					<ShoppingCartModule 
					key={'drawerModules'+module.id}
					module={module}
					growImage={growImage}
					 />
					
				))
			}
	</div>



{
	product?.configurations.length > 0 &&

	<div className="drawer__item-configutations">
		<h6 onClick={() => setAccordionConfiguration(!accordionConfiguration)} className='di-flex a-i-center configutations-net'>
			<span>Configurations</span>
			<img className={accordionConfiguration ? 'active' : ''} src={process.env.PUBLIC_URL + '/img/header__list-arrow.svg'} alt="arrow" />
		</h6>

		<div className={accordionConfiguration ? "drawer__item-configutations-body accordion-content-c active" : "drawer__item-configutations-body accordion-content-c" }>
				{
					product?.configurations.map((configuration)=>(
						<section className='d-flex a-i-center configutation-item'>
							<p>{configuration?.title}</p>
							<span>{configuration?.value}</span>
						</section>
					))
				}
		</div>
	</div>
}

		{
			closeLightbox && 

			<Lightbox 
				image={lightboxSrc}
				onClose={closeGalery}	
			 />

		}

		</div>
	);
}

export default ShoppingCartElement;