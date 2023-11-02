import React, {useState} from 'react';
import './profile.scss';
import {logOut} from '../../Redux/loginReducer';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Card from '../../Components/Card';
import {Link} from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { Helmet } from 'react-helmet-async';
import useFetch from '../../Hooks/useFetch';


function Profile({text}) {

	const canonicalUrl = window.location.href;
	const languageInformation = useSelector(state => state.language.language);

	const [data, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [paginationData, setPaginationData] = React.useState([]);
	
	const [avatarPreview, setAvatarPreview] = useState(null);
	const [sucssesModal,setSucssesModal] = React.useState(false);
	const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
	const [newPathAvatar, setNewPathAvatar] = useState('');

	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [changePasswordError, setChangePasswordError] = useState(false);
	const [loginInvalid,setLoginIvalid] = React.useState(false);
	const [currentPage, setCurrentPage] = React.useState(1);
	const {data: seo, loading: seoLoading, error: seoError}= useFetch(process.env.REACT_APP_API_URL+`/seos?locale=${languageInformation.language}&filters[route]=profile&populate=*`);

	const fetchProducts = async (type) => {

		try {
			const response = await fetch(
			  `${process.env.REACT_APP_API_URL}/products?populate=*&filters[UserAccount]=true&pagination[page]=${currentPage}&pagination[pageSize]=9&sort=createdAt:desc`,
			  {
				 headers: {
					Authorization: 'Bearer ' + process.env.REACT_APP_API_TOKEN,
				 },
			  }
			);
			
			if (!response.ok) {
			  // Обробка помилок, якщо статус відповіді не "200 OK"
			  throw new Error('Request failed with status ' + response.status);
			}
		 
			const data = await response.json();
			const dataRes = data.data;
		 
			if (currentPage > 1) {
			  // Якщо ми наступні сторінки, додаємо нові продукти до попереднього стану
			  setProducts((prevProducts) => [...prevProducts, ...dataRes]);
			} else {
			  // Якщо ми на першій сторінці, встановлюємо отримані продукти без змішування з попередніми
			  setProducts(dataRes);
			}
		 
			setPaginationData(data);
			setLoading(false);
		 
		 } catch (error) {
			setError(error);
			setLoading(false);
		 }
		}		 


		React.useEffect(() => {
			fetchProducts('pagination');
		 }, [currentPage]);


  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clickMoreProduct = () => {
	//setCurrentPaginationPage(currentPage + 1);
	setCurrentPage((prev)=>(prev + 1));
 }


	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [profileData, setProfileData] = React.useState({});
	const [currentOrders, setcurrentOrders] = React.useState([]);

	const profileId = useSelector(state => state.login.login);
	
		const [activeTab, setActiveTab] = useState(1);
	 
		const handleTabClick = (tabNumber) => {
		  setActiveTab(tabNumber);
		};


		

		
	const handleInputChange = (event) => {
		const { id, value } = event.target;
		setProfileData((prevData) => ({
			...prevData,
			[id]: value,
		}));
	};

	
	const fetchData = async () => {

		try {
			const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${profileId[0].profileId}?populate=*`,
			 
			{
				headers: {
					Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
				 },
			});
			
		
			setProfileData(response.data);
			
			// Перенаправлення на захищену сторінку або виконання інших дій
			// ...
		 } catch (error) {
			// Обробка помилок аутентифікації
			console.log(error);
		 }		
	 };


	 const putProfile = async () => {

		try {
			const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/${profileId[0].profileId}?populate=*`,
			 {
				country: profileData.country,
				region: profileData.region,
				zipCode:  profileData.zipCode,
				adress:  profileData.adress,
				city: profileData.city,
			 },
			{
				headers: {
					Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
				 },
			});
			
			setSucssesModal(true);

			setTimeout(()=>{
				setSucssesModal(false);
			},1500);
			//setProfileData(response.data);

			// Перенаправлення на захищену сторінку або виконання інших дій
			// ...
		 } catch (error) {
			// Обробка помилок аутентифікації
			console.log(error);
		 }		
	 };



	 const putMainInformation = async () => {

		try {
			const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/${profileId[0].profileId}?populate=*`,
			 {
				username: profileData.username,	
				lastName: profileData.lastName,
				email: profileData.email,
				phone: profileData.phone,
				companyName: profileData.companyName,
			 },
			{
				headers: {
					Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
				 },
			});
			
			setSucssesModal(true);

			setTimeout(()=>{
				setSucssesModal(false);
			},1500);
			//setProfileData(response.data);

			// Перенаправлення на захищену сторінку або виконання інших дій
			// ...
		 } catch (error) {
			// Обробка помилок аутентифікації
			console.log(error);
		 }		
	 };



	 const putPassword = async (currentPassword,newPassword,confirmPassword) => {

		if (
			(currentPassword.length < 6 || newPassword.length < 6 || confirmPassword.length < 6) ||
			(newPassword !== confirmPassword)
		 ) {

			setChangePasswordError(true);
			console.log('invalid password');


		}else{

			setChangePasswordError(false);
	
			try {
				const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/change-password`,
				 {
					currentPassword: currentPassword,
					password: newPassword,
					passwordConfirmation: confirmPassword,	
				 },
				{
					headers: {
						Authorization: "Bearer " + profileId[0].jwt,
					 },
				});
				
				setLoginIvalid(false);
				setSucssesModal(true);
	
				setTimeout(()=>{
					setSucssesModal(false);
				},1500);
	

				setCurrentPassword(newPassword);
				setNewPassword('');
				setConfirmPassword('');
		
			 } catch (error) {
				// Обробка помилок аутентифікації
				console.log(error);
				setLoginIvalid(true);

				setTimeout(()=>{
					setLoginIvalid(false);
				}, 1500);
			 }


		}
	 };



	 const updateAvatar = async () => {
		if (selectedAvatarFile) {

			

		  try {
			 const formData = new FormData();
			 formData.append('files', selectedAvatarFile);
			 formData.append('refId', profileId[0].profileId);
			 formData.append('ref', 'plugin::users-permissions.user');
			 formData.append('field', 'avatar');
			 

			 const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/upload?populate=*`,
				formData
				
				,
				{
				  headers: {
					 Authorization: 'Bearer ' + process.env.REACT_APP_API_TOKEN,
					 'Content-Type': 'multipart/form-data',
				  },
				}
			 );
	 
			 
			 setSucssesModal(true);

		 	setTimeout(()=>{
		 		setSucssesModal(false);
		 	},1500);
		 	
				setNewPathAvatar(response.data[0].url);
			//  newPathAvatar

			 // Тут повинна бути відповідь з сервера, де буде URL зміненої картинки.
	 
		  } catch (error) {
			 // Обробка помилок
			 console.log(error);
		  }
		} else {
		  console.log('Файл не обрано.');
		}
	 };
	 
	 React.useEffect(()=>{
		fetchData();
	 }, []);

	

	 const ChangeAvatar = (e) => {
		handleAvatarChange(e);
		setSelectedAvatarFile(e.target.files[0])
	 }



	const buttonLogOut = () => {
			dispatch(logOut({}));
			navigate('/', { replace: true });
	}

	const redirectNoLogIn = () => {
		if(profileId.length === 0){
			navigate('/login', { replace: true });
		}
	}

	React.useEffect(()=>{
		redirectNoLogIn();
	}, [profileId]);


	const ordersData = async () =>{
		

		try {
			const responses = await Promise.all(
			  profileData.orders.map(el =>
				 axios.get(`${process.env.REACT_APP_API_URL}/products/${el.id}?populate=*`, {
					headers: {
					  Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
					}
				 })
			  )
			);
 
			const ordersData = responses.map(response => response.data.data);
			setcurrentOrders(ordersData);

			

		 } catch (err) {
			// Обробка помилки
		 }
}
		React.useEffect(()=>{
			ordersData();
		}, [profileData]);


	


	return (

		<div className='profile content'>

		<Helmet>
        <title>{seo[0]?.attributes?.title}</title>
		  <meta property="og:title" content={seo[0]?.attributes?.title} />
        <meta name="description" content={seo[0]?.attributes?.description} />
		  <meta property="og:description" content={seo[0]?.attributes?.description}  />
        <meta name="keywords" content={seo[0]?.attributes?.keywords}  />
		  <link rel="canonical" href={canonicalUrl} />      
		  <meta name="Publisher" content="https://shadeko.eu/" />		 	
      </Helmet>

			<div className="profile__navigation">

			<div className="profile__logo">
			<img
  src={
    newPathAvatar
      ? process.env.REACT_APP_IMG + newPathAvatar
      : profileData?.avatar?.url
      ? process.env.REACT_APP_IMG + profileData.avatar.url
      : process.env.PUBLIC_URL + '/img/profile-default.jpg'
  }
  alt="logo"
  className="main"
/>
			</div>

			<p className='profile__greeting'>{text[0]?.attributes?.profileGreeting} {profileData?.username}!</p>

			<div className="profile__tabs">




			<button
          className={activeTab === 1 ? 'active' : ''}
          onClick={() => handleTabClick(1)}
        >
          {text[0]?.attributes?.profileTextTab1}
        </button>



        <button
          className={activeTab === 2 ? 'active' : ''}
          onClick={() => handleTabClick(2)}
        >
          {text[0]?.attributes?.profileTextTab2}
        </button>


        <button
          className={activeTab === 3 ? 'active' : ''}
          onClick={() => handleTabClick(3)}
        >
			{text[0]?.attributes?.profileTextTab3}
        </button>



        <button
          className={activeTab === 4 ? 'active' : ''}
          onClick={() => handleTabClick(4)}
        >
          {text[0]?.attributes?.profileTextTab4}
        </button>

			<button onClick={()=>{buttonLogOut()}}>{text[0]?.attributes?.profileTextTab5}</button>

			</div>

			</div>


			<div className="profile__body">

			{activeTab === 1 && (
  <>
    <div className='profile__net'>
      {error ? (
        <p>Помилка на сервері</p>
      ) : loading ? (
        <>
          <Skeleton className="custom-skeleton" />
          <Skeleton className="custom-skeleton" />
          <Skeleton className="custom-skeleton" />
          <Skeleton className="custom-skeleton" />
          <Skeleton className="custom-skeleton" />
          <Skeleton className="custom-skeleton" />
          <Skeleton className="custom-skeleton" />
        </>
      ) : data.length === 0 ? (
        <p>Нічого не знайдено</p>
      ) : (
        data.map((el) => (
          <Card 
			 key={el.id + el.attributes.title + el.id} 
			 product={el} 
			 type='catalog' 
			 profile='true'
			 addCart={text[0]?.attributes?.buttonAddToCart}
			 addFavorite={text[0]?.attributes?.buttonAddToFavorite}
			 deleteFavorite={text[0]?.attributes?.deleteFavorite}
			  />
        ))
      )}
    </div>

	 <div className='d-flex j-c-center w100'>


	 {(paginationData?.meta?.pagination?.pageCount !== 1 ||  paginationData?.meta?.pagination?.pageCount === 0) && (
 
 <button disabled={paginationData?.meta?.pagination?.pageCount === currentPage ? true : false} onClick={()=>{clickMoreProduct()}} className='product__more-button'>Product more</button>
 )}


	 </div>
  </>
)}





       			{activeTab === 2 && <div className={currentOrders.length === 0 ? 'profile__orders-empty': 'profile__net'}>

					 {currentOrders.length === 0 ? (
  <div className='orders-empty'>


<img
              src={process.env.PUBLIC_URL + '/img/orders-empty.svg'}
              alt="orders"
              className="main"
            />
	<Link to='/catalog'>{text[0]?.attributes?.profileOrdersEmpty}</Link>
	</div>
) : (
  currentOrders.map((el) => (
    <Card 
	 key={el.id + el.attributes.title + el.id} 
	 product={el} 
	 type='catalog' 
	 profile='true'
	 addCart={text[0]?.attributes?.buttonAddToCart}
	 addFavorite={text[0]?.attributes?.buttonAddToFavorite}
	 deleteFavorite={text[0]?.attributes?.deleteFavorite}
	  />
  ))
)}
						</div>}


      			{activeTab === 3 && <div className='a-i-start profile__ardess'>


						
					<section>
						<label htmlFor="adminCountry">{text[0]?.attributes?.checkoutCountry}</label>
						<input onChange={handleInputChange} id='country' value={profileData ? profileData.country : ''} type="text" />
					</section>

					<section>
						<label htmlFor="adminCity">{text[0]?.attributes?.checkoutCity}</label>
						<input onChange={handleInputChange} id='city' value={profileData ? profileData.city : ''}  type="text" />
					</section>


					<section>
						<label htmlFor="adminRegion">{text[0]?.attributes?.checkoutRegion}</label>
						<input onChange={handleInputChange} id='region' value={profileData ? profileData.region : ''}  type="text" />
					</section>

					<section>
						<label htmlFor="adminZipCode">{text[0]?.attributes?.checkoutZIPcode}</label>
						<input onChange={handleInputChange} id='zipCode' value={profileData ? profileData.zipCode : ''}  type="text" />
					</section>

					<section>
						<label htmlFor="adminAdress">{text[0]?.attributes?.checkoutAdress}</label>
						<input onChange={handleInputChange} id='adress' value={profileData ? profileData.adress : ''}  type="text" />
					</section>


					<button onClick={()=>{putProfile()}} className="account__details-replace">{text[0]?.attributes?.profileSaveButton}</button>


						</div>}


       			{activeTab === 4 && <div>



					<section className='d-flex a-i-start account-names w100'>

						<div className='account__names-item'>
							<label htmlFor="firstNameAccount">{text[0]?.attributes?.checkoutFirstName}</label>
							<input onChange={handleInputChange} id='username' value={profileData ? profileData.username : ''}  type="text" />
						</div>


						<div className='account__names-item'>
						<label htmlFor="lastNameAccount">{text[0]?.attributes?.checkoutLastName}</label>
							<input onChange={handleInputChange} id='lastName' value={profileData ? profileData.lastName : ''}  type="text" />
						</div>
					
					</section>
		

					<section>
						<label htmlFor="emailAdressAccount">{text[0]?.attributes?.checkoutEmail}</label>
						<input onChange={handleInputChange} id='email' value={profileData ? profileData.email : ''}  type="text" />
					</section>

					<section>
						<label htmlFor="phoneAccount">{text[0]?.attributes?.checkoutPhone}</label>
						<input onChange={handleInputChange} id='phone' value={profileData ? profileData.phone : ''}  type="text" />
					</section>

					<section>
						<label htmlFor="companyNameAccount">{text[0]?.attributes?.checkoutCompanyName}</label>
						<input onChange={handleInputChange} id='companyName' value={profileData ? profileData.companyName : ''}  type="text" />
					</section>

					<button onClick={()=>{putMainInformation()}} className="account__details-replace mb">{text[0]?.attributes?.profileSaveButton}</button>

				
					<section>

						<label htmlFor="currentPasswordAccount">{text[0]?.attributes?.profileCurrentPassword}</label>
						<input value={currentPassword} onChange={(e)=>{setCurrentPassword(e.target.value)}}  id='currentPasswordAccount' type="text" />
					</section>


					<section>
						<label  htmlFor="newPasswordAccount">{text[0]?.attributes?.profileNewPassword}</label>
						<input value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} id='newPasswordAccount' type="text" />
					</section>

					<section>
						<label  htmlFor="confirmNewPasswordAccount">{text[0]?.attributes?.profileConfirmNewPassword}</label>
						<input value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} id='confirmNewPasswordAccount' type="text" />
					</section>


					<button onClick={()=>{putPassword(currentPassword,newPassword,confirmPassword)}} className="account__details-replace">{text[0]?.attributes?.profileSaveButton}</button>

					<span className={changePasswordError ? "changePasswordError active" : 'changePasswordError'}>{text[0]?.attributes?.profilePasswordLengthShort}</span>
					

						<label className='avatar__title' htmlFor="avatar">{text[0]?.attributes?.profileChangeAvatar}</label>
				

						<section className='avatar__wr'>
          {avatarPreview ? (
            <img src={avatarPreview} alt="Preview" className="main" />
          ) : (
            <img
              src={
                profileData?.avatar?.url
                  ? process.env.REACT_APP_IMG + profileData?.avatar?.url
                  : process.env.PUBLIC_URL + '/img/profile-default.jpg'
              }
              alt="logo"
              className="main"
            />
          )}

			
          <input type="file" onChange={ChangeAvatar} />

        </section>

		  <button onClick={updateAvatar} className="account__details-replace">{text[0]?.attributes?.profileSaveButton}</button>

						</div>}


			</div>
			
			<div className={sucssesModal === true ? "logIn__invalid active" : 'logIn__invalid'}>
				<img src={process.env.PUBLIC_URL + '/img/success-admin-panel.svg'} alt="icon" />
				<p>{text[0]?.attributes?.profileSuccessfulChanges}</p>
			</div>

			<div className={loginInvalid === true ? "logIn__invalid active" : 'logIn__invalid'}>
				<img src={process.env.PUBLIC_URL + '/img/error-logIn.svg'} alt="icon" />
				<p>{text[0]?.attributes?.profileInvalidChanges}</p>
			</div>

		</div>
	);
}

export default Profile;