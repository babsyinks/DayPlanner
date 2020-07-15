import React,{Fragment} from 'react';
import './Messages.css'

export default class Messages extends React.Component{

    constructor(props){
       super(props)
       this.state = {value:'',
       activeTab:this.props.threads.find(th=>th.id === this.props.active).title
    }

       this.handleChange = this.handleChange.bind(this)
       this.handleSubmit = this.handleSubmit.bind(this)
       this.handleDelete = this.handleDelete.bind(this)
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

    

    render(){

        let bg = this.props.active

        if(bg === '3mzfe'){
             bg = 'morningBg'
        } 
        else if(bg === '2feax'){
            bg = 'afternoonBg'
        }
        else{
            bg = 'eveningBg'
        }
        

        return (

            <div className = {`messagesWrapper ${bg}`}  >
                
                {this.props.messages
                .map((msgArray,i)=>{
                    let title = this.props.threads[i].title
                    return ( 
                        <Fragment>
                    <div className = 'plans'>{`What are your plans for this ${title}`}</div>
                        {msgArray.map(({id,message})=>{
                            return(
                            <div className = 'commentsWrapper'>
                                 <div key = {i} onClick = {()=>
                                this.props.delete(id)
                            } className = {`comments ${title === 'Morning'?'morningBb':(title === 'Afternoon'?'afternoonBb':'eveningBb')}`} >{message}</div>
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
                    
                    <input type = 'button' value = 'Submit' onClick = {this.handleSubmit} disabled = {this.state.value.trim() === ''}/>
                </div>
            </div>
        )
    }


} 


