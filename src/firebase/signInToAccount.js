import {auth} from './firebase'

const accountSignIn = async (email,password)=>{
  await auth.signInWithEmailAndPassword(email, password) 
}

export default accountSignIn