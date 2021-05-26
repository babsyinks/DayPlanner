import Messages from './Messages';
import {connect} from 'react-redux';
import {deleteAction,submitAction, editAction} from './actions/actions'

const mapStatetoProps = (state)=>{

    return {messages:state.thread.messages,threads:state.thread.threads,active:state.activeThread}

}

export default connect(mapStatetoProps,{delete:deleteAction,submit:submitAction,edit:editAction})(Messages)