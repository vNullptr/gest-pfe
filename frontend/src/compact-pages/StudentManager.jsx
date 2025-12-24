import React, { useState } from 'react'
import StudentValidationView from '../components/views/StudentValidationView'
import StudentTrackingView from '../components/views/StudentTrackingView'

const StudentManager = () => {

  const [tab, setTab] = useState(0)
  const Tabs = [
    {label:"En Attente", view:<StudentValidationView/>},
    {label:"En Cours", view:<StudentTrackingView/>},
    {label:"Correction", view:<div>test</div>},
  ]

  return (
    <div className="flex flex-col p-3">
      <div className="flex flex-row w-full items-center min-h-[5svh] mb-2 space-x-1">
        {Tabs.map((t, index)=>(
          <div 
          className={`${index == tab ? "bg-gray-200": "bg-white"} hover:bg-gray-200 rounded-xl border border-gray-200 p-2 cursor-pointer`}
          onClick={()=>setTab(index)}
          >{t.label}</div>
        ))}
      </div>
      <div className="h-px bg-gray-300 mb-2"></div>
      {Tabs[tab].view}
    </div>
  )
}

export default StudentManager