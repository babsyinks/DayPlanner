import uuid from 'uuid/v1';

export const deleteAction = id=>({
        type:'DELETE_MESSAGE',
        id
    })

export const editAction = (id,payload)=>({
    type:'EDIT_MESSAGE',
    id,
    payload
})

export const submitAction = message=>(dispatch,getState)=>{
    dispatch({type:'ADD_MESSAGE',
    id:getState().activeThread,
    msg_id:uuid(),
    message
})
}

export const selectTabAction = id=>({
    type:'OPEN_THREAD',
    id
})

