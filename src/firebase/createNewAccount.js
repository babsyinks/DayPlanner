import {auth} from './firebase'
import isStrongPassword from 'validator/lib/isStrongPassword';
import isEmail from 'validator/lib/isEmail';

const createNewAccount = async (email,password)=>{
    if(!isEmail(email)){
        return `${email} is an invalid email`
    }
    else if(!isStrongPassword(password)){
        return `Password must have atleast one each of all of the following:  numbers, special characters(e.g *,-), uppercase and lowercase letters,`
    }
    try {
       
       await auth.createUserWithEmailAndPassword(email, password)
        
    } catch (error) {
        console.log(error)
        return error.message
    } 
}

export default createNewAccount