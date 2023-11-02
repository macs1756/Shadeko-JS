import React,{useState} from 'react';
import HeaderListItem from '../HeaderListItem';
import HeaderListMobile from '../HeaderListMobile';
import './header.scss';
import {Link} from 'react-router-dom';
import Drawer from '../Drawer';
import useFetch from '../../Hooks/useFetch';
import { useSelector, useDispatch} from 'react-redux';
import {changeLanguage} from '../../Redux/languageReducer';
import Skeleton from 'react-loading-skeleton';


function Header() {

	
	

	const languageInformation = useSelector(state => state.language.language);
	const { data: text, loading, error } = useFetch(process.env.REACT_APP_API_URL + `/ells?locale=${languageInformation.language}&populate=*`);

	
	const [languageOpen, setLanguageOpen] = useState(false);
	const [languageText, setLanguageText] = useState(languageInformation.language ? (languageInformation.language === 'uk-UA' ? 'UA' : languageInformation.language) : 'eng');

	const [burgerOpen, setBurgerOpen] = useState(false);
	const [searchBody,setSearchBody] = React.useState('');

	const dispatch = useDispatch();

	const token = useSelector(state => state.login.login);

	function replaceTextLanguage(e){
		setLanguageOpen(!languageOpen);
		setLanguageText(e.target.innerText);
	}


		const СhangeLanguageHeader = (e,route,language) => {

			replaceTextLanguage(e);

			dispatch(changeLanguage({
				route: route,
				language: language,
				}));
		}

	const {data:categories, loading: loadingCategories, errorCategories} = useFetch(process.env.REACT_APP_API_URL+`/categories?locale=${languageInformation.language}&populate=*`);

	

	//state drawer 
	const [drawerOpen, setDrawerOpen] = React.useState(false);

	const drawerOpenClick = (newState) => {
		setDrawerOpen(newState);
	 }




	// Випадашки в шапці
	const [activeIndex, setActiveIndex] = useState(null);
	const handleItemClick = (index) => {
	   setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
	
	};

	const handleChildItemClick = () => {
		setActiveIndex(null); // Закрити всі випадаючі списки
		setBurgerOpen(false);
	 };



	return (
		<header>

			<div className='header__first d-flex a-i-center j-c-space w100'>
		<Link to='/' className='full'>
		<img  src={process.env.PUBLIC_URL + '/img/header__logo-full.png'} alt="header__logo" />
		</Link>
				
			
				<Link to='/'>
				<img className='short' src={process.env.PUBLIC_URL + '/img/header__logo-short.png'} alt="header__logo-short" />
				</Link>

				<div className="header__search-wr">

					<div className="header__search d-flex a-i-center j-c-space">
						<input value={searchBody} onChange={(e)=>{setSearchBody(e.target.value)}} type="text" placeholder={text[0]?.attributes?.searchPlaceholder} />

						<Link to={'/search/'+searchBody} className='search__button'>{text[0]?.attributes?.searchButton}</Link>
					</div>

				</div>


			</div>

			<div className="header__second d-flex a-i-center j-c-space">


				<div className="header__language-wr">

<div className={languageOpen ? 'header__language active' : 'header__language'} >

	<div onClick={()=>{setLanguageOpen(!languageOpen)}}  className="header__language-title d-flex a-i-center">
			<p>{languageText}</p>
			<img src={process.env.PUBLIC_URL + '/img/language__arrow.svg'} alt="arrow" />
	</div>

	<ul className="header__language-body">

			<li onClick={(e)=>{СhangeLanguageHeader(e,'','en')}}><Link to='/'>ENG</Link></li>
			<li onClick={(e)=>{СhangeLanguageHeader(e,'uk/','uk-UA')}}><Link to='/'>UA</Link></li>
			<li onClick={(e)=>{СhangeLanguageHeader(e,'cs/','cs')}}><Link to='/'>CS</Link></li>
		
	</ul>
</div>

					


					
				</div>

				<li className="header__list d-flex a-i-center">


			 {	
				errorCategories ? "error on server" : (
				loadingCategories ? 
				<>
				<div className="skeleton-header"><Skeleton /></div>
				<div className="skeleton-header"><Skeleton /></div>
				<div className="skeleton-header"><Skeleton /></div>
				<div className="skeleton-header"><Skeleton /></div>
				<div className="skeleton-header"><Skeleton /></div>
				<div className="skeleton-header"><Skeleton /></div>
				</>
				 :
				categories.map((el,index) =>
				<HeaderListItem
				title={el}
				languageInformation={languageInformation}
				key={el.id}
				 isActive={activeIndex === index}
				  onItemClick={() => handleItemClick(index)}
				  onChildItemClick={handleChildItemClick}
				  />
				)
				)
} 

				</li>

				<div className="header__nav d-flex a-i-center">

					<Link to='/favorites'>
					<img src={process.env.PUBLIC_URL + '/img/favorite.svg'} alt="favorite" />
					</Link>

					<Link to={token.length > 0 ? '/profile' : '/login'}>
					<img src={process.env.PUBLIC_URL + '/img/account.svg'} alt="account" />
					</Link>

					<img onClick={drawerOpenClick} src={process.env.PUBLIC_URL + '/img/drawer.svg'} alt="drawer" />
					
				</div>

			</div>

			<div  className="header__mobile d-flex w100 a-i-center j-c-space">

				<div onClick={()=>{setBurgerOpen(!burgerOpen)}}  className={burgerOpen ? 'header__burger active' : 'header__burger'}><span></span></div>

				<Link to='/'>
					<img className='header__mobile-logo' src={process.env.PUBLIC_URL + '/img/header__logo-full.png'} alt="logo full" />
				</Link>
				


				<img onClick={drawerOpenClick} className='header__mobile-drawer' src={process.env.PUBLIC_URL + '/img/drawer__mobile.png'} alt="drawer" />


			</div>

			<div className={burgerOpen ? 'burger__body active' : 'burger__body'}>

				<div className="burger__body-content">

				{	
				errorCategories ? "error on server" : (
				loadingCategories ? "loading.." :
				categories.map((el,index) =>
				<HeaderListMobile
				key={el.id+index}
				title={el}
				languageInformation={languageInformation}
				isActive={activeIndex === index}
				 onItemClick={() => handleItemClick(index)}
				 onChildItemClick={handleChildItemClick}
				 />
				)
				)
} 




					

					

					 
				</div>

				<div onClick={()=>{setBurgerOpen(!burgerOpen)}} className="header__mobile-buttons d-flex a-i-center">
					<Link  to={token.length > 0 ? '/profile' : '/login'} className="header__mobile-btn">{text[0]?.attributes?.burgerButton1}</Link>
					<Link  to='/favorites' className="header__mobile-btn">{text[0]?.attributes?.burgerButton2}</Link>
				</div>

				<div className="header__mobile-social-networks d-flex a-i-center">
					<a href='/test'><img  src={process.env.PUBLIC_URL + '/img/facebook.svg'} alt="facebook" /></a>
					<a href='/test'><img  src={process.env.PUBLIC_URL + '/img/instagram.svg'} alt="instagram" /></a>
				</div>

			</div>

			<Drawer 
			onClick={drawerOpenClick}  
			drawerOpen={drawerOpen} 
			setDrawerOpen={setDrawerOpen}
			text={text ? text : []}
			 />

		</header>
	);
}

export default Header;