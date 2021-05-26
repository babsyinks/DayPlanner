import {firestore} from './firebase'
import getDate from './getDate'

const saveToStore = async (userAuth,dataToSave)=>{
    if(!userAuth){
        return
    }
   
  const userRef = firestore.doc(`users/${userAuth.uid}/dayplans/${getDate()}`)
  const snapShot = await userRef.get()

  if(!snapShot.exists){
    try {
      await userRef.set(dataToSave)  
    } catch (error) {
       console.log(error) 
    }
  }
  else{
    const snapShotData = snapShot.data()
    const objKeys = Object.keys(snapShotData)

    objKeys.forEach((key)=>{
      snapShotData[key] = [...snapShotData[key], ...dataToSave[key]] 
    }) 

    await userRef.set(snapShotData)
    
  }
}

export default saveToStore