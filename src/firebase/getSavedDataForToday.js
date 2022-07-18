import {firestore} from './firebase'
import getDate from './getDate'

const getTodayData = async (userAuth)=>{
    if(!userAuth){
        return
    }
   
  const userRef = firestore.doc(`users/${userAuth.uid}/dayplans/${getDate()}`)
  const snapShot = await userRef.get()

  if(!snapShot.exists){
    return
  }
  else{
    const snapShotData = snapShot.data()
    const objKeys =  Object.keys(snapShotData)
    return objKeys.map((key,i)=>{
        if(i === 0){
            return snapShotData['morning']
        }
        else if(i === 1){
            return snapShotData['afternoon']
        }
        else{
            return snapShotData['evening']
        }
    })

  }
}

export default getTodayData