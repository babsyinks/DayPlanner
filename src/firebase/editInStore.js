import {firestore} from './firebase'

const editInStore = async (userAuth,dataToSave)=>{
    if(!userAuth){
        return
    }
  const{msg_id,dateDetails,message} = dataToSave
  const userRef = firestore.doc(`users/${userAuth.uid}/dayplans/${dateDetails.date}`)
  const snapShot = await userRef.get()

  if(!snapShot.exists){
        return
  }
  else{
    const snapShotData = snapShot.data()
    console.log(snapShotData)
    const objToEdit = snapShotData[dateDetails.period].find((obj)=> obj.msg_id === msg_id) 
    objToEdit.message = message
    await userRef.set(snapShotData)
    
  }
}

export default editInStore