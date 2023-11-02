import React from 'react';
import './helpAndSupport.scss';
import useFetch from '../../Hooks/useFetch';
import {useSelector} from 'react-redux';

function HelpAndSupport() {

	const [currentIndex, setCurrentIndex] = React.useState(600);

	const languageInformation = useSelector(state => state.language.language);
	const { data: text, loading, error } = useFetch(process.env.REACT_APP_API_URL + `/storinka-oplata-ta-vidshkoduvannyas?locale=${languageInformation.language}&populate=*`);

	

	const accordeon = [
		{
			title: text[0]?.attributes?.AccordeonTitle1,
			content:  text[0]?.attributes?.AccordeonBody1,
		},
		{
			title:  text[0]?.attributes?.AccordeonTitle2,
			content: text[0]?.attributes?.AccordeonBody2,
		},
		{
			title:  text[0]?.attributes?.AccordeonTitle3,
			content: text[0]?.attributes?.AccordeonBody3,
		},
		{
			title:  text[0]?.attributes?.AccordeonTitle4,
			content: text[0]?.attributes?.AccordeonBody4,
		},
		{
			title:  text[0]?.attributes?.AccordeonTitle5,
			content: text[0]?.attributes?.AccordeonBody5,
		},
	]
	


	return (

		loading ?

		<div className="skeleton-app">
  
    <img  src={process.env.PUBLIC_URL + '/img/preloader-application.svg'} alt="preloader" />
    
    </div> :

		<div className="content">
			<div className="help">
				<h4 className='help__title'>{text[0]?.attributes?.title1}</h4>

				<p className="help__p1">{text[0]?.attributes?.firstText}</p>
		
				<h5>{text[0]?.attributes?.title2}</h5>

				<ul>
						<li>{text[0]?.attributes?.listText1}</li>
						<li>{text[0]?.attributes?.listText2}</li>
						<li>{text[0]?.attributes?.listText3}</li>
				</ul>

				<h5 className='help__questions-title'>{text[0]?.attributes?.title3}</h5>

				{
					accordeon.map((block,index)=>(

<section className={currentIndex === index ? 'accordion-item active' : 'accordion-item'}  >


<div onClick={()=> currentIndex === index ? setCurrentIndex(600) : setCurrentIndex(index)} className="accordeon__title d-flex a-i-center j-c-space w100">
	<p>{block.title}</p>
	<img  src={process.env.PUBLIC_URL + '/img/accordeon__arrow.svg'} alt="arrow" />
</div>


<div className="accordion-content">
		{block.content}
</div>


</section>
					))
				}

			</div>
		</div>
	);
}

export default HelpAndSupport;