import React,{useState,useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {googleSignIn} from '../firebase/firebase';
import createNewAccount from '../firebase/createNewAccount'
import signInToAccount from '../firebase/signInToAccount'
import sendPasswordResetEmail from '../firebase/sendPasswordResetEmail';
import {setLoginClicked} from './actions/actions'
import './SignIn.css';

const SignIn = ({userAuth,setLoginClicked,match,loginClicked})=>{
	const[header,setHeader] = useState('Account Login')
	const[buttonText,setButtonText] = useState('Login')
	const[email,setEmail] = useState('')
	const[password,setPassword] = useState('')
	const[successMsg,setSuccessMsg] = useState('')
	const[errorMsg,setErrorMsg] = useState('')
	const[createAccountOrSignIn,setCreateAccountOrSignIn] = useState('Create Your Account')
	const[passwordResetMailClicked,setPasswordResetMailClicked] = useState(false)
	
	useEffect(()=>{
		setLoginClicked('INIT')
		console.log(match)
	},[])

	useEffect(()=>{
		if(loginClicked === 'login_feedback'){
			handleErrorMsg('Email or password is incorrect')
		}
	},[loginClicked,setLoginClicked])

	const openCreateAccountForm = ()=>{
		if(createAccountOrSignIn === 'Create Your Account'){
			setHeader('Create Account')
			setButtonText('Create')
			setErrorMsg('')	
			setCreateAccountOrSignIn('Login To Your Account')
		}
		else{
			setHeader('Account Login')
			setButtonText('Login')
			setErrorMsg('')		
			setCreateAccountOrSignIn('Create Your Account')	
		}
	}

	const handleEmailText = (e)=>{
		setEmail(e.target.value)
	}

	const handlePasswordText = (e)=>{
		setPassword(e.target.value)
	}

	const handleFormSubmition = async (e)=>{
		e.preventDefault()
		try {
			if(buttonText === 'Login'){
				try {
					await signInToAccount(email,password)
				} catch (error) {
					setLoginClicked('LOGIN_FEEDBACK')
				}
			}
			else if(buttonText === 'Send Email'){
				try {
					await sendPasswordResetEmail(email)
					setPasswordResetMailClicked(false)
					setHeader('Account Login')
					setButtonText('Login')
					handleSuccessMsg('Email Sent Successfully!')					
				} catch (error) {
					setPasswordResetMailClicked(false)
					setHeader('Account Login')
					setButtonText('Login')
					handleErrorMsg('Invalid Email Address')
				}
			}
			else{
				if(loginClicked !== 'create'){
					setLoginClicked('CREATE')
				}
			 const accountStatus = await createNewAccount(email,password)
			 if(accountStatus){
				 console.log(accountStatus)
				 handleErrorMsg(accountStatus)
			 }
			}			
		} catch (error) {
			handleErrorMsg('Operation Failed.Try Again Later!')
		}
	}

	const handleSetPasswordResetEmail = ()=>{
		setPasswordResetMailClicked(true)
		setButtonText("Send Email")
		setHeader("Send Password Reset Email")
	}

	const handleErrorMsg = (msg)=>{
		setErrorMsg(msg)
		setTimeout(()=>{
			setErrorMsg('')
		},5000)
	}

	const handleSuccessMsg = (msg)=>{
		setSuccessMsg(msg)
		setTimeout(()=>{
			setSuccessMsg('')
		},5000)
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

					{!passwordResetMailClicked && (
					<div className="wrap-input100 validate-input" data-validate = "Password is required">
						<input className="input100" type="password" placeholder="Password" value = {password} onChange = {handlePasswordText}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>						
					)}

					
					<div className="container-login100-form-btn" onClick = {handleFormSubmition}>
						<button className="login100-form-btn">
							{`${buttonText}`}
						</button>
					</div>

					{!passwordResetMailClicked && (
						<div className="text-center p-t-12" onClick={handleSetPasswordResetEmail}>
							<span className="txt1">
								{`Forgot `}
							</span>
							<a className="txt2" href="#">
								Username / Password?
							</a>
					   </div>					
					)}

					<div className="container-login100-form-btn">
					<div className = "signin login100-form-btn" onClick = {googleSignIn}><img src='/images/google-logo.png'/><span>Sign In With Google</span></div>
					</div>

					{!passwordResetMailClicked && (
					<div className="text-center p-t-15" style = {{cursor:'pointer'}}>
						<div className = "errorMsg">{errorMsg}</div>
						<div className='successMsg'>{successMsg}</div>
						<div className="txt2" onClick = {openCreateAccountForm}>
							{createAccountOrSignIn}
							<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</div>
					</div>						
					)}
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