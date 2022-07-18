import React,{Fragment} from 'react';
import uuid from 'uuid/v1';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {setMessage} from './actions/actions'
import getSavedDataForToday from '../firebase/getSavedDataForToday'
import saveToStore from '../firebase/saveToStore'
import editInStore from '../firebase/editInStore'
import deleteFromStore from '../firebase/deleteFromStore'
import getDate from '../firebase/getDate'
import './Messages.css'

class Messages extends React.Component{

    constructor(props){
       super(props)
       this.state = {
           value:'',
            updateButton:false,
            editId:'',
            disabled:false,
            loading:false,
            referencedDate:'',
            activeTab:this.props.threads.find(th=>th.id === this.props.active).title
    }

       this.handleChange = this.handleChange.bind(this)
       this.handleSubmit = this.handleSubmit.bind(this)
       this.handleDelete = this.handleDelete.bind(this)
       this.handleEdit = this.handleEdit.bind(this)
       this.handleUpdate = this.handleUpdate.bind(this)
    }

    async componentDidMount(){
        if(!this.props.match.params.dateSaved){
            const savedTodayData = await getSavedDataForToday(this.props.userAuth)
            if(savedTodayData){
                this.props.setMessage(savedTodayData)
            }
        }
    }

    handleChange(e){
        this.setState({value:e.target.value})
    }

    async handleSubmit(){
        const date = getDate()
        const msg_id = uuid()
        const{userAuth} = this.props
        const {value} = this.state
        const activeTab = this.props.threads.find(th=>th.id === this.props.active).title
        const dataToSave = {morning:[],afternoon:[],evening:[]}
        const period = activeTab.toLowerCase()
        const dateDetails = {date,period}
        dataToSave[period].push({msg_id,message:value,dateDetails})
        this.setState({disabled:true})
        this.setState({loading:true})
        await saveToStore(userAuth,dataToSave)
        this.props.submit(value,msg_id,dateDetails)
        this.setState({value:''}) 
        this.setState({disabled:false})
        this.setState({loading:false})
    }

    async handleDelete(msg_id){
        if(this.state.editId === msg_id){
            this.setState({
                value:'',
                 updateButton:false,
                 editId:''
         })
        }
        
        for(let arr of this.props.messages){
            let current = arr.find((val)=>val.msg_id === msg_id)
               if(current){
                    await deleteFromStore(this.props.userAuth,{msg_id:current.msg_id,dateDetails:current.dateDetails})
                    break
               }
           }
        this.props.delete(msg_id)
    }

    handleEdit(msg_id){
       for(let arr of this.props.messages){
        let current = arr.find((val)=>val.msg_id === msg_id)
           if(current){
                this.setState({value:current.message,editId:current.msg_id,referencedDate:current.dateDetails,updateButton:true})
                break
           }
       }
      
    }
    
    async handleUpdate(msg_id){
        const{userAuth} = this.props
        const{value,editId,referencedDate} = this.state
        this.setState({loading:true})
        await editInStore(userAuth,{msg_id:editId,message:value,dateDetails:referencedDate})
        this.props.edit(msg_id,this.state.value)
        this.setState({value:'',updateButton:false,editId:'',loading:false})
    }

    render(){
        let bg = this.props.active
        let labelStyle = {color:'grey',fontWeight:'normal',opacity:0.5}
        if(bg === '3mzfe'){
             bg = 'morningBg'
        } 
        else if(bg === '2feax'){
            bg = 'afternoonBg'
        }
        else{
            bg = 'eveningBg'
        }
        
        const update = this.state.updateButton
        const{loading} = this.state
        return (

            <div className = {`messagesWrapper ${bg}`}  >
                
                {this.props.messages
                .map((msgArray,i)=>{
                    let title = this.props.threads[i].title
                    let activeLabel = this.props.threads[i].id === this.props.active?{}:labelStyle
                    return ( 
                        <Fragment key = {this.props.threads[i].id}>
                    <div id = {title} className = 'plans' style = {activeLabel}>{`What are your plans for this ${title}`}</div>
                        {msgArray.map(({msg_id,message})=>{
                            return(
                            <div className = 'commentsWrapper' key = {`${msg_id}${i}`}>
                                 <div className = {`comments ${title === 'Morning'?'morningBb':(title === 'Afternoon'?'afternoonBb':'eveningBb')}`}
                                  style = {activeLabel}><span className = 'msg'>{message}</span>
                                  {this.props.threads[i].id === this.props.active&&<span className = 'btns'><span onClick = {()=>this.handleEdit(msg_id)}><i className="far fa-edit" style = {{color:'blue'}}></i></span>
                                  <span onClick = {()=>this.handleDelete(msg_id)}><i className="fas fa-trash-alt" style = {{color:'red'}}></i></span></span>}</div>
                            </div>  
                        )
                                })}
                                </Fragment>
                    )
                }
                )}

                <div className = 'inputs'>
                    <textarea onChange = {this.handleChange} value = {this.state.value} ></textarea>
                    {loading?<button><i className="fas fa-circle-notch fa-spin fa-xs"></i></button>:<input type = 'button' value = {`${update?'Update':'Submit'}`}
                    onClick = {update?()=>this.handleUpdate(this.state.editId):this.handleSubmit}
                    disabled = { this.state.disabled || this.state.value.trim() === '' }/>}
                </div>
            </div>
        )
    }
} 

const mapStatetoProps = (state)=>({
  userAuth:state.userAuth
})

export default withRouter(connect(mapStatetoProps,{setMessage})(Messages)) 


