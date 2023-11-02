import './submodules.scss';
import React from 'react';
import useFetch from '../../Hooks/useFetch';

function Submodules({submodule, updateElement}) {



    const { data, loading, error} = useFetch(`${process.env.REACT_APP_API_URL}/submodules/${submodule.id}?populate=*`);

    const [open,setOpen] = React.useState(false);
    const [currentIndex,setCurrentIndex] = React.useState(0);

    
    const separator = ";"; // Роздільник
    
    

    let hooks;

    if (submodule.attributes?.hooks){
        hooks = submodule.attributes?.hooks.split(separator);
    }
   
    return (
        <div className='submodules'>

            <button onClick={()=> setOpen(!open)} className='submodules__button'>{submodule.attributes.buttonText}</button>


            <div onClick={()=>{setOpen(!open)}} className={open ? "modal__wr active" : 'modal__wr'}>
                <div onClick={(e) => e.stopPropagation()} className="modal__body">

                         <div onClick={()=>{setOpen(!open)}} className="modal__close"></div>

                         <h6>{submodule.attributes.title}</h6>

                         <div className="submodules__net">

                         {
                            data?.attributes?.hooksImg?.data?.map((elements,index)=>(
                                    <div key={'submodules-hooks'+elements.id} className="submodules__net-item">

                                    <p>{Array.isArray(hooks) ? hooks[index] : ''}</p>


                                    <div className={currentIndex === index ? 'submodules__item-img active' : 'submodules__item-img'}>

                                    <img 	
                                    className={currentIndex === index ? 'active' : ''}
				                    src={process.env.REACT_APP_IMG+elements?.attributes?.url} 
				                    alt=" "
				                    onClick={ () => 
                                        {
                                        setCurrentIndex(index) 
                                        updateElement(submodule?.id, index);
                                        }}       
				                     />

                                    </div>

                                     </div>
                            ))
                         }

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Submodules;