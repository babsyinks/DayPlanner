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
        
        case 'SET_MESSAGE':
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
            const new_message = {msg_id:action.msg_id,message:action.message,dateDetails:action.dateDetails}
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
            return message_state.map((arr)=>{
                
                return arr.map(obj=>{
                    if(obj.msg_id === action.msg_id){
                        return {...obj,message:action.payload}
                    }
                    else{
                        return obj
                    }
                })
            })

        case 'DELETE_MESSAGE':
         return message_state.map((arr=>arr.filter(msg=>msg.msg_id !== action.msg_id)))
        
        case 'SET_MESSAGE':
            return action.payload

        default:
             return message_state
    }
}

function authReducer(state = null,action){
    switch(action.type){
        case 'AUTH':
            return action.user
        default:
            return state
    }
}

function loginReducer(state = 'init', action){
    switch(action.type){
        case 'INIT':
            return 'init'
        case 'CREATE':
            return 'create'
        case 'LOGIN_FEEDBACK':
            return 'login_feedback'
        default:
            return state
    }
}

/* function allPlansReducer(state = null,action){
    switch(action.type){
        case 'SET_SAVED_PLANS':
            return action.type
        default:
            return state
    }
} */

const reducer = combineReducers({
    activeThread:activeThreadIdReducer,
    thread:threadReducer,
    userAuth:authReducer,
    loginClicked:loginReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))