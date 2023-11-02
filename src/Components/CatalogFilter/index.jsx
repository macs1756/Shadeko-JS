import React from 'react';
import Scrollbars from 'react-scrollbars-custom';

function CatalogFilter(props) {

	
	

	return (



		<div className={props.type === 'subcategory' ? (props.category || props.filterExp ? "catalog__filter-item" : "catalog__filter-item dis") : "catalog__filter-item"}>

				<div onClick={props.onItemClick} className="cu-po catalog__filter-title d-flex a-i-center ">
					<span>{props.title}</span>
					<img className={props.isActive ? 'rotate' : ''} src={process.env.PUBLIC_URL + '/img/header__list-arrow.svg'} alt="arrow" />
				</div>
				<Scrollbars className={props.isActive ? "catalog__filter-body active" : "catalog__filter-body"}>
	
				{
					props.list.map((el,index)=>(

					

						<li 
						data-type={props.type} 

						data-filter={ props.type === 'sort' ? (index === 0 ? '' : props.filterBody[index - 1]?.attributes?.body) : (index === 0 ? '' : props.filterBody+el.id)}  
						onClick={(e)=>{props.onChildItemClick(e)}} 
						data-url={el?.attributes?.url}
						key={el+index}>
							{index === 0 ? el : (props.type === 'subcategory' ? el.attributes?.title : el.attributes?.name)}
							</li>
					))
				}			
				</Scrollbars>
		
		</div>

	);
}

export default CatalogFilter;