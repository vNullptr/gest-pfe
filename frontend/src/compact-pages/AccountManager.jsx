import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import api from '../api/axios'
import Window from '../components/Window'
import AccountForm from '../components/forms/AccountForm'
import AccountEditForm from '../components/forms/AccountEditForm'
import { EditIcon } from '../assets/icons'

const AccountManager = () => {

    const Roles = ["Etudiant", "Professeur", "Responsable"]
    const [users, setUsers] = useState([])
    const [adding, setAdding] = useState(false)
    const [editing, setEditing] = useState(null)
    const Headers = [
        {label:"ID", val:(data)=>(data?.id)},
        {label:"Prénom", val:(data)=>(data?.prenom)},
        {label:"Nom", val:(data)=>(data?.nom)},
        {label:"Telephone", val:(data)=>(data?.telephone)},
        {label:"Email", val:(data)=>(data?.email)},
        {label:"Role", val:(data)=>{
            return <div className="w-fit px-2 rounded-xl border border-gray-200">
                {Roles[data?.role]}
            </div>
        }},
        {label:"Groupe", val:(data)=>(data?.role===0?"G"+data?.groupe:"-")},
        {label:"", val:(data)=>{
            return <div className="flex flex-row justify-end">
                <button onClick={()=>setEditing(data?.id)}>
                    <EditIcon className="w-5 h-5 text-gray-500 hover:text-gray-900"/>
                </button>
            </div>
        }}
    ]
    useEffect(()=>{
        const fetchUsers = async ()=>{
            try{
                const resp = await api.get("/api/users")
                setUsers(resp.data)
            }catch(err){
                console.log(err)
            }
        }

        fetchUsers()
    }, [adding, editing])

  return (
    <div className={`p-5 ${adding || editing ? "overflow-y-clip":""}`}>
        <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl font-bold mb-5">Comptes utilisateur</h1>
            <button className="p-2 bg-primary text-white rounded-md hover:bg-[#037fc7] transition-all duration-200" onClick={()=>setAdding(true)}>Nouveau</button>
        </div>
        <Table Headers={Headers} Data={users}/>
        {
            adding &&
            <Window Title="Ajouter un utilisateur">
                <AccountForm handleClose={()=>setAdding(false)}/>
            </Window>
        }
        {
            editing !== null &&
            <Window Title="Modifier">
                <AccountEditForm handleClose={()=>setEditing(null)} currentUser={editing}/>
            </Window>
        }
    </div>
  )
}

export default AccountManager