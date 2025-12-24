import React, { useState } from 'react'
import api from '../api/axios'
import Table from '../components/Table'
import { EyeIcon } from '../assets/icons'

const StudentManager = () => {

  const [Students, setStudents] = useState([
    {name:"Name", statut:1, entreprise:"Test Entreprise", encadrant_id:"Non assigné"},
    {name:"Name", statut:1, entreprise:"Test Entreprise", encadrant_id:"Non assigné"},
    {name:"Name", statut:1, entreprise:"Test Entreprise", encadrant_id:"Non assigné"},
  ])
  const Headers = [
    {label:"Prenom", key:"name", width:50},
    {label:"Nom", key:"name", width:10},
    {label:"Entreprise", width:10, key:"entreprise"},
    {label:"Encadrant", width:10, key:"encadrant_id", tag:true},
    {label:"", width:10, action:(<button className="p-1 bg-primary text-sm font-light text-white rounded-sm hover:bg-blue-600 outline-none">Consulter</button>)}
  ]

  return (
    <div className="p-3 grid grid-cols-2 gap-2">
      <div className="flex flex-col space-y-2">
        <h1 className="font-bold text-xl">En Attente</h1>
        <Table Headers={Headers} Data={Students}/>
      </div>
      <div className="flex flex-col space-y-2">
        <h1 className="font-bold text-xl">En Stage</h1>
        <Table Headers={Headers} Data={Students}/>
      </div>
      
    </div>
  )
}

export default StudentManager