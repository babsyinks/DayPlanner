import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

 function activeThreadIdReducer(id_state = '3mzfe',action){

    switch(action.type){

        case 'OPEN_THREAD':
        
        return action.id

        default:
            return id_state

    }

}

function threadReducer(thread_state = initial_state,action){

    switch(action.type){

        case 'ADD_MESSAGE':
            
            const findIndex = thread_state.threads.findIndex(th=>action.id === th.id)
            const activeThread = {...thread_state.threads[findIndex]}
            const arrayOfThreadsBeforeInsert = thread_state.threads.slice(0,findIndex)
            const arrayOfThreadsAfterInsert = thread_state.threads.slice(findIndex+1)
            return {
                threads:[...arrayOfThreadsBeforeInsert,activeThread,...arrayOfThreadsAfterInsert],
                messages:messageReducer(thread_state.messages,action)
            }

        case 'DELETE_MESSAGE':
            return {threads:thread_state.threads,messages:messageReducer(thread_state.messages,action)}    
            
        default:
            return thread_state
    }

}

const initial_state = {
    threads:[{id:'3mzfe',title:'Morning'},{id:'2feax',title:'Afternoon'},{id:'1hxef',title:'Evening'}],
    messages:[[],[],[]]
}

function messageReducer(message_state = [[],[],[]],action){

    switch(action.type){
        case 'ADD_MESSAGE':
            const new_message = {id:action.msg_id,message:action.message}
            const new_state = [...message_state]
            switch(action.id){
                case '3mzfe':
                    new_state[0] = [...message_state[0],new_message]
                    return new_state
                case '2feax':
                    new_state[1] = [...message_state[1],new_message]
                    return new_state
                case '1hxef':
                    new_state[2] = [...message_state[2],new_message]
                    return new_state
                default:
                    return new_state
            }
         
    

        case 'DELETE_MESSAGE':
         const n_state = message_state.filter(msg=>msg.id !== action.id)
         return n_state

         default:
             return message_state

    }

       

}

const reducer = combineReducers({
    activeThread:activeThreadIdReducer,
    thread:threadReducer
})

export const store = createStore(reducer,applyMiddleware(thunk))