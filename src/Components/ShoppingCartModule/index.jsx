import React from 'react';


export default function ShoppingCartModule({module, growImage}) {

    const [informationModal, setInformationModal] = React.useState(false);
    const [results, setResults] = React.useState([]); // Стан для зберігання результатів запису
    const [loading, setLoading] = React.useState(true); // Стан для зберігання стану завантаження
    const [error, setError] = React.useState(null); // Стан для зберігання помилок, якщо є
  
    // Функція для асинхронного запису даних за ID.
    async function writeToDatabase(id) {
      try {
        // Виконайте асинхронний запис даних і отримайте результат
        const response = await fetch(`${process.env.REACT_APP_API_URL}/submodules/${id}?populate=*`, {
          method: 'GET',
          headers: {
            Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
          }
        });
  
        if (response.ok) {
          const result = await response.json();
          setResults(prevResults => [...prevResults, result.data]); // Додайте результат до стану
        } else {
          setError(`Помилка при записі для ID ${id}`);
        }
      } catch (error) {
        setError(`Помилка при записі для ID ${id}: ${error.message}`);
      }
    }
  
    // Функція для асинхронного запису даних для всіх ID.
    async function writeDataForIds() {
      if (module.submodules) {
        for (const el of module.submodules) {
          await writeToDatabase(el.submodule);
        }
      }
      setLoading(false); // Закінчити завантаження після завершення всіх записів
    }
  
    React.useEffect(() => {
      writeDataForIds(); // Викликайте запис для всіх ID при монтуванні компонента
    }, [module]); // Додайте module як залежність, щоб виконати записи при зміні module
  
    
    let characteristic = '';
  
    if (module?.characteristics) {
      characteristic = module?.characteristics.split(";").map((item, index) => (
        <li key={'characteristic' + index}>{item.trim()}</li>
      ));
    }



    return (
        <> 
        <div  className="drawer__item-modules-img">
			<img className='main' onClick={(e) => growImage(e) }  src={module.img} alt="main" />
			<div className="module__quantity">{module.quantity}</div>
			<div className="module__price-SP">{module.quantity * module.price}$</div>

			<img onClick={ () => setInformationModal(!informationModal) } className='more-information' src={process.env.PUBLIC_URL + '/img/more-information-for-module.svg'} alt="more information" />		

	    </div>

        <div onClick={ () => setInformationModal(!informationModal) } className={informationModal ? 
            "drawer__item-modules-more-information modal__wr d-flex a-i-center j-c-center active"
             : "drawer__item-modules-more-information modal__wr d-flex a-i-center j-c-center"
             }>
            <div onClick={(e) => e.stopPropagation() } className="modal__body">

              <div onClick={ () => setInformationModal(!informationModal) }  className="modal__close"></div>
                
                <h4>{module.title}</h4>
                <ul className=''>
								{characteristic}
				</ul>

                <div className="module__characteristic-selected">


               
      {loading ? (
        <p>Завантаження...</p>
      ) : error ? (
        <p>Виникла помилка: {error}</p>
      ) : 
      
          results.map((result, index) => (
            
            <div className="module__selected-item">
            <h3>{result?.attributes?.titleForSelectedType}</h3>
            
            
            <h4>
  {(() => {

    const currentIndex = module?.submodules.find((item) => item.submodule === result?.id);

    const parts = result?.attributes?.hooks.split(';');
    return  parts[currentIndex.currentIndex];
  })()}

</h4>




            <div className="module__selected-item-img">
                    <img onClick={(e) => growImage(e) }  src="http://localhost:1337/uploads/05_min_5bfdba1c4b.jpg" alt="selected img" />
            </div>
              </div>
          )
       
      )}
    







                  



                </div>


            </div>
        </div>

        </>
    );
}
