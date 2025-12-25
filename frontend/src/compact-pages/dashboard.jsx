import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import KPECard from '../components/KPECard'
import Table from '../components/Table'

const Dashboard = () => {

  const [stats, setStats] = useState(null)
  const [professors, setProfessors] = useState(null)

  useEffect(()=>{

    const fetchData = async ()=>{
      try {
        const resp = await api.get("api/dashboard/stats")
        setStats(resp.data)
        const profResp = await api.get("api/supervisors")
        setProfessors(profResp.data)
      } catch (err){
        console.log(err)
      }
    }

    fetchData()

  },[])

  const UserCards = [
    {text:"Total Utilisateur", value:stats?.users?.total ?? 0},
    {text:"Total étudiant", value:stats?.users?.students ?? 0},
    {text:"Total Professeurs", value:stats?.users?.professors ?? 0},
    {text:"Étudiants en stage", value:stats?.users?.active_internship ?? 0},
  ]

  const InternshipCards = [
    {text:"Total stages", value:stats?.stage?.total ?? 0},
    {text:"Stages en attente", value:stats?.stage?.waiting ?? 0},
    {text:"Stages en actif", value:stats?.stage?.active ?? 0},
  ]

  const Headers = [
        {label:"ID", val:(data)=>(data?.id)},
        {label:"Prénom", val:(data)=>(data?.prenom)},
        {label:"Nom", val:(data)=>(data?.nom)},
    ]

  return (
    <div className="p-5 flex flex-col">
      <h1 className="font-bold text-3xl text-black">Tableau de bord</h1>
      <div className="grid grid-cols-2 gap-3 py-3">
        
        <section className="flex flex-col px-3 border-r border-gray-200">
          <h1>Utilisateurs</h1>
          <div className="grid grid-cols-2 gap-5 py-3">
            {UserCards.map((card, index)=>(
              <KPECard text={card.text} value={card.value} key={index}/>
            ))}
          </div>
        </section>
        
        <section className="flex flex-col px-3 border-l border-gray-200">
          <h1>Stages</h1>
          <div className="grid grid-cols-2 gap-5 py-3">
            {InternshipCards.map((card, index)=>(
              <KPECard text={card.text} value={card.value} key={index}/>
            ))}
          </div>
        </section>

        <section className="flex flex-col px-3 space-y-3">
          <h1>Professeurs</h1>
          <Table Headers={Headers} Data={professors}/>
        </section>

      </div>
    </div>
  )
}

export default Dashboard