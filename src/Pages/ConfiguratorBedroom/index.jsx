import React, { useState } from "react";
import "../../Pages/ConfiguratorDining/configuratorStyle.scss";
import { Link } from "react-router-dom";
import ConfiguratorModal from "../../Components/ConfiguratorModal";
import useFetch from '../../Hooks/useFetch';
import  Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Redux/cartReducer';
import { addToFavorite } from '../../Redux/favoriteReducer';
import { Helmet } from 'react-helmet-async';

function ConfiguratorBedroom({text}) {

  const canonicalUrl = window.location.href;

  const languageInformation = useSelector(state => state.language.language);
	

  
  const { data: product, loading: loadingProduct, error: errorProduct } = useFetch(`${process.env.REACT_APP_API_URL}/products?[filters][categories][id]=2&[filters][subcategories][url][$contains]=Beds&populate=*`);
  const { data: productSecond, loading: loadingProductSecond, error: errorProductSecond } = useFetch(`${process.env.REACT_APP_API_URL}/products?[filters][categories][id]=2&[filters][subcategories][url][$contains]=Wardrobes&populate=*`);
  const { data: productThree, loading: loadingProductThree, error: errorProductThree} = useFetch(`${process.env.REACT_APP_API_URL}/products?[filters][categories][id]=2&[filters][subcategories][url][$contains]=Matrasses&populate=*`);

  const {data: seo, loading: seoLoading, error: seoError}= useFetch(process.env.REACT_APP_API_URL+`/seos?locale=${languageInformation.language}&filters[route]=configurator-bedroom&populate=*`);

  const {data: photoPreview, loading: photoPreviewLoading, error: photoPreviewError} = useFetch(process.env.REACT_APP_API_URL+`/fotoprevyu-storinok-konfiguratora?[filters][hook][$contains]=Bedroom&populate=*`);


  const [modalId,setModalId] = React.useState('');

	const [activeTab, setActiveTab] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);

	const [counter1, setCounter1] = React.useState(1);
	const [counter2, setCounter2] = React.useState(1);
	const [counter3, setCounter3] = React.useState(1);


  const [product1,setProduct1] = React.useState({});
  const [product2,setProduct2] = React.useState({});
  const [product3,setProduct3] = React.useState({});

  



  const totalPriceForConfigurationProducts = () =>{
      let t = 0;

      if(product1?.price){
        t = t + counter1*product1.price;
      }

      if(product2?.price){
        t = t + counter2*product2.price;
      }

      if(product3?.price){
        t = t + counter3*product3.price;
      }

      return t;
  }

  React.useEffect(()=>{
    setCounter1(1);
  }, [product1]);

  React.useEffect(()=>{
    setCounter2(1);
  }, [product2]);

  React.useEffect(()=>{
    setCounter3(1);
  }, [product3]);

  
	const handleTabClick = (index) => {
	  setActiveTab(index);
  
	};

  const productClick = (id) => {
    setModalOpen(!modalOpen);
    setModalId(id);
  }

  const dispatch = useDispatch();

  const addToDrawerAllProducts = () => {

    

    if(product1?.id){

      dispatch(addToCart({
        ...product1,
        quantity: counter1
      }));
    }


    if(product2?.id){
      dispatch(addToCart({
        ...product2,
        quantity: counter2
      }));
    }

    if(product3?.id){
      dispatch(addToCart({
        ...product3,
        quantity: counter3
      }));
    }

    setCounter1(1);
    setCounter2(1);
    setCounter3(1);
    setProduct1({});
    setProduct2({});
    setProduct3({});

    setActiveTab(0);

  }


  const addToWishList = () => {

    if(product1?.id){
      dispatch(addToFavorite({
        id: product1.id,
        title: product1.title,
        img: product1.img,
        price: product1?.price,
      }));
    }

    if(product2?.id){
      dispatch(addToFavorite({
        id: product2.id,
        title: product2.title,
        img: product2.img,
        price: product2?.price,
      }));
    }

    if(product3?.id){
      dispatch(addToFavorite({
        id: product3.id,
        title: product3.title,
        img: product3.img,
        price: product3?.price,
      }));
    }


  }

  return (
    <div className="configuratorDining content">

<Helmet>
        <title>{seo[0]?.attributes?.title}</title>
		  <meta property="og:title" content={seo[0]?.attributes?.title} />

        <meta name="description" content={seo[0]?.attributes?.description} />
		  <meta property="og:description" content={seo[0]?.attributes?.description}  />

        <meta name="keywords" content={seo[0]?.attributes?.keywords}  />

		  <link rel="canonical" href={canonicalUrl} />      
		  <meta name="Publisher" content="https://shadeko.eu/" />		 	
      </Helmet>


      <div className="d-flex a-i-center j-c-space">
        <div className="configuratorDining__bread-crumbs">
          <div className="d-flex a-i-center configuratorDining__bread-crumbs-body">
            <Link to="/">{text[0]?.attributes?.breadCrumbHome}</Link>
            <span>/</span>
            <p>{text[0]?.attributes?.breadCrumbConfigurator}</p>
          </div>
        </div>

        <h2>{text[0]?.attributes?.titleBedroomCofigurator}</h2>

        <div className="configuratorDining__bread-crumbs o0">
          <div className="d-flex a-i-center configuratorDining__bread-crumbs-body">
            <Link to="/">Home</Link>
            <span>/</span>
            <p>Configurator</p>
          </div>
        </div>
      </div>

      <div className="configurator__buttons">
        <div 	 
		  className={activeTab === 1 ? 'configurator__buttons-item active' : 'configurator__buttons-item'}
		  >
          <div className="number">
            <span>1</span>
          </div>

          <div className="detais">
            <h3>{text[0]?.attributes?.bedroomConfiguratorTab1Text1}</h3>
            <p>{text[0]?.attributes?.bedroomConfiguratorTab1Text2}</p>
          </div>

          <div className="arrow">
            <img
				  className={activeTab === 1 ? 'active' : ''}
				  onClick={() => handleTabClick(1)}
              src={process.env.PUBLIC_URL + "/img/configurator__arrow.svg"}
              alt="arrow"
            />
          </div>
        </div>

        <div
		    className={activeTab === 2 ? 'configurator__buttons-item active' : 'configurator__buttons-item'}
		  >
          <div className="number">
            <span>2</span>
          </div>

          <div className="detais">
            <h3>{text[0]?.attributes?.bedroomConfiguratorTab2Text1}</h3>
            <p>{text[0]?.attributes?.bedroomConfiguratorTab2Text2}</p>
          </div>

          <div className="arrow">
            <img
				  onClick={() => handleTabClick(2)}
              src={process.env.PUBLIC_URL + "/img/configurator__arrow.svg"}
              alt="arrow"
				  className={activeTab === 2 ? 'active' : ''}
            />
          </div>
        </div>

        <div 
		    className={activeTab === 3 ? 'configurator__buttons-item active' : 'configurator__buttons-item'}
		  >
          <div className="number">
            <span>3</span>
          </div>

          <div className="detais">
            <h3>{text[0]?.attributes?.bedroomConfiguratorTab3Text1}</h3>
            <p>{text[0]?.attributes?.bedroomConfiguratorTab3Text2}</p>
          </div>

          <div className="arrow">
            <img
				  className={activeTab === 3 ? 'active' : ''}
				  onClick={() => handleTabClick(3)}
              src={process.env.PUBLIC_URL + "/img/configurator__arrow.svg"}
              alt="arrow"
            />
          </div>
        </div>
      </div>


		{activeTab === 1  && (
		<div className="configurator__products">
        <h3>{text[0]?.attributes?.bedroomConfiguratorTab1Title}</h3>


{/* 111111111111111111111111111111111111111111 */}

        <div className="configurator__products-net">
        {errorProduct ? (
  "Помилка на сервері"
) : (
  loadingProduct ? (
    <>
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
    </>
  ) : product.length === 0 ? (
    <p>Нічого не знайдено</p>
  ) : (
    product.map((el) => (

      <div key={'configuration-configuraton'+el.id} onClick={()=>{productClick(el.id)}} className="configurator__products-item">
            <div className="main">
              <img
                src={process.env.REACT_APP_IMG+el.attributes.img_card.data.attributes.url}
                alt="product photo"
              />
            </div>
				
            <h4>{el.attributes.title}</h4>
            <p className="price">{el.attributes.price}$</p>
          </div>
    ))
  )
)}

          
        </div>

			<div className="w100 d-flex j-c-center">
			<button className="configurator__product-more upper">{text[0]?.attributes?.buttonMoreProduct}</button>
			</div>
		

      </div>
		)}

    {/* 222222222222222222222222222222222222222222 */}

		{activeTab === 2 && (
		<div className="configurator__products">
        <h3>{text[0]?.attributes?.bedroomConfiguratorTab2Title}</h3>

        <div className="configurator__products-net">

        {errorProductSecond ? (
  "Помилка на сервері"
) : (
  loadingProductSecond ? (
    <>
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
    </>
  ) : productSecond.length === 0 ? (
    <p>Нічого не знайдено</p>
  ) : (
    productSecond.map((el) => (

      <div onClick={()=>{productClick(el.id)}} className="configurator__products-item">
            <div className="main">
              <img
                src={process.env.REACT_APP_IMG+el.attributes.img_card.data.attributes.url}
                alt="product photo"
              />
            </div>
				
            <h4>{el.attributes.title}</h4>
            <p className="price">{el.attributes.price}$</p>
          </div>
    ))
  )
)}




        </div>
        

			<div className="w100 d-flex j-c-center">
			<button className="configurator__product-more upper">{text[0]?.attributes?.buttonMoreProduct}</button>
      
			</div>
    
		

      </div>
		)}

  {/* 222222222222222222222222222222222222222222 */}

		{activeTab === 3 && (
		<div className="configurator__products">
        <h3>{text[0]?.attributes?.bedroomConfiguratorTab3Title}</h3>

        <div className="configurator__products-net">

        {errorProductThree ? (
  "Помилка на сервері"
) : (
  loadingProductThree ? (
    <>
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
      <Skeleton className="custom-skeleton" />
    </>
  ) : productThree.length === 0 ? (
    <p>Нічого не знайдено</p>
  ) : (
    productThree.map((el) => (

      <div onClick={()=>{productClick(el.id)}} className="configurator__products-item">
            <div className="main">
              <img
                src={process.env.REACT_APP_IMG+el.attributes.img_card.data.attributes.url}
                alt="product photo"
              />
            </div>
				
            <h4>{el.attributes.title}</h4>
            <p className="price">{el.attributes.price}$</p>
          </div>
    ))
  )
)}

         
        </div>
        

			<div className="w100 d-flex j-c-center">
			<button className="configurator__product-more upper">{text[0]?.attributes?.buttonMoreProduct}</button>
			</div>
		

      </div>
		)}

		{activeTab === 0 && (
			<div className="configurator__preview-photo">
				  <img
                src={process.env.REACT_APP_IMG + photoPreview?.attributes?.img?.data?.attributes?.url}
                alt="background"
              />
			</div>
		)}

{activeTab === 4 && (
    <div className="configurator__finalStep">

<div className="configurator__finalStep-item">

        {
          product1.img ? 
        
         <img
                src={process.env.REACT_APP_IMG+product1.img}
                alt="product photo"
          />
        :
        (<div className="empty"></div>)
        }
</div>

<div className="configurator__finalStep-item">
{
          product2.img ? 
        
         <img
                src={process.env.REACT_APP_IMG+product2.img}
                alt="product photo"
          />
        :
        (<div className="empty"></div>)
        }
</div>

<div className="configurator__finalStep-item">
{
          product3.img ? 
        
         <img
                src={process.env.REACT_APP_IMG+product3.img}
                alt="product photo"
          />
        :
        (<div className="empty"></div>)
        }
</div>

    </div>
)}


<button onClick={() => handleTabClick(4)} className="configurator__complete-shopping">{text[0]?.attributes?.configuratorPreviewCurrentProductsButton}</button>


      <div className="configurator__navigation">

		<div className="configurator__navigation-body">

		<div className="configurator__details-details">


<div className="configurator__navigation-details">
			<h6>{text[0]?.attributes?.bedroomConfiguratorPanelControlTitle1}</h6>
			<h6 className="d360">{text[0]?.attributes?.bedroomConfiguratorPanelControlTitle2}</h6>
			<h6 className="d360">{text[0]?.attributes?.bedroomConfiguratorPanelControlTitle3}</h6>
</div>
		
		
			
			<ul>
					<li className="title">
            <p>{text[0]?.attributes?.bedroomConfiguratorPanelControlSubtitle1}</p>
            <span>{text[0]?.attributes?.bedroomConfiguratorPanelControlTitle3}</span></li>


					<li className="d-flex a-i-center counter">
						<div onClick={() => setCounter1(prev => prev > 1 ? prev - 1 : prev)} className="counter__minus">-</div>
						<div className="counter__body">{counter1}</div>
						<div onClick={() => setCounter1(prev => prev + 1)} className="counter__plus">+</div></li>
					<li className="price">
            <span className="b360">{text[0]?.attributes?.bedroomConfiguratorPanelControlTitle2}</span>
            <b>{product1.price ? '$'+counter1 * product1.price : '???'}</b></li>
				</ul>

		

			<ul>

					<li className="title">					 
						<p>{text[0]?.attributes?.bedroomConfiguratorPanelControlSubtitle2}</p>
						<span>{text[0]?.attributes?.bedroomConfiguratorPanelControlTitle3}</span>
					</li>

					<li className="d-flex a-i-center counter">
						<div onClick={() => setCounter2(prev => prev > 1 ? prev - 1 : prev)} className="counter__minus">-</div>
						<div className="counter__body">{counter2}</div>
						<div onClick={() => setCounter2(prev => prev + 1)} className="counter__plus">+</div>
					</li>

					<li className="price">
					<span className="b360">{text[0]?.attributes?.bedroomConfiguratorPanelControlTitle2}</span>
					<b>{product2.price ? '$'+counter2 * product2.price : '???'}</b>
					</li>

				</ul>

			

			<ul>
						<li className="title">		
						<p>{text[0]?.attributes?.bedroomConfiguratorPanelControlSubtitle3}</p>
						<span>{text[0]?.attributes?.bedroomConfiguratorPanelControlTitle3}</span>
						</li>

					<li className="d-flex a-i-center counter">		
						<div onClick={() => setCounter3(prev => prev > 1 ? prev - 1 : prev)} className="counter__minus">-</div>
						<div className="counter__body">{counter3}</div>
						<div onClick={() => setCounter3(prev => prev + 1)} className="counter__plus">+</div></li>

					<li className="price">
            <span className="b360">{text[0]?.attributes?.bedroomConfiguratorPanelControlTitle2}</span>
            <b>{product3.price ? '$'+counter3 * product3.price : '???'}</b></li>
				</ul>

			<div className="configurator__total-price">${totalPriceForConfigurationProducts()}</div>
		</div>

		<div className="configurator__navigation-buttons">

			<div className="configurator__addTofavorite">
				<img
                src={process.env.PUBLIC_URL + "/img/favorite.svg"}
                alt="favorite"
              />
				<button onClick={()=>{addToWishList()}} className="button">{text[0]?.attributes?.buttonAddToFavorite}</button>
			</div>



			<Link onClick={()=>{addToDrawerAllProducts()}} className="configurator__checkout" to='/checkout'>{text[0]?.attributes?.modalCartButtonSecond}</Link>
	
  
  		<button onClick={()=>{addToDrawerAllProducts()}} className="configurator__addToCart">{text[0]?.attributes?.buttonAddToCart}</button>


		</div>

		</div>


		</div>

  
        <ConfiguratorModal 
        text={text}
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        modalOpen={modalOpen} 
        id={modalId} 
        setModalOpen={setModalOpen}
        setProduct1={setProduct1}
        setProduct2={setProduct2}
        setProduct3={setProduct3}
         />
       
       
      <p className='configurator__order-details'>{text[0]?.attributes?.configuratorTextOrderDetails}</p>
      
    </div>
  );
}

export default ConfiguratorBedroom;
