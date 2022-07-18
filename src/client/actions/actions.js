import uuid from 'uuid/v1';

export const deleteAction = msg_id=>({
        type:'DELETE_MESSAGE',
        msg_id
    })

export const editAction = (msg_id,payload)=>({
    type:'EDIT_MESSAGE',
    msg_id,
    payload
})

export const submitAction = (message,msg_id,dateDetails)=>(dispatch,getState)=>{
    dispatch({type:'ADD_MESSAGE',
    id:getState().activeThread,
    msg_id,
    message,
    dateDetails
})
}

export const setMessage = payload =>({
    type:'SET_MESSAGE',
    payload
})

export const selectTabAction = id=>({
    type:'OPEN_THREAD',
    id
})

export const setCurrentUser = user =>({
    type:'AUTH',
    user
})

export const setLoginClicked = type=>({type})
