import uuid from 'uuid/v1';

export const deleteAction = id=>({
        type:'DELETE_MESSAGE',
        id
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

