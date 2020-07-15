import React,{Fragment} from 'react';
import Thread from './Thread'
import ThreadTabs from './ThreadTabs'


export default class ChatContainer extends React.Component{

   

    render(){

        return (
            <Fragment>
               <ThreadTabs />
                <Thread />  
            </Fragment>
           
           
            
            
        )

    }

}

