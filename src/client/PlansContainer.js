import React,{Fragment} from 'react';
import Thread from './Thread';
import ThreadTabs from './ThreadTabs';


export default class PlansContainer extends React.Component{

    render(){

        return (
            <Fragment>
               <ThreadTabs />
                <Thread />  
            </Fragment>
            
        )

    }

}

