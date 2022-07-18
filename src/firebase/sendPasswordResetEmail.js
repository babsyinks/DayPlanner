import {auth} from './firebase'

const sendPasswordResetEmail = async (email)=>{
  await auth.sendPasswordResetEmail(email)
}

export default sendPasswordResetEmail