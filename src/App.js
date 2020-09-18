import React from 'react';
import PlansContainer from './client/PlansContainer'
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
      <PlansContainer />
     </div>
    </div>
    
      
  );
}

const mapStateToProps = (state)=>({
  active:state.activeThread
})

export default connect(mapStateToProps)(App);
