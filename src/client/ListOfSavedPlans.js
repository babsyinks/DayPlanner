import React,{useEffect,useState} from 'react'
import {firestore} from '../firebase/firebase'
import { connect } from 'react-redux'
import SavedPlans from './SavedPlans'
import Loading from './Loading' 
import './Loading.css'
import './ListOfSavedPlans.css'

function ListofPlans({user,history}) {

    const [fetched,setFetched] = useState(false)
    const[plansList,setPlansList] = useState(null)

    useEffect(()=>{
        const fetchData = async ()=>{
        if(!user){
            return
        }
        const collectionRef = firestore.collection(`users/${user.uid}/dayplans`)
        const snapShot = await collectionRef.get()
        //const data = snapShot.data()
        console.log(snapShot)
        
        if(!snapShot.empty){
            setPlansList(snapShot.docs)
            console.log(snapShot.docs)
        }
        setFetched(true)
    /*       if(Object.keys(data).length === 0){
            setFetched(true)
        }
        else{

        } */           
        }

        fetchData()
        //eslint-disable-next-line
    },[])

    if(!fetched){
        return <Loading />
    }
    else{
        if(plansList){
            return  (
                <div id = "wrapper-container">
                    <div id = "plans-wrapper">
                        <h1 id = "saved-plans">Saved Plans</h1>
                        {plansList.map((dayplan,i)=>{
                            console.log(dayplan)
                        return <SavedPlans key = {i} planDetails = {dayplan.data()}/>
                        })}
                    </div>
                </div>
            ) 
        }
        else{
          return   ( 
            <h1 className = 'bigHeading'>
                You Don't Have Any Saved Day Plan!
                {<div className = 'routePlans' id = 'todayPlans' onClick = {()=>{history.push('/')}} style = {{display:'block',width:'30%'}}>OK</div>}
            </h1>
        ) 
        }
         
    }

}

const mapStateToProps = (state)=>({
    user:state.userAuth
})

export default connect(mapStateToProps)(ListofPlans) 
