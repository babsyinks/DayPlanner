import React,{Fragment} from 'react';
import './Messages.css'

export default class Messages extends React.Component{

    constructor(props){
       super(props)
       this.state = {
           value:'',
            updateButton:false,
            editId:'',
            activeTab:this.props.threads.find(th=>th.id === this.props.active).title
    }

       this.handleChange = this.handleChange.bind(this)
       this.handleSubmit = this.handleSubmit.bind(this)
       this.handleDelete = this.handleDelete.bind(this)
       this.handleEdit = this.handleEdit.bind(this)
       this.handleUpdate = this.handleUpdate.bind(this)
    }

    /* static getDerivedStateFromProps(props){

        const activeThread = props.threads.find(th=>th.id === props.active)
        const activeThreadMessageObjects = props.messages
        return {messages:activeThreadMessageObjects,activeTab:activeThread.title}
    } */

   /*  componentDidMount(){
        console.log(this.props.messages)
    } */
    handleChange(e){

        this.setState({value:e.target.value})

    }

    handleSubmit(){

        this.props.submit(this.state.value)
        this.setState({value:''})

    }

    handleDelete(id){

        return ()=>{
            this.props.delete(id)
        }

    }

    handleEdit(id){
    
       for(let arr of this.props.messages){
        let current = arr.find((val)=>val.id === id)
           if(current){
                this.setState({value:current.message,editId:current.id,updateButton:true})
                break
           }
       }
      
    }
    
    handleUpdate(id){
        this.props.edit(id,this.state.value)
        this.setState({value:'',updateButton:false,editId:''})
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
        return (

            <div className = {`messagesWrapper ${bg}`}  >
                
                {this.props.messages
                .map((msgArray,i)=>{
                    let title = this.props.threads[i].title
                    let activeLabel = this.props.threads[i].id === this.props.active?{}:labelStyle
                    return ( 
                        <Fragment key = {this.props.threads[i].id}>
                    <div id = {title} className = 'plans' style = {activeLabel}>{`What are your plans for this ${title}`}</div>
                        {msgArray.map(({id,message})=>{
                            return(
                            <div className = 'commentsWrapper' key = {`${id}${i}`}>
                                 <div className = {`comments ${title === 'Morning'?'morningBb':(title === 'Afternoon'?'afternoonBb':'eveningBb')}`}
                                  style = {activeLabel}><span className = 'msg'>{message}</span>
                                  {this.props.threads[i].id === this.props.active&&<span className = 'btns'><span onClick = {()=>this.handleEdit(id)}>ed</span>
                                  <span onClick = {()=>this.props.delete(id)}>dl</span></span>}</div>
                                 
                            </div>
                               
                        )
                                })}
                                </Fragment>
                    )
                    // style = {{border: title === 'Morning'?'1px solid green':(title === 'Afternoon'?'1px solid blue':'1px solid pink'),textAlign:'left',cursor:'default'}}
                }
                )}

                <div className = 'inputs'>
                    <textarea onChange = {this.handleChange} value = {this.state.value} ></textarea>
                    
                    <input type = 'button' value = {`${update?'Update':'Submit'}`}
                    onClick = {update?()=>this.handleUpdate(this.state.editId):this.handleSubmit}
                    disabled = {this.state.value.trim() === ''}/>
                </div>
            </div>
        )
    }


} 


