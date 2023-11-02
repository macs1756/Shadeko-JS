import React from 'react';
import Card from '../../Components/Card';
import './Favorites.scss';
import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { Helmet } from 'react-helmet-async';

function Favorites() {

  const canonicalUrl = window.location.href;

  const languageInformation = useSelector(state => state.language.language);
	const { data: text, loading, error } = useFetch(process.env.REACT_APP_API_URL + `/ells?locale=${languageInformation.language}&populate=*`);
  const favoriteElements = useSelector(state => state.favorite.favorite);
  const {data: seo, loading: seoLoading, error: seoError}= useFetch(process.env.REACT_APP_API_URL+`/seos?locale=${languageInformation.language}&filters[route]=favorites&populate=*`);
 
  return (  
    <div className='content favorites'>

    <Helmet>
        <title>{seo[0]?.attributes?.title}</title>
		  <meta property="og:title" content={seo[0]?.attributes?.title} />

        <meta name="description" content={seo[0]?.attributes?.description} />
		  <meta property="og:description" content={seo[0]?.attributes?.description}  />

        <meta name="keywords" content={seo[0]?.attributes?.keywords}  />

		  <link rel="canonical" href={canonicalUrl} />      
		  <meta name="Publisher" content="https://shadeko.eu/" />		 	
      </Helmet>

      <h2>{text[0]?.attributes?.titleFavorite}</h2>

      {favoriteElements.length > 0 ? (
        <div className="favorites__net">
          {favoriteElements.map((el) => (
            <Card 
            key={el.id+'favorite'} 
            product={el} 
            type='favorite'
            addCart={text[0]?.attributes?.buttonAddToCart}
            addFavorite={text[0]?.attributes?.buttonAddToFavorite}
            deleteFavorite={text[0]?.attributes?.deleteFavorite}

             />
          ))}
        </div>
      ) : (
        <div className="favorites__empty">
          <Link to='/'>
            <img src={process.env.PUBLIC_URL + '/img/heart.svg'} alt="icon" />
          </Link>
          <h6>{text[0]?.attributes?.emptyFavorite}</h6>
        </div>
      )}
    </div>
  );
}

export default Favorites;
