import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import ShoppingCartModule from '../ShoppingCartModule';

function CheckoutItem({ product,  onCounterChange, replaceCardPerent, text}) {

	const dispatch = useDispatch();
	const [quantity,setQuantity] = React.useState(product.quantity);
	const [accordionConfiguration, setAccordionConfiguration] = React.useState(false);
	

		const handleCounterChange = (value) => {
		  onCounterChange(product.id, value);
		  
		};

		const [closeLightbox, setCloseLightbox] = React.useState(false);
	const [lightboxSrc,setLightboxSrc] = React.useState('');

		
		const growImage = (e) => {
			setLightboxSrc(e.target.src);
			setCloseLightbox(!closeLightbox);	
		}

		const closeGalery = () => {
			setLightboxSrc('');
			setCloseLightbox(!closeLightbox);
		}


			React.useEffect(()=>{
				handleCounterChange(quantity);
				replaceCardPerent(product.id,quantity);
			}, [quantity]);

	

	return (

		<div className="checkout__order-item-wr">

		<div className='checkout__order-item'>


			<div className="checkout__item-img">
				<img  onClick={(e) => growImage(e)}  className='main'  src={process.env.REACT_APP_IMG+product.img} alt="product preview" />
			</div>

			<div className="checkout__item-text">


				<div className="top d-flex a-i-center">
					
					<h5>{product.title}</h5>
					<div className="checkout__counter d-flex a-i-center">
					<span onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : prev)}>-</span>
					<p>{quantity}</p>
					<span onClick={() => setQuantity(prev => prev + 1)}>+</span>
				</div>

				{
					product.stockQuantity === 0 ?
					<div className='d-flex flex-column product__stockQuantity-price'>
					<div className="price old">${(product.price * quantity).toFixed(2)}</div>
					<div className="price new">${(product.price * quantity / 2).toFixed(2)}</div>
					</div> :
					<div className="price">${(product.price * quantity).toFixed(2)}</div>
				}
				

				</div>


				{
					product.stockQuantity == 0 && 	<div className="product__stockQuantity">{text[0]?.attributes?.productIsNotAvailable}</div>
				}
				
			

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

		
		<div className="drawer__item-modules">
		{
				product?.modules && product?.modules.map((module) => (
					<ShoppingCartModule 
					key={'drawerModules'+module.id}
					module={module}
					growImage={growImage}
					 />
					
				))
			}
	   </div>

		{
	product?.configurations &&

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

export default CheckoutItem;