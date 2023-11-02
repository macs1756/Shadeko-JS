import React from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { logIn } from '../../Redux/loginReducer';
import { Helmet } from 'react-helmet-async';
import useFetch from '../../Hooks/useFetch';

function Login({text}) {

	
	const canonicalUrl = window.location.href;
	const languageInformation = useSelector(state => state.language.language);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [userLogin, setUserLogin]  = React.useState('');
	const [userPassword, setUserPassword]  = React.useState('');

	const [validPassword, setValidPassword]  = React.useState(false);
	const [validLogin, setValidLogin]  = React.useState(false);
	const [buttonDisabled, setButtonDisabled] = React.useState(false);

	const [rememberMe, setRememberMe] = React.useState(false);
	const [loginInvalid,setLoginIvalid] = React.useState(false);
	const {data: seo, loading: seoLoading, error: seoError}= useFetch(process.env.REACT_APP_API_URL+`/seos?locale=${languageInformation.language}&filters[route]=login&populate=*`);

	const fetchData = async (login,pass) => {
		setButtonDisabled(!buttonDisabled);

		try {
			const responses = await axios.post(`${process.env.REACT_APP_API_URL}/auth/local`,
			 {
			  identifier: login,
			  password: pass,
			},
			{
				headers: {
					Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
				 },
			});
			

			const loginData = {
				login,
				pass
			 };
		  
			 if (rememberMe) {
				// Отримуємо поточні записи з кукісів (якщо вони є)
				const existingData = getSavedLoginData();
		  
				// Додаємо новий запис до існуючих даних
				const newData = [...existingData, loginData];
		  
				// Зберігаємо оновлені дані у кукісах
				document.cookie = `loginData=${encodeURIComponent(JSON.stringify(newData))}; expires=Sat, 31 Dec 9999 23:59:59 GMT;`;
			 }
			// Успішна аутентифікація, отримання JWT-токена
			const id = responses.data.user.id;		
			const jwt = responses.data.jwt;		

			dispatch(logIn({
				profileId: id,
				jwt: jwt
			}));



			setButtonDisabled(false);
			navigate('/profile', { replace: true });

			// Перенаправлення на захищену сторінку або виконання інших дій
			// ...
		 } catch (error) {
			// Обробка помилок аутентифікації
			setButtonDisabled(false);

			if (error.response !== undefined && error.response !== null && error.response.status === 400) {
				setLoginIvalid(true);
				
			 }
			 
			}

			setTimeout(()=>{
				setLoginIvalid(false);
			}, 2000)
	 };

	 

	const buttonLogIn = () => {
		if (userLogin.length === 0) {
		  setValidLogin(true);
		} else {
		  setValidLogin(false);
		}
	 
		if (userPassword.length === 0) {
		  setValidPassword(true);
		} else {
		  setValidPassword(false);
		}

		if(userLogin.length !== 0 && userPassword.length !== 0){
			fetchData(userLogin,userPassword);
		}
	 
	 };

	 // Отримати збережені дані для входу з кукісів
function getSavedLoginData() {
	const cookies = document.cookie.split(';');
 
	for (let i = 0; i < cookies.length; i++) {
	  const cookie = cookies[i].trim();
	  if (cookie.startsWith('loginData=')) {
		 const encodedData = cookie.substring('loginData='.length);
		 const decodedData = decodeURIComponent(encodedData);
		 return JSON.parse(decodedData);
	  }
	}
 
	return [];
 }
 
 // Перевірка наявності збережених даних при завантаженні сторінки
 function checkLoginStatus() {
	const savedData = getSavedLoginData();
 
	if (savedData.length > 0) {
	  // Використовуйте дані для входу, наприклад, автоматично заповнюйте форму входу
	  const lastSavedData = savedData[savedData.length - 1];
	}
 }
 
 // Виклик функцій для перевірки наявності збережених даних при завантаженні сторінки
 checkLoginStatus();
	 

	
	return (
		<div className='login w100 d-flex a-i-c j-c-center content'>


		<Helmet>
        <title>{seo[0]?.attributes?.title}</title>
		  <meta property="og:title" content={seo[0]?.attributes?.title} />

        <meta name="description" content={seo[0]?.attributes?.description} />
		  <meta property="og:description" content={seo[0]?.attributes?.description}  />

        <meta name="keywords" content={seo[0]?.attributes?.keywords}  />

		  <link rel="canonical" href={canonicalUrl} />      
		  <meta name="Publisher" content="https://shadeko.eu/" />		 	
      </Helmet>

			<div className="login__body">

			<div className="login__main">

				<div className="login__main-first d-flex a-i-center j-c-space">
					<h2 className='upper'>{text[0]?.attributes?.logInTitle}</h2>
					<Link className='login__register' to='/register'>{text[0]?.attributes?.logInButtonRegister}</Link>

				</div>

				<input className={validLogin ? 'invalid' : ''} value={userLogin} onChange={(e)=>{setUserLogin(e.target.value)}} type="email" placeholder={text[0]?.attributes?.logInPlaceholderEmail} />


				<input className={validPassword ? 'invalid' : ''} value={userPassword} onChange={(e)=>{setUserPassword(e.target.value)}} type="password" placeholder={text[0]?.attributes?.logInPlaceholderPassword} />


				<div className="login__check d-flex a-i-center j-c-space">

					<div className='d-flex a-i-center login__check-input'>
						<input onChange={()=>{setRememberMe(!rememberMe)}} type="checkbox" />
						<span>{text[0]?.attributes?.logInRemember}</span>
					</div>

					<button disabled={buttonDisabled} onClick={()=>{buttonLogIn()}} className='login__check-button'>{text[0]?.attributes?.logInButtonLogIn}</button>
					
				</div>


			</div>


			</div>

			<div className={loginInvalid === true ? "logIn__invalid active" : 'logIn__invalid'}>
				<img src={process.env.PUBLIC_URL + '/img/error-logIn.svg'} alt="icon" />
				<p>{text[0]?.attributes?.logInDataInvalid}</p>
			</div>

		</div>
	);
}

export default Login;