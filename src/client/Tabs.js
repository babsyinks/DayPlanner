import React from 'react';
import './Tabs.css'
export const Tabs = ({active,thread,selectTab})=>{

    let activeTab

    if(active === '3mzfe'){
        activeTab = 'morningColor'
      }
      else if(active === '2feax'){
        activeTab = 'afternoonColor'
      }
      else{
        activeTab = 'eveningColor'
      }
    
    return (
        <div className = 'tabsWrapper'>
            {thread.map((th,i)=>(
            <a href = {`#${th.title}`} key = {i}><div  className = {`tabs ${(th.id === active)?`active ${activeTab}`:'inActive'}`} onClick = {()=>{selectTab(th.id)}}>{th.title}</div></a>))}
        </div>
    )

}

//(th.id === active)?