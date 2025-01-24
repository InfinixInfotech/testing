import React, { useState } from 'react'

const LeadSource = () => {
    const [isDropDOwn, setisDropDOwn] = useState(false)
    const [leadSource, setLeadSource] = useState('')

    const handleToggle = ()=>{
        setisDropDOwn((prevState)=>!prevState)
    }
    const handleLeadSourceChange = (event)=>{
       setLeadSource(event.target.value)
    }

    const leadSourceOptions = [
      {value:'all' , lable:'All' },
      {value:'freshPool' , lable:'Fresh Pool' },
      {value:'daimondPool' , lable:'Daimond Pool' },
      {value:'disposePool' , lable:'Dispose Pool' },
      {value:'hniPool' , lable:'Hni Pool' },
      {value:'platinum' , lable:'Platinum' },
    ]
    
  return (
   <>
    <button className='filterButton-LeadSource' onClick={handleToggle}>
        {isDropDOwn ? 'Lead Source' : 'Lead Source'}
    </button>
     {isDropDOwn && (
        <div className='dropDown-content-LeadSource'>
        <select value={leadSource} onChange={handleLeadSourceChange} name="leadSource" id="leadSource-dropdown">
               {leadSourceOptions.map((option)=> (
                <option key = {option.value}  value={option.value}>{option.lable}</option>
               ))}
        </select>
        </div>
     )}
     {leadSource && (
      <p>Selected LeadSource: {leadSource}</p>
     )}
   </>
  )
}

export default LeadSource;