import React, {useState} from 'react';
import './register.scss';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import useFetch from '../../Hooks/useFetch';

function Register({text}) {

	const languageInformation = useSelector(state => state.language.language);
	const canonicalUrl = window.location.href;
	const [firstCheckbox, setFirstCheckbox] = useState(true);
	const [secondCheckbox, setSecondCheckbox] = useState(true);

	const [serverInvalid, setServerInvalid] = useState(false);
	const [sucssesModal, setSucssesModal] = useState(false);

	const [userName, setUserName] = useState('');
	const [lastName, setLastName] = useState('');
	const [emailForm, setEmailForm] = useState('');
	const [passwordForm, setPasswordForm] = useState('');

	const [validatorName, setValidatorName] = useState(false);
	const [validatorLastName, setValidatorLastName] = useState(false);
	const [validatorPassword, setValidatorPassword] = useState(false);
	const [validatorEmail, setValidatorEmail] = useState(false);

	const [validatorFirstCheckbox, setValidatorFirstCheckbox] = useState(false);
	const [validatorSecondCheckbox, setValidatorSecondCheckbox] = useState(false);
	const {data: seo, loading: seoLoading, error: seoError}= useFetch(process.env.REACT_APP_API_URL+`/seos?locale=${languageInformation.language}&filters[route]=register&populate=*`);


	const navigate = useNavigate();
	

	const profileId = useSelector(state => state.login.login);

	const redirectNoLogIn = () => {
		if(profileId.length > 0){
			navigate('/profile', { replace: true });
		}
	}

	React.useEffect(()=>{
		redirectNoLogIn();
	}, [profileId]);



	const postRegister = async (userName,lastName,password,email) => {

		if(firstCheckbox){
			setValidatorFirstCheckbox(false);
		}else{
			setValidatorFirstCheckbox(true);
		}

		if(secondCheckbox){
			setValidatorSecondCheckbox(false);
		}else{
			setValidatorSecondCheckbox(true);
		}

	if(userName.length < 2 ){
		setValidatorName(true);
	}else{
		setValidatorName(false);
	}

	if(lastName.length < 2 ){
		setValidatorLastName(true);
	}else{
		setValidatorLastName(false);
	}

	if(password.length < 6 ){
		setValidatorPassword(true);
	}else{
		setValidatorPassword(false);
	}

	const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

	if(!emailRegex.test(email)){
		setValidatorEmail(true);
	}else{
		setValidatorEmail(false);
	};

		
if(userName.length < 2  || lastName.length < 2 || password.length < 6 || !emailRegex.test(email) || !firstCheckbox || !secondCheckbox){

	console.log('Невалідні поля');

}else {

		try {
			const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/local/register?populate=*`,
			 {
				email: email,	
				username: userName,
				password: password,
				lastName: lastName
				
			 },
			{
				headers: {
					Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
				 },
			});
			
			setSucssesModal(true);

			setTimeout(()=>{
				navigate('/login', { replace: true });
			},1000);
	
			

			// Перенаправлення на захищену сторінку або виконання інших дій
			// ...
		 } catch (error) {
			// Обробка помилок аутентифікації

			

			setServerInvalid(true);

			setTimeout(()=>{
				setServerInvalid(false);
			},2500);

			console.log(error);

		 }		

		}
	 };



	return (
		<div className='register d-flex a-i-center j-c-center content'>

<Helmet>
        <title>{seo[0]?.attributes?.title}</title>
		  <meta property="og:title" content={seo[0]?.attributes?.title} />

        <meta name="description" content={seo[0]?.attributes?.description} />
		  <meta property="og:description" content={seo[0]?.attributes?.description}  />

        <meta name="keywords" content={seo[0]?.attributes?.keywords}  />

		  <link rel="canonical" href={canonicalUrl} />      
		  <meta name="Publisher" content="https://shadeko.eu/" />		 	
      </Helmet>


			<div className='register__body'>


			<div className="login__main-first d-flex a-i-center j-c-space">

					<h2 className='upper'>
					{text[0]?.attributes?.registerTitlePart1+" "}
					<span>{text[0]?.attributes?.registerTitlePart2}</span>
					</h2>
					<Link className='login__register' to='/login'>{text[0]?.attributes?.registerButtonLogIn}</Link>
			</div>

			<div className="register__net">		
				<input className={validatorName ? 'invalid' : ''} value={userName} onChange={(e)=>{setUserName(e.target.value)}} type="text" placeholder={text[0]?.attributes?.registerPlaceholderFirstName} />
				<input className={validatorLastName ? 'invalid' : ''}  value={lastName} onChange={(e)=>{setLastName(e.target.value)}} type="text" placeholder={text[0]?.attributes?.registerPlaceholderLastName} />
				<input className={validatorEmail ? 'invalid' : ''}  value={emailForm} onChange={(e)=>{setEmailForm(e.target.value)}} type="text" placeholder={text[0]?.attributes?.registerPlaceholderEmail} />
				<input className={validatorPassword ? 'invalid' : ''} value={passwordForm} onChange={(e)=>{setPasswordForm(e.target.value)}}  type="text" placeholder={text[0]?.attributes?.registerPlaceholderPassword} />
			</div>

			<div className="register__button d-flex a-i-center j-c-space">

				<div className="register__checkbox">

					<section className="d-flex a-i-center">
						<input className='checkbox' checked={firstCheckbox}  onChange={()=>{setFirstCheckbox(!firstCheckbox)}}  type="checkbox" />
						<p className={validatorFirstCheckbox ? 'invalid__p' : ""} >{text[0]?.attributes?.registerCheckboxText1}</p>
					</section>

					<section className="d-flex a-i-center">
						<input className='checkbox' checked={secondCheckbox}  onChange={()=>{setSecondCheckbox(!secondCheckbox)}}  type="checkbox" />
						<p className={validatorSecondCheckbox ? 'invalid__p' : ""}>{text[0]?.attributes?.registerCheckboxText2}</p>
					</section>


			
				</div>

				<button onClick={()=>{postRegister(userName,lastName,passwordForm,emailForm)}} className='login__check-button'>{text[0]?.attributes?.registerButtonCreate}</button>

			</div>


			</div>

			<div className={serverInvalid === true ? "logIn__invalid active" : 'logIn__invalid'}>
				<img src={process.env.PUBLIC_URL + '/img/error-logIn.svg'} alt="icon" />
				<p>{text[0]?.attributes?.registerInvalid}</p>
			</div>

			<div className={sucssesModal === true ? "logIn__invalid active" : 'logIn__invalid'}>
				<img src={process.env.PUBLIC_URL + '/img/success-admin-panel.svg'} alt="icon" />
				<p>{text[0]?.attributes?.registerSuccessful}</p>
			</div>

		</div>
	);
}

export default Register;