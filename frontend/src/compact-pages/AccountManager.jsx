import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import api from '../api/axios'
import Window from '../components/Window'
import AccountForm from '../components/forms/AccountForm'

const AccountManager = () => {

    const Roles = ["Etudiant", "Professeur", "Responsable"]
    const [users, setUsers] = useState([])
    const [adding, setAdding] = useState(false)
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
    }, [adding])

  return (
    <div className="p-5">
        <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl font-bold mb-5">Comptes utilisateur</h1>
            <button className="p-2 bg-primary text-white rounded-md hover:bg-[#037fc7] transition-all duration-200" onClick={()=>setAdding(true)}>Nouveau</button>
        </div>
        <Table Headers={Headers} Data={users}/>
        {
            adding &&
            <Window Title="Ajouter un utilisateur">
                <AccountForm onClose={()=>setAdding(false)}/>
            </Window>
        }
    </div>
  )
}

export default AccountManager