import React from 'react';
import './Card.scss';
import { Link } from 'react-router-dom';
import slugify from "slugify";
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../../Redux/favoriteReducer';

function Card({ product, type, profile,addCart,addFavorite,deleteFavorite }) {

	const cartFavorite = useSelector(state => state.favorite.favorite);

  const isInCart = cartFavorite.some(item => item.id === product.id);

  const dispatch = useDispatch();

  const [controlPanel, setControlPanel] = React.useState(false);
  const [textFavorite, setTextFavorite] = React.useState(isInCart ? true : false);

  const [skeletonState, setSkeletonState] = React.useState(true);

  let url;

  if(product?.attributes?.title){
	url = slugify(product?.attributes?.title, { lower: true });
  }

  const clickToFavorite = () => {
    dispatch(addToFavorite({
      id: product.id,
      title: product?.attributes?.title,
      img: product?.attributes?.img_card?.data?.attributes?.url,
      price: product?.attributes?.price,
    }));

    setTextFavorite(!textFavorite);
  }

  return (
    <>
      {
        type === 'catalog' ?
          (
            <div
              onMouseOver={() => setControlPanel(true)}
              onMouseOut={() => setControlPanel(false)}
              className="card"
            >
              
              <div className="card__img-wr">

              {
                
               (typeof product?.attributes?.PersonalAccountDiscountPercent === 'number' && profile) && 
<>
                <div className='account__discount'></div>
                <span className='account__discount-text'>-{product?.attributes?.PersonalAccountDiscountPercent}%</span>
</>
              }

                <div className={skeletonState ? "skeleton-load-img active" : "skeleton-load-img"}></div>

                <Link to={profile ? '/product/profile/' + url + '/' + product.id : '/product/' + url + '/' + product.id}>
                  <img
                    onClick={() => { setControlPanel(!controlPanel) }}
                    src={process.env.REACT_APP_IMG + product?.attributes?.img_card?.data?.attributes?.url}
                    alt=" "
                    className="main"
                    onLoad={()=>{setSkeletonState(false)}}
                  />
                  
                </Link>

                <div className={controlPanel ? "card__controls active" : 'card__controls'}>
                  <Link to={'/product/' + url + '/' + product.id}>{addCart}</Link>
                  <button className={textFavorite ? 'added' : ''} onClick={clickToFavorite}>
                    {textFavorite ? deleteFavorite : addFavorite}
                    
                  </button>
                </div>
              </div>
              <h4>{product?.attributes?.title}</h4>

              {
                (product?.attributes?.oldPrice && !profile) ?

                (
                  <div className='d-flex a-i-end change-price'>
                   <h5 className='old'>{product?.attributes?.oldPrice}$</h5>
                   <h5 className='new'>{product?.attributes?.price}$</h5>
                  </div>
                  
                )
                :
                typeof product?.attributes?.PersonalAccountDiscountPercent === 'number' && profile ?

                <h5>{(product?.attributes?.price * ((100 - product?.attributes?.PersonalAccountDiscountPercent) / 100)).toFixed(0) }$</h5>
                :
                <h5>{product?.attributes?.price}$</h5>
              }

            
              <Link className='card__addToDrawer' to={'/product/' + url + '/' + product.id}>
                {addCart}
              </Link>
              <button onClick={clickToFavorite} className={textFavorite ? 'added favorite__button-mobile' : 'favorite__button-mobile'} onClick={clickToFavorite}>
                    {textFavorite ? deleteFavorite : addFavorite}
                  </button>
            </div>
          )
          :
          <>
			   <div
              onMouseOver={() => setControlPanel(true)}
              onMouseOut={() => setControlPanel(false)}
              className="card"
            >
              <div className="card__img-wr">

              <div className={skeletonState ? "skeleton-load-img active" : "skeleton-load-img"}></div>


                <Link to={'/product/' + url + '/' + product.id}>
                  <img
                    onClick={() => { setControlPanel(!controlPanel) }}
                    src={process.env.REACT_APP_IMG + product.img}
                    alt=" "
                    className="main"
                    onLoad={()=>{setSkeletonState(false)}}
                  />
                </Link>

                <div className={controlPanel ? "card__controls active" : 'card__controls'}>
                  <Link to={'/product/' + url + '/' + product.id}>{addCart}</Link>
                  <button className={textFavorite ? 'added' : ''} onClick={clickToFavorite}>
                    {textFavorite ? deleteFavorite : addFavorite}
                  </button>
                </div>
              </div>
              <h4>{product.title}</h4>  
                <h5>{product?.price}$</h5>
              
      
              <Link className='card__addToDrawer' to={'/product/' + url + '/' + product.id}>
                {addCart}
              </Link>
            </div>
			 </>
      }
    </>
  );
}

export default Card;
