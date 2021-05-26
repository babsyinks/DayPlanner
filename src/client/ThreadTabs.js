import {connect} from 'react-redux';
import {Tabs} from './Tabs'
import {selectTabAction} from './actions/actions'

const mapStateToProps = (state)=>{
    return {active:state.activeThread,thread:state.thread.threads}
}

export default connect(mapStateToProps,{selectTab:selectTabAction})(Tabs)


