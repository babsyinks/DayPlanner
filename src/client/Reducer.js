import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
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
        
        case 'EDIT_MESSAGE':
            return {threads:thread_state.threads,messages:messageReducer(thread_state.messages,action)}

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

function messageReducer(message_state,action){

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
        case 'EDIT_MESSAGE':
            console.log(action.id)
            return message_state.map((arr)=>{
                
                return arr.map(obj=>{
                    if(obj.id === action.id){
                        console.log(obj.id)
                        console.log(action.id)
                        return {...obj,message:action.payload}
                    }
                    else{
                        return obj
                    }
                })
            })

        case 'DELETE_MESSAGE':
         return message_state.map((arr=>arr.filter(msg=>msg.id !== action.id)))
        
        default:
             return message_state

    }

       

}

const reducer = combineReducers({
    activeThread:activeThreadIdReducer,
    thread:threadReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))