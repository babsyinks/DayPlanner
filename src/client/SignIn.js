import React,{useState,useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {googleSignIn} from '../firebase/firebase';
import createNewAccount from '../firebase/createNewAccount'
import signInToAccount from '../firebase/signInToAccount'
import {setLoginClicked} from './actions/actions'
import './SignIn.css';

const SignIn = ({userAuth,setLoginClicked,match,loginClicked})=>{
	const[header,setHeader] = useState('Account Login')
	const[buttonText,setButtonText] = useState('Login')
	const[email,setEmail] = useState('')
	const[password,setPassword] = useState('')
	const[errorMsg,setErrorMsg] = useState('')

	useEffect(()=>{
		setLoginClicked('INIT')
		console.log(match)
	},[])

	const openCreateAccountForm = ()=>{
		setHeader('Create Account')
		setButtonText('Create')
		setLoginClicked('CREATE')
		setErrorMsg('')
	}

	const handleEmailText = (e)=>{
		setEmail(e.target.value)
	}

	const handlePasswordText = (e)=>{
		setPassword(e.target.value)
	}

	const handleFormSubmition = async (e)=>{
		e.preventDefault()
		if(buttonText === 'Login'){
			setLoginClicked('LOGIN_FEEDBACK')
			await signInToAccount(email,password)
		}
		else{
			if(loginClicked !== 'create'){
				setLoginClicked('CREATE')
			}
		 const accountStatus = await createNewAccount(email,password)
		 if(accountStatus){
			 console.log(accountStatus)
			 setErrorMsg(accountStatus)
			 
		 }
		}
	}

	if(userAuth){
		return (
			<Redirect to = '/dayplanner' />
		)
	}
	return(
    <div className="limiter">
		<div className="container-login100">
         <div className="container-header">
          <h2>Its Time To Plan Your Day</h2>
			<div className="wrap-login100">
				<div className="login100-pic js-tilt" data-tilt>
					<img src="images/planning.jpg" alt="IMG"/>
				</div>
 
				<form className="login100-form validate-form">
					<span className="login100-form-title">
						{`${header}`}
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input className="input100" type="text" placeholder="Email" value = {email} onChange = {handleEmailText}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Password is required">
						<input className="input100" type="password" placeholder="Password" value = {password} onChange = {handlePasswordText}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div className="container-login100-form-btn" onClick = {handleFormSubmition}>
						<button className="login100-form-btn">
							{`${buttonText}`}
						</button>
					</div>

					<div className="text-center p-t-12">
						<span className="txt1">
							{`Forgot `}
						</span>
						<a className="txt2" href="#">
							Username / Password?
						</a>
					</div>

					<div className="container-login100-form-btn">
					<div className = "signin login100-form-btn" onClick = {googleSignIn}><img src='/images/google-logo.png'/><span>Sign In With Google</span></div>
					</div>

					<div className="text-center p-t-15" style = {{cursor:'pointer'}}>
						<div className = "errorMsg">{loginClicked === 'login_feedback'?'Email or password is incorrect':`${errorMsg}`}</div>
						<div className="txt2" onClick = {openCreateAccountForm}>
							Create your Account
							<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</div>
					</div>
				</form>
			</div>
		</div>
        </div>
	</div>
)
}

const mapStateToProps = (state)=>({
    userAuth:state.userAuth,
	loginClicked:state.loginClicked
})

export default connect(mapStateToProps,{setLoginClicked})(SignIn) 