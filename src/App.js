import React from 'react';
import ChatContainer from './redux_project/ChatContainer'
import './App.css';
import {connect} from 'react-redux';


function App({ active }) {

  let bgClass
  if(active === '3mzfe'){
    bgClass = 'morning'
  }
  else if(active === '2feax'){
    bgClass = 'afternoon'
  }
  else{
    bgClass = 'evening'
  }


  return (
    <div className = {`parentWrapper ${bgClass}`}>
      <div className = {`parent`}>
      <ChatContainer />
     </div>
    </div>
    
      
  );
}

const mapStateToProps = (state)=>({
  active:state.activeThread
})

export default connect(mapStateToProps)(App);
