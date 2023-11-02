import React from 'react';
import {Link} from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';

function HeaderListMobile(props) {


	let expr = `/subcategories?filters[url][$containsi]=${props.title.attributes.url}&locale=${props.languageInformation.language}&populate=*`;

	if(props.title.attributes.url === 'luxury-style'){
		expr = `/categories-luxury?locale=${props.languageInformation.language}&populate=*`;
	}
	

	let {data, loading, error} = useFetch(process.env.REACT_APP_API_URL+expr);




	return (
		<div className='header__list-mobile-wr'>


			<div  className="header__list-mobile-title d-flex a-i-center j-c-space w100">
				<Link onClick={props.onChildItemClick} to={props.title.attributes.url} >{props.title.attributes.name}</Link>
				<img onClick={props.onItemClick} className={props.isActive ? 'rotate' : ''} src={process.env.PUBLIC_URL + '/img/header__plus.svg'} alt="plus" />
			</div>

			<ul className={props.isActive ? 'header__list-mobile-body active' : 'header__list-mobile-body'}>
			{
					data.map((el,index)=>(
						<li className='header__list-mobile-item d-flex a-i-center j-c-start' onClick={props.onChildItemClick} key={el.id}>						
							<span>-</span>
							<p><Link to={el.attributes.url}>{el.attributes.title}</Link></p>
							</li>
					))
				}
			</ul>

		</div>
	);
}

export default HeaderListMobile;