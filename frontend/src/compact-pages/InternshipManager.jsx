import React, { useEffect, useState } from 'react'
import Table from '../components/Table.jsx'
import CardStage from '../components/CardStage.jsx'
import Window from '../components/Window.jsx'
import StageForm from '../components/forms/StageForm.jsx'
import api from '../api/axios.js'

const Inventory = () => {

  const [isAdding, setIsAdding] = useState(false)
  const [Stages, setStages] = useState([])

  useEffect(()=>{
    
    const fetchStages = async () => {
      api.get("api/me/stages")
      .then(resp=>setStages(resp.data))
      .catch(err=>console.error(err))
    }

    fetchStages()

  },[isAdding])

  return (
    <div className="p-5 flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-3xl text-black">Mes Stages</h1>
        <button className="px-2 bg-primary text-white rounded-md hover:bg-[#037fc7] transition-all duration-200" onClick={()=>setIsAdding(true)}>Nouveau</button>
      </div>
      <div className="mt-5 flex flex-col space-y-3 h-fit">
        {
        Stages.length > 0 ?
        Stages.map(s=>(
          <CardStage Data={s}/>
        ))
        :
        <p className="w-full text-center text-xl">Aucun stage !</p>
      }
        {isAdding &&
          <Window Title={"Nouveau Stage"}>
              <StageForm handleClose={()=>setIsAdding(false)}></StageForm>
          </Window>
        }
      </div>
    </div>
  )
}

export default Inventory