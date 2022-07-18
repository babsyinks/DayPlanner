import React,{useEffect} from 'react';
import PlansContainer from './PlansContainer';
import Loading from './Loading';
import {setMessage} from './actions/actions'
import getSavedDataForToday from '../firebase/getSavedDataForToday'
import './Loading.css';
import './App.css';
import {connect} from 'react-redux';
import {auth} from '../firebase/firebase';
import {setCurrentUser} from './actions/actions';

function App({ active,userAuth,setUser,history,match,loginClicked,setMessage }) {
  useEffect(()=>{
    const unSubcribe = auth.onAuthStateChanged(userObj=>{
      if(userObj){
        const user = {
                  uid:userObj.uid,
                  email:userObj.email,
                  name:userObj.displayName?userObj.displayName:'',
                  picture:userObj.photoURL?userObj.photoURL:''
                }   
        setUser(user)
      }
    else{
      if(loginClicked === 'init' || loginClicked === 'login_feedback'){
        setUser(userObj)
        history.push('/signin')
      }
    }
    return ()=>{
        setUser(null)
        unSubcribe()
    }
}) 
//eslint-disable-next-line 
},[])
  let bgClass
  if(active === '3mzfe'){
    bgClass = 'morning'
  }
  else if(active === '2feax'){
    bgClass = 'afternoon'
  }
  else{
    bgClass = 'evening'
  }

  const signOut = async()=>{
    try{
      await auth.signOut()
    }
    catch(err){
      console.log(err)
    }
  }

  const showListofPlans = ()=>{
    history.push('/savedplans')
  }

  const showTodayPlans = async ()=>{
      const savedTodayData = await getSavedDataForToday(userAuth)
      if(savedTodayData){
          setMessage(savedTodayData)
      }
      else{
          setMessage([[],[],[]])
      }
      history.push('/')
  }

  if(!userAuth){
    return (
      <Loading />
    ) 
  } 
   else{
   return (
    <div className = {`parentWrapper ${bgClass}`}>
       {userAuth.picture && <img id = 'acctPix' src = {userAuth.picture} /> } 
        <span id = 'welcomeMsg'>{`Welcome ${userAuth.name}`}</span>
        <input id = 'signout' type = 'button' value = 'sign out' onClick = {signOut} />
      <div className = {`parent`}>
      <PlansContainer />
      <div>
        <span className = 'routePlans' id = 'prevPlans' onClick = {showListofPlans}>Show Previous Saved Plans</span>
        {match.params.dateSaved && <span className = 'routePlans' id = 'todayPlans' onClick = {showTodayPlans}>Show Today's Saved Plans</span>}
      </div>
     </div>
    </div>  
  );   
  }
 } 

const mapStateToProps = (state)=>({
  active:state.activeThread,
  userAuth:state.userAuth,
  loginClicked:state.loginClicked
})

export default connect(mapStateToProps,{setUser:setCurrentUser,setMessage})(App);
