import React, { useEffect, useState } from 'react'
import api from '../../api/axios'

const AccountForm = ({handleClose}) => {

    const [user, setUser] = useState({
        prenom:"",
        nom:"",
        telephone:"",
        email:"",
        role:null,
        groupe:null,
        password:""
    })

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            await api.post("api/users", user)
            handleClose()
        } catch (err){
            console.log(err)
        }
    }

  return (
    <div className="p-5">
        <form className="space-y-8" onSubmit={handleSubmit}>

            <div className="flex flex-row justify-between">
                <div className="relative">
                    <label className="absolute -top-2.5 left-3 text-[0.8em] bg-white text-gray-500 px-1">Prénom</label>
                    <input className="border border-gray-200 rounded-md outline-none p-1 min-w-70 min-h-9 text-gray-900" placeholder='Entrez ici' value={user?.prenom || ""} onChange={(e)=>{setUser(prev=>({...prev, prenom:e.target.value}))}}></input>
                </div>
                <div className="relative">
                    <label className="absolute -top-2.5 left-3 text-[0.8em] bg-white text-gray-500 px-1">Nom</label>
                    <input className="border border-gray-200 rounded-md outline-none p-1 min-w-70 min-h-9 text-gray-900" placeholder='Entrez ici' value={user?.nom || ""} onChange={(e)=>{setUser(prev=>({...prev, nom:e.target.value}))}}></input>
                </div>
            </div>

            <div className="relative">
                <label className="absolute -top-2.5 left-3 text-[0.8em] bg-white text-gray-500 px-1">Telephone</label>
                <input className="border border-gray-200 rounded-md outline-none p-1 w-full min-h-9 text-gray-900" placeholder='Entrez ici' value={user?.telephone || ""} onChange={(e)=>setUser(prev=>({...prev, telephone:e.target.value}))}></input>
            </div>
            
            <div className="relative">
                <label className="absolute -top-2.5 left-3 text-[0.8em] bg-white text-gray-500 px-1">Email</label>
                <input className="border border-gray-200 rounded-md outline-none p-1 w-full min-h-9 text-gray-900" placeholder='Entrez ici' value={user?.email || ""} onChange={(e)=>setUser(prev=>({...prev, email:e.target.value}))}></input>
            </div>
            
            <div className="relative">
                <label className="absolute -top-2.5 left-3 text-[0.8em] bg-white text-gray-500 px-1">Role</label>
                <select className="border border-gray-200 rounded-md outline-none p-1 w-full min-h-9 text-gray-900" onChange={(e)=>setUser(prev=>({...prev, role:Number(e.target.value)}))}>
                    <option value={2}>Responsable</option>
                    <option value={1}>Professeur</option>
                    <option value={0}>Etudiant</option>
                </select>
            </div>
            
            {user?.role == 0 &&
                <div className="relative">
                    <label className="absolute -top-2.5 left-3 text-[0.8em] bg-white text-gray-500 px-1">Groupe</label>
                    <input type="number" className="border border-gray-200 rounded-md outline-none p-1 w-fit min-h-9 text-gray-900" min={0} value={user?.groupe || ""} onChange={(e)=>setUser(prev=>({...prev, groupe:Number(e.target.value)}))} placeholder='Entrez ici'></input>
                </div>
            }
            
            <div className="relative">
                <label className="absolute -top-2.5 left-3 text-[0.8em] bg-white text-gray-500 px-1">Mots de passe</label>
                <input className="border border-gray-200 rounded-md outline-none p-1 w-full min-h-9 text-gray-900" type="password" value={user?.password||""} onChange={(e)=>setUser(prev=>({...prev, password:e.target.value}))} placeholder='Entrez ici'></input>
            </div>

            <div className="flex flex-row justify-between">
                <button className="p-2 bg-white border border-gray-300 text-gray-600 rounded-md hover:bg-gray-300 transition-all duration-200" onClick={handleClose}>Annuler</button>
                <button className="p-2 bg-primary text-white rounded-md hover:bg-[#037fc7] transition-all duration-200" type="submit">Enregister</button>
            </div>
        </form>
    </div>
  )
}

export default AccountForm