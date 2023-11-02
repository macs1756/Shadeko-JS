import React from 'react';
import { removeItem } from '../../Redux/cartReducer';
import slugify from "slugify";
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import {  replaceItem} from '../../Redux/cartReducer';

function DrawerModalElement({product, text, setDrawerOpen}) {

	
	const replaceCardParent = (id,count) => {
		dispatch(replaceItem({
		  id: id,
		  quantity: count
		}));
 	};


	const dispatch = useDispatch();
	const [quantity,setQuantity] = React.useState(product.quantity);
	const [accordionConfiguration, setAccordionConfiguration] = React.useState(false);

	const incrimentCounter = () => {
		setQuantity(prev => prev + 1);
		replaceCardParent(product.id,quantity + 1);
	}

	const dicrimentCounter = () => {
		 setQuantity(prev => prev > 1 ? prev - 1 : prev);
		 quantity > 1 && replaceCardParent(product.id, quantity - 1);
	}

	






	return (

		
		<div className="drawer__body-item-wr">
		<div className="drawer__body-item">
                
		<Link 
		onClick={() => { setDrawerOpen(false) }} 
		to={'/product/' + (product.title && slugify(product.title, { lower: true })) + "/" + product.id} 
		className="drawer__item-preview">

		<img className="main" src={process.env.REACT_APP_IMG + product.img} alt="product" />
		</Link>

		<div className="drawer__item-details">
		  <h5>{product.title}</h5>
		  <div className='w100 d-flex a-i-center j-c-space drawer__nav'>


				<div className=''>

				

			 <div className='drawer__quantity-wrapper d-flex'>{text[0]?.attributes?.modalCartQuantity}

			 <div className='drawer__quantity-counter d-flex a-i-center'>

			 <span onClick={()=> dicrimentCounter()} className='minus'>-</span>

			 <span>{product.quantity}</span>

			 <span onClick={()=> incrimentCounter()} className='plus'>+</span>

			 </div>
			 
			 </div>


<div>
			 {
product?.color?.name &&
				<section className='d-flex a-i-center shoppingCart__main-characteristicts-net'>
					<p className="shoppingCart__main-characteristicts-p">Color: </p>
					<p>{product.color.name}</p>
					<img src={product.color.img} alt="color" />
				</section>
}		


{
product?.material?.name &&
				<section className='d-flex a-i-center shoppingCart__main-characteristicts-net'>
					<p className="shoppingCart__main-characteristicts-p">Material: </p>
					<p>{product.material.name}</p>
					<img src={product.material.img} alt="color" />
				</section>
}



			 
			 </div>






			 </div>



			 <div onClick={() => { dispatch(removeItem(product.id)) }} className="drawer__item-delete">
				<img src={process.env.PUBLIC_URL + '/img/drawer__close.svg'} alt="close" />
			 </div>
		  </div>

		


		  <h6>{product.price}$</h6>
		</div>

	 </div>

	 <div className="drawer__item-modules">
			{
				product?.modules && product?.modules.map((module) => (
					<div key={'drawerModules'+module.id} className="drawer__item-modules-img">
						<img src={module.img} alt="close" />

						<div className="module__quantity">{module.quantity}</div>
						<div className="module__price-SP">{module.quantity * module.price}$</div>
						
					</div>
					
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

		

	 </div>
	);
}

export default DrawerModalElement;