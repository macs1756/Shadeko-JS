import React from 'react';
import './search.scss';
import Card from './../../Components/Card';
import { useParams } from 'react-router-dom';
import { useSelector} from 'react-redux';
import useFetch from '../../Hooks/useFetch';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function Search({text}) {
  let { body } = useParams();

  const languageInformation = useSelector(state => state.language.language);
  const canonicalUrl = window.location.href;

  const { data, loading: loadingProduct, error: errorProduct } = useFetch(
    `${process.env.REACT_APP_API_URL}/products?filters[title][$containsi]=${body}&populate=*`
  );
  const {data: seo, loading: seoLoading, error: seoError}= useFetch(process.env.REACT_APP_API_URL+`/seos?locale=${languageInformation.language}&filters[route]=search&populate=*`);

  return (
    <div className='content search'>

    <Helmet>
        <title>{seo[0]?.attributes?.title}</title>
		  <meta property="og:title" content={seo[0]?.attributes?.title} />

        <meta name="description" content={seo[0]?.attributes?.description} />
		  <meta property="og:description" content={seo[0]?.attributes?.description}  />

        <meta name="keywords" content={seo[0]?.attributes?.keywords}  />

		  <link rel="canonical" href={canonicalUrl} />      
		  <meta name="Publisher" content="https://shadeko.eu/" />		 	
      </Helmet>




      <h2>{text[0]?.attributes?.searchTitle} "{body}"</h2>

      {data.length > 0 ? (
        <div className="search__net">
          {errorProduct ? (
            "Error on server"
          ) : loadingProduct ? (
            "Loading..."
          ) : (
            data.map((el) => <Card key={el.id} product={el} type='catalog' />)
          )}
        </div>
      ) : (
        <div className="search__empty">

			<img src={process.env.PUBLIC_URL + '/img/search.svg'} alt="icon" />

			<p>{text[0]?.attributes?.searchEmptyTitle} "{body}"</p>
			<Link to='/'>{text[0]?.attributes?.searchEmptyButton}</Link>
			</div>
      )}
    </div>
  );
}

export default Search;
