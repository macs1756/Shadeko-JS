import './headerListItem.scss';
import React from 'react';
import useFetch from '../../Hooks/useFetch';
import {Link} from 'react-router-dom';
function HeaderListItem(props) {


let expr = `/subcategories?filters[url][$containsi]=${props.title.attributes.url}&locale=${props.languageInformation.language}&populate=*`;

	if(props.title.attributes.url === 'luxury-style'){
		expr = `/categories-luxury?locale=${props.languageInformation.language}&populate=*`;
	}
	
	

	let {data, loading, error} = useFetch(process.env.REACT_APP_API_URL+expr);

	

	return (

		<>
				
			<div  className="header__list-title d-flex a-i-center">
			
				<Link to={props.title.attributes.url} className='transform'>{props.title.attributes.name}</Link>

				<img onClick={props.onItemClick} className={props.isActive ? 'rotate' : ""} src={process.env.PUBLIC_URL + '/img/header__list-arrow.svg'} alt="arrow" />
				</div>

			<div className={props.isActive ? "header__list-body active d-flex a-i-center" : "header__list-body d-flex a-i-center"}>
				{

error ? "error on server" : (
	loading ? "loading.." :
	data.map((el,index) =>(

					<p onClick={props.onChildItemClick} key={el.id+index}><Link to={el.attributes.url}>{el.attributes.title.length > 30 ? el.attributes.title.slice(0, 30) + '...' : el.attributes.title}
					</Link></p>
					
				)))
			}

			</div>

			</>
		
	);
}

export default HeaderListItem;