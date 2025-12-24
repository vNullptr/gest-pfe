import React, { useState, useEffect } from 'react'
import Table from '../Table'
import api from '../../api/axios'
import { EditIcon } from '../../assets/icons'

const StudentTrackingView = () => {

    const [students, setStudents] = useState([])
    const [supervisors, setSupervisors] = useState([])
    const [selectedSupervisor, setSelectedSupervisor] = useState(null)
    const [editing, setEditing] = useState(null)
    
    const Headers = [
        {label:"Prénom", val:(data)=>(data?.prenom)},
        {label:"Nom", val:(data)=>(data?.nom)},
        {label:"Entreprise", val:(data)=>(data?.stages.find(s=>s?.statut === 1)?.entreprise)},
        {label:"Debut/Fin", val:(data)=>{
            const stage = data?.stages.find(s=>s?.statut === 1)
            return stage?.debut + " - " + stage?.fin
        }},
        {label:"Encadrant", val:(data)=>{
            const idx = data?.stages.find(s=>s?.statut === 1)?.id_encadrant
            const sp = supervisors.find(sup=>sup?.id===idx)
            return <div className="w-fit px-2 rounded-xl border border-gray-200">
               Prof. {sp?.prenom} {sp?.nom}
            </div>
        }},
        {label:"", val:(data)=>{
            return <div className="flex flex-row justify-end">
                <button onClick={()=>setEditing(data?.id)}>
                    <EditIcon className="w-5 h-5 text-gray-500 hover:text-gray-900"/>
                </button>
            </div>
        }}
    ]

    useEffect(()=>{
    const fetchData = async ()=>{
        try{
            const resp = await api.get("api/students/stages")
            setStudents(resp.data.filter(std=>std?.stages.find(s=>s?.statut === 1)))

            const respSup = await api.get(`api/supervisors`)
            setSupervisors(respSup.data)
        } catch(err){
            console.log(err)
        }
    }

    fetchData()

    },[])

    const handleEdit = async () =>{
        console.log(selectedSupervisor)
    }

  return (
    <div>
        <Table Headers={Headers} Data={students}/>
    </div>
  )
}

export default StudentTrackingView