import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {setMessage} from './actions/actions'
import './savedPlans.css'

function SavedPlans({planDetails,history,setMessage}) {
    const dateSaved = planDetails.morning[0] && `${planDetails.morning[0].dateDetails.date}`.trim()
    const handleClick = ()=>{
        setMessage([planDetails.morning,planDetails.afternoon,planDetails.evening])
        history.push(`/dayplanner/${dateSaved}`)
    }
    if(dateSaved){
          return (
        <div id = "plans-ind" onClick = {handleClick}>
            {`Click to access your day plan for ${dateSaved}`}
        </div>
    )  
    }
    else{
        return ''
    }

}

export default withRouter(connect(null,{setMessage})(SavedPlans)) 
