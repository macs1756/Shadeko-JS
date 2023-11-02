import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './footer.scss';
import useFetch from '../../Hooks/useFetch';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

function Footer() {

  const languageInformation = useSelector(state => state.language.language);



  const { data, loading, error } = useFetch(process.env.REACT_APP_API_URL + `/footers?locale=${languageInformation.language}&populate=*`);

  const [restoreOpen, setRestoreOpen] = React.useState(false);

  const orderNumber = useSelector(state => state.timestamp.timestamp);


  if (error) {
    return <div>Error on server</div>;
  } else if (loading) {
    return (
     
        <div className="footer__skeleton"><Skeleton /></div>
      
    );
  } else {
    return (
      <footer>
        <div className="footer__section">
          <img className='footer__section-logo' src={process.env.PUBLIC_URL + '/img/header__logo-short.png'} alt="logo" />
        </div>

        <div className='footer__section-wr'>
          <ul className="footer__section">
            <li className="main">{data[0]?.attributes?.columnPointer1}</li>


            <li>
              
              <Link to='what-we-do'>{data[0]?.attributes?.columnBody11}</Link>
              </li>


            <li>
              <Link to='/сontact-information'>
              {data[0]?.attributes?.columnBody12}
              </Link>
              
              </li>


            <li>{data[0]?.attributes?.columnBody13}</li>
            <li>{data[0]?.attributes?.columnBody14}</li>
            <li>{data[0]?.attributes?.columnBody15}</li>
          </ul>
        </div>

        <div className='footer__section-wr'>
          <ul className="footer__section">
            <li className="main">{data[0]?.attributes?.columnPointer2}</li>
            
            <li onClick={() => setRestoreOpen(!restoreOpen)} className='underline'>{data[0]?.attributes?.columnBody21}</li>


            <li>
              <Link to='/payment-and-refunds'>{data[0]?.attributes?.columnBody22}</Link>
            </li>


            <li>{data[0]?.attributes?.columnBody23}</li>
            <li>{data[0]?.attributes?.columnBody24} </li>
          </ul>
        </div>

        <div className='footer__section-wr'>
          <ul className="footer__section">
            <li className="main">{data[0]?.attributes?.columnPointer3}</li>


            <li>
              
              <a target='_blank' href='https://www.instagram.com/shadeko.eu/'>{data[0]?.attributes?.columnBody31}</a>
              </li>


              <li>        
              <a target='_blank' href='https://wa.me/+420723816300'>{data[0]?.attributes?.columnBody32}</a>
              </li>


            <li>
              <a href='https://goo.gl/maps/4Hb4AWvicKPzcDmj6' target='_blank'>
                {data[0]?.attributes?.columnBody33}
              </a>
              

              </li>


            <li>{data[0]?.attributes?.columnBody34}</li>



          </ul>
        </div>

        <div className='footer__section-wr'>
          <ul className="footer__section">
            <li className="main">{data[0]?.attributes?.columnPointer4}</li>


            <li> 
            <Link to='/profile'>
              {data[0]?.attributes?.columnBody41}
            </Link>
              </li>

             
              


            <li>
            <Link to='/checkout'>
              {data[0]?.attributes?.columnBody42}
            </Link>
              </li>



            <li>
              <Link to='/order-information'>
              {data[0]?.attributes?.columnBody43}
              </Link>
              
              </li>


            <li>
              <Link to='/help-and-support'>
                {data[0]?.attributes?.columnBody44}
              </Link>
              
              </li>
          </ul>
        </div>

      <div onClick={() => setRestoreOpen(!restoreOpen)}  className={restoreOpen ? "modal__wr active" : "modal__wr"}>
          <div onClick={(e) => e.stopPropagation()}  className="modal__body">

          <div onClick={()=> setRestoreOpen(!restoreOpen) } className="modal__close"></div>
              
              <h6>{data[0]?.attributes?.restoreOrderNumber}</h6>
              <input 
              type="text" 
              placeholder='00000 0000 0000 00000'
              value={orderNumber.length > 0 ? orderNumber : ''}
              onChange={()=>{}}
               />
          </div>
      </div>

      </footer>
    );
  }
}

export default Footer;
