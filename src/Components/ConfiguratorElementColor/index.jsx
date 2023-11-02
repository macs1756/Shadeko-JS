import React from 'react';
import './configuratorElementColor.scss';
import axios from 'axios';

function ConfiguratorElementColor({title, arr}) {

	const [currentColor,setCurrentColor] = React.useState(0);
	const [colors,setColors] = React.useState([]);

	arr = arr.split(';');
	

	const materialsData = async () =>{

		try {
			const responses = await Promise.all(
			  arr.map(el =>
				 axios.get(`${process.env.REACT_APP_API_URL}/configuration-colors/${el}?populate=*`, {
					headers: {
					  Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
					}
				 })
			  )
			);
 
			const colorsData = responses.map(response => response.data.data);

			setColors(colorsData);

		 } catch (err) {
			// Обробка помилки
		 }
}

React.useEffect(()=>{
	materialsData();
}, []);

	
	return (
		<section className="product__material">
							<h4>{title}</h4>
							<div className="product__material-net">
								{
									colors.map((item,index)=>(
										<img key={item+index+'color'} onClick={()=>{setCurrentColor(index)}} src={process.env.REACT_APP_IMG+item.attributes?.img?.data?.attributes?.url} alt="material" className={currentColor == index ?  'material active' : 'material'} />
									))
								}	
							</div>	
						</section>
	);
}

export default ConfiguratorElementColor;