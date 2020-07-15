import Messages from './Messages';
import {connect} from 'react-redux';
import {deleteAction,submitAction} from './actions'

const mapStatetoProps = (state)=>{

    return {messages:state.thread.messages,threads:state.thread.threads,active:state.activeThread}

}

export default connect(mapStatetoProps,{delete:deleteAction,submit:submitAction})(Messages)