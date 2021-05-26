import {auth} from './firebase'

const accountSignIn = async (email,password)=>{
    try {
        await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      console.log(error)  
    }
    
}

export default accountSignIn