import React from 'react';
import './configuratorElementShort.scss';

function ConfiguratorElementShort({ title, arr, id, calculateSumModules }) {


  arr = arr.split(';');

  const removePriceFromText = (text) => {
    return text.replace(/\[\+?\d+\]/g, ''); // Видаляємо числа в квадратних дужках
  };


  const [currentIndex, setCurrentIndex] = React.useState(0);

  const [currentMutationPrice, setCurrentMutationPrice] = React.useState(0);



  const [currentValue, setCurrentValue] = React.useState(removePriceFromText(arr[0]));

  React.useEffect(()=>{

    calculateSumModules(id,currentMutationPrice,title,currentValue);

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

  const changeElement = (e, index) => {
    setCurrentIndex(index);
    setCurrentValue(e.target.innerText);
    setCurrentMutationPrice(e.target.dataset.priceMutation);
    
  }


 
  return (
    <div className='short__wr'>
      <h4>{title}</h4>
      <ul>
        {arr.map((el, index) => {
          const priceMutation = extractNumber(el);

          return (
            <li
              key={el + index + 'short'}
              onClick={(e) => { changeElement(e, index) }}
              className={currentIndex === index ? 'active' : ''}
              data-price-mutation={priceMutation}
            >
              {removePriceFromText(el)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ConfiguratorElementShort;
