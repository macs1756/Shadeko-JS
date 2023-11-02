import React from 'react';
import './configuratorElementLong.scss';

function ConfiguratorElementLong({def, arr, id, calculateSumModules }) {


	arr = arr.split(';');

	const removePriceFromText = (text) => {
		return text.replace(/\[\+?\d+\]/g, ''); // Видаляємо числа в квадратних дужках
	 };

	const [openBody, setOpenBody] = React.useState(false);
	const [defaultValue, setDefaultValue] = React.useState(def);
	const [currentIndex, setCurrentIndex] = React.useState(90);
	const [currentMutationPrice, setCurrentMutationPrice] = React.useState(0);
	const [currentValue, setCurrentValue] = React.useState(removePriceFromText(arr[0]));
	
	const clickListElement = (e,index) =>{
		setOpenBody(!openBody);
		setDefaultValue(e.target.innerText);
		setCurrentIndex(index);
		setCurrentMutationPrice(e.target.dataset.priceMutation);
		setCurrentValue(e.target.innerText);
	}

	React.useEffect(()=>{

		calculateSumModules(id,currentMutationPrice,def,currentValue);
  
	 },[currentMutationPrice]);

	

	 const extractNumber = (str) => {
		const startIndex = str.indexOf('[');
		const endIndex = str.indexOf(']');
		
		if (startIndex !== -1 && endIndex !== -1) {
		  const numberStr = str.substring(startIndex + 1, endIndex);
		  const number = parseInt(numberStr);
		  return isNaN(number) ? null : number;
		}
		
		return null;
	 }

	return (
	
	<section className="long-configuration w100">


	<div onClick={()=>{setOpenBody(!openBody)}} className={openBody ? 'default active d-flex a-i-center j-c-space' :"default d-flex a-i-center j-c-space"}>

		<p>{defaultValue}</p>

		<svg width="19" height="12" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.2325 0L9.5 7.417L16.7675 0L19 2.2834L9.5 12L0 2.2834L2.2325 0Z" fill="#474745"/>
</svg>

	</div>
	<ul className={openBody ? "body active" : 'body'}>

	{
  arr.map((el, index) => {
    const priceMutation = extractNumber(el);

    return (
      <li
        key={el + index + 'long'}
        className={currentIndex === index ? 'active' : ''}
        onClick={e => {
          clickListElement(e, index);
        }}
        data-price-mutation={priceMutation}
      >
        {removePriceFromText(el)}
      </li>
    );
  })
}

	</ul>


</section>


);
}

export default ConfiguratorElementLong;