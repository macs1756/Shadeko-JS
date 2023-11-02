import React from 'react';
import { Routes, Route} from 'react-router-dom';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Favorites from './Pages/Favorites';
import Profile from './Pages/Profile';
import ConfiguratorTypes from './Pages/ConfiguratorTypes/';
import ProductSingle from './Pages/ProductSingle';
import SofasPage from './Pages/Sofas';
import BedroomPage from './Pages/Bedroom';
import Dining from './Pages/Dining';
import Living from './Pages/Living';
import Flooring from './Pages/Flooring';
import Luxury from './Pages/Luxury';
import Search from './Pages/Search';
import ShoppingCart from './Pages/ShoppingCart';
import Checkout from './Pages/Checkout';
import Login from './Pages/Login';
import Register from './Pages/Register';
import PrimeryCatalog from './Pages/PrimeryCatalog';
import ScrollToTop  from './Components/ScrollToTop';
import ConfiguratorDining from './Pages/ConfiguratorDining';
import ConfiguratorBedroom from './Pages/ConfiguratorBedroom';
import ConfiguratorLiving from './Pages/ConfiguratorLiving';

import SofasLux from './Pages/Sofas-lux';
import DiningLux from './Pages/Dinning-lux';
import BedroomLux from './Pages/Bedroom-lux';
import  LivingLux from './Pages/Living-lux';
import useFetch from './Hooks/useFetch';
import { useSelector, useDispatch } from 'react-redux';
import BedroomCollection from './Pages/BedroomCollection';
import DiningCollection from './Pages/DiningCollection';
import CollectionSingle from './Pages/CollectionSingle';
import AboutUs from './Pages/AboutUs';
import Contacts from './Pages/Contacts';
import HelpAndSupport from './Pages/HelpAndSupport';
import PaymentAndRefunds from './Pages/PaymentAndRefunds';
import {changeLanguage} from './Redux/languageReducer';
import OrderInformation from './Pages/OrderInformation';


function App() {

  const languageInformation = useSelector(state => state.language.language);

  

  const dispatch = useDispatch();

  const userLanguage = navigator.language || navigator.languages[0];
  const supportedLanguages = ['uk-UA', 'ru-RU', 'cs', 'ru', 'uk', 'cs-CS'];


  if(!languageInformation.language){
  if (supportedLanguages.includes(userLanguage)) {
    if (userLanguage === 'uk-UA' || userLanguage === 'ru-RU' || userLanguage === 'ru' || userLanguage === 'uk' ) {

      dispatch(changeLanguage({
        route: 'uk/',
        language: 'uk-UA',
        }));

    } else if (userLanguage === 'cs' || userLanguage === 'cs-CS') {


      dispatch(changeLanguage({
        route: 'cs/',
        language: 'cs',
        }));

    }
  } else {

    dispatch(changeLanguage({
      route: '',
      language: 'en',
      }));
    
  }
  }

  

	const { data: text, loading, error } = useFetch(process.env.REACT_APP_API_URL + `/ells?locale=${languageInformation.language}&populate=*`);


		
  return (

    

    
    <div id='wr' className="wrrapper">
       <ScrollToTop />
      <Header />
      <main>

{
        !loading ?
       (<Routes>
          <Route path={"/"} element={<Home text={text} />} />

          <Route path="/:id" element={<Home text={text} />} />
          <Route path="/favorites" element={<Favorites text={text} />} />

          <Route path="/profile" element={<Profile text={text} />} />


          <Route path="/order-information" element={<OrderInformation text={text} />} />


          <Route path="/configurator" element={<ConfiguratorTypes text={text}  />} />
          <Route path="/configurator/:type" element={<ConfiguratorTypes text={text} />} />
          
          <Route path="/product/:title/:id" element={<ProductSingle text={text} />} />
          <Route path="/product/:profile/:title/:id" element={<ProductSingle text={text} />} />

          <Route path="/sofas" element={<SofasPage text={text} />} />
          <Route path="/bedroom" element={<BedroomPage text={text} />} />
          <Route path="/dining" element={<Dining text={text} />} />
          <Route path="/living" element={<Living text={text} />} />
          <Route path="/flooring" element={<Flooring text={text} />} />
          <Route path="/luxury-style" element={<Luxury text={text} />} />

          <Route path="/collection/:type/:id" element={<CollectionSingle text={text} />} />





          <Route path="/search/:body" element={<Search text={text} />} />

          <Route path="/what-we-do" element={<AboutUs />} />


          <Route path="/shopping-cart" element={<ShoppingCart text={text} />} />
          <Route path="/checkout" element={<Checkout text={text} />} />

          <Route path="/login" element={<Login text={text} />} />
          <Route path="/register" element={<Register text={text} />} />


          <Route path="/:category/:subcategory" element={<PrimeryCatalog text={text} />} />
          <Route path="/:category/:subcategory/:type" element={<PrimeryCatalog text={text} />} />

        

          <Route path="/bedroom/bedroom-sets" element={<BedroomCollection text={text} />} /> 
          <Route path="/dining/dining-sets" element={<DiningCollection text={text} />} />
          <Route path="/bedroom/bedroom-sets/:type" element={<BedroomCollection text={text} />} />
          <Route path="/dining/dining-sets/:type" element={<DiningCollection text={text} />} />

          <Route path="/catalog" element={<PrimeryCatalog text={text} />} />

          <Route path="/configurator/dining" element={<ConfiguratorDining text={text} />} />
          <Route path="/configurator/dining/luxury" element={<ConfiguratorDining text={text} />} />

          <Route path="/configurator/bedroom" element={<ConfiguratorBedroom text={text} />} />
          <Route path="/configurator/bedroom/luxury" element={<ConfiguratorBedroom text={text} />} />

          <Route path="/configurator/living" element={<ConfiguratorLiving text={text} />} />

          <Route path="/configurator/living/luxury" element={<ConfiguratorLiving text={text} />} />


          <Route path="/sofas-luxury" element={<SofasLux text={text} />} />
          <Route path="/dining-luxury" element={<DiningLux text={text} />} />
          <Route path="/bedroom-luxury" element={<BedroomLux text={text} />} />
          <Route path="/living-luxury" element={<LivingLux text={text} />} />


          <Route path="/сontact-information" element={<Contacts  />} />
          
          <Route path="/help-and-support" element={<HelpAndSupport  />} />
          <Route path="/payment-and-refunds" element={<PaymentAndRefunds  />} />


        </Routes>
  )
  :
  <div className="skeleton-app">
  
    <img  src={process.env.PUBLIC_URL + '/img/preloader-application.svg'} alt="preloader" />
    
    </div>

}
      </main>
      <Footer />
   
    </div>
   
  );
}

export default App;


