
import './orderInformation.scss';
import React from 'react';
import useFetch from '../../Hooks/useFetch';
import ShoppingCartModule from '../../Components/ShoppingCartModule/';
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import PDFGenerator from '../../Components/PDFGenerator';
import { useSelector } from 'react-redux';

function OrderInformation() {

    const languageInformation = useSelector(state => state.language.language);

    const { data: text, loading: loadingText, error: errorText } = useFetch(`${process.env.REACT_APP_API_URL}/Text-for-pdfs?locale=${languageInformation.language}&populate=*`);


    const [trackNumber, setTrackNumber] = React.useState('');
    const [trackValue,setTrackValue] = React.useState('');



    const [closeLightbox, setCloseLightbox] = React.useState(false);
	const [lightboxSrc,setLightboxSrc] = React.useState('');

    const growImage = (e) => {
        setLightboxSrc(e.target.src);
        setCloseLightbox(!closeLightbox);	
    }


    const closeGalery = () => {
        setLightboxSrc('');
        setCloseLightbox(!closeLightbox);
    }

    const {data, loading, error} = useFetch(process.env.REACT_APP_API_URL+`/unpaid-orders?filters[timeStamp][$eqi]=${trackNumber}&populate=*`);

    
    const addTrackNumber = () => {
        setTrackNumber(trackValue);
    }


    let statusObj;

    if(data[0]?.attributes?.status === 'Pending maneger review'){

        statusObj = {
            text: text[0]?.attributes?.statusOrderOption1,
            color: 'redC',
        }

    }else if(data[0]?.attributes?.status === 'Processing'){

        statusObj = {
            text: text[0]?.attributes?.statusOrderOption2,
            color: 'yellowC',
        }


    }else if(data[0]?.attributes?.status === 'Shipped'){

        statusObj = {
            text: text[0]?.attributes?.statusOrderOption3,
            color: 'yellowC',
        }
    
    }else if(data[0]?.attributes?.status === 'Delivered'){

        statusObj = {
            text: text[0]?.attributes?.statusOrderOption4,
            color: 'greenC',
        }
     
    }else if(data[0]?.attributes?.status === 'Canceled'){

        statusObj = {
            text: text[0]?.attributes?.statusOrderOption5,
            color: 'redC',
        } 

    }else if(data[0]?.attributes?.status === 'Return requested'){

        statusObj = {
            text: text[0]?.attributes?.statusOrderOption6,
            color: 'yellowC',
        } 

    }else if(data[0]?.attributes?.status === 'Return complited'){

        statusObj = {
            text: text[0]?.attributes?.statusOrderOption7,
            color: 'greenC',
        }


    }else{
        statusObj = {
            text: 'Undefined',
            color: 'redC',
        }
    }


    const [products] = React.useState([
        { name: 'Продукт 1', price: 100 },
        { name: 'Продукт 2', price: 200 },
        { name: 'Продукт 3', price: 300 },
      ]);
    
      const [showPDF, setShowPDF] = React.useState(false);
    
      const handleGeneratePDF = () => {
        setShowPDF(true);
      };


    return (

        <div className='content orderInformation'>
            
            <h3>{text[0]?.attributes?.orderTitle}</h3>

            <div className="orderInformation__form d-flex a-i-center j-c-start">

                <input value={trackValue} onChange={ (e)=> setTrackValue(e.target.value)} type="text" placeholder='0000 0000 0000 0000' />

                <button onClick={() => addTrackNumber()}>{text[0]?.attributes?.orderButtonConfirmTrackNumber}</button>
            </div>


            {
              !data[0] && 
              <div className="orderInformation__notApplied">
                    <img  src={process.env.PUBLIC_URL + '/img/notApplied.svg'} alt="notApplied" />
              </div>
            }
             
{
            data[0] &&
            <div className="orderInformation__net">

                  <div className="orderInformation__net-item">

                     <section>
                        <p>{text[0]?.attributes?.allPriceOrder}</p>
                        <span>{data[0]?.attributes?.totalPrice}$</span>
                    </section>

                     <section>
                        <p>{text[0]?.attributes?.promocode}</p>
                        <span>{data[0]?.attributes?.promocodePercent}%</span>
                    </section>  

                    <section>
                        <p>{text[0]?.attributes?.typeOrder}</p>

                        {
                            data[0]?.attributes?.type === 'Not paid' ? 
                            <span>{text[0]?.attributes?.typeOrderOption1}</span>
                            :
                            <span>{text[0]?.attributes?.typeOrderOption2}</span>
                        }
                       
                    </section>  

                    <section>
                        <p>{text[0]?.attributes?.statusOrder}</p>
                        <span className={statusObj.color}>{statusObj.text.toString()}</span>
                    </section> 

                    <section>
                        <p>{text[0]?.attributes?.commentOrder}</p>
                        <span>{data[0]?.attributes?.commentForOrder.length > 0 ? data[0]?.attributes?.commentForOrder : text[0]?.attributes?.commentOrderEmpty}</span>
                    </section> 
                    
                    <section>
                   
                     { 
                     <PDFGenerator
                      products={data[0]?.attributes?.productsDetails}
                      totalPrice = {data[0]?.attributes?.totalPrice}
                      promocodePercent = {data[0]?.attributes?.promocodePercent}
                      type={data[0]?.attributes?.type}
                       />}
                    </section>



{
    data[0]?.attributes?.productsDetails.map((item)=>(
        <>
        <div key={'orderInformation'+item.id} className="orderInformation__product">

        <div className="orderInformation__product-img">
           <img onClick={(e) =>  growImage(e)}  src={process.env.REACT_APP_IMG + item?.img} alt="photo" />
        </div>
        


        <div className="orderInformation__product-text">
            <h4>{item?.title}</h4>

            <section>
                <p>{text[0]?.attributes?.Quantity}</p>
                <span>{item?.quantity}</span>
            </section>


{
    item?.quantity !== 1 &&

            <section>
                <p>{text[0]?.attributes?.priceSingle}</p>
                <span>{item?.price}$</span>

                {/* <span>{item?.stockQuantity === '0' && +item?.price / 2 }$</span> */}

            </section>
}

            


            <section>
                <p>{text[0]?.attributes?.allPriceSingle}</p>
                <span>{+item?.quantity * +item?.price}$</span>
                {/* <span>{item?.stockQuantity === '0' && +item?.price / 2+'$' }</span> */}
            </section>


{
    item?.color?.name && 

    <section>
        <p>{text[0]?.attributes?.Color}</p>

        <div className='d-flex a-i-center color-wr'>
             <span>{item?.color?.name}</span>
             <img onClick={(e) =>  growImage(e)}  src={item?.color?.img} alt="color" />
        </div>

    </section>

}
           
{
    item?.material?.name && 
        <section>
            <p>{text[0]?.attributes?.Material}</p>

        <div className='d-flex a-i-center material-wr'>
            <span>{item?.material?.name}</span>
            <img onClick={(e) =>  growImage(e)}  src={item?.material?.img} alt="material" />
        </div>
            

        </section>
}

        {
            item?.configurations.map((configuration)=>(
                <section key={'configurationOrder'+configuration.id}>
                    <p>{configuration.title}</p>
                    <span>{configuration.value}</span>
                </section>
            ))
        }
        
        

        </div>
    </div>
     <div className="drawer__item-modules">
     {
         item?.modules.map((module) => (
             <ShoppingCartModule 
             key={'drawerModules'+module.id}
             module={module}
             growImage={growImage}

          
             />
             
         ))
     }

{
			closeLightbox && 

			<Lightbox 
				image={lightboxSrc}
				onClose={closeGalery}	
			 />

		}

</div>
</>


     

    ))
}


                  </div>

            </div>
}

        </div>
    );
}

export default OrderInformation;