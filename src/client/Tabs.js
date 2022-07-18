import React,{useEffect} from 'react';
import './Tabs.css'
export const Tabs = ({active,thread,selectTab})=>{

  useEffect(()=>{
    const current_hour = new Date().getHours()
    if(current_hour<=11){
      selectTab('3mzfe')
    }
    else if(current_hour>11 && current_hour <=17){
      selectTab('2feax')
    }
    else{
      selectTab('1hxef')
    }
  // eslint-disable-next-line
  },[])

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