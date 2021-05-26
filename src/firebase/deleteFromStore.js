import {firestore} from './firebase'

const deleteFromStore = async (userAuth,dataToDelete)=>{
    if(!userAuth){
        return
    }
  const{msg_id,dateDetails} = dataToDelete
  const userRef = firestore.doc(`users/${userAuth.uid}/dayplans/${dateDetails.date}`)
  const snapShot = await userRef.get()

  if(!snapShot.exists){
        return
  }
  else{
    const snapShotData = snapShot.data()
    snapShotData[dateDetails.period] = snapShotData[dateDetails.period].filter((obj)=> obj.msg_id !== msg_id) 
    await userRef.set(snapShotData)
    
  }
}

export default deleteFromStore