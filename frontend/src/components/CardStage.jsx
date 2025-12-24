import React, { useEffect, useState } from 'react'
import { EyeIcon } from '../assets/icons/index'
import Window from './Window'
import api from '../api/axios'

const CardStage = ({Data}) => {

    const [showButton, setshowButton] = useState(true)
    const [viewing, setViewing] = useState(false)
    const [documents, setDocuments] = useState(null)
    const [supervisor, setSupervisor] = useState(null)
    const statusStyles = [
        {label:"En Attente", style:"bg-blue-200 ring-blue-600 text-blue-800"},
        {label:"En Cours", style:"bg-amber-200 ring-amber-600 text-amber-800"},
        {label:"Terminé", style:"bg-green-200 ring-green-600 text-green-800"},
    ]

    const fetchDetails = async ()=>{

        try {
            const resp = await api.get(`api/stage/${Data?.id}/doc`)
            setDocuments(resp.data)
            
            if (Data?.id_encadrant !== null){
                const respEnc = await api.get(`api/users/${Data?.id_encadrant}`)
                setSupervisor(respEnc.data)
            }
        } catch (err){
            if (err.response.status){
                setDocuments({nom_fichier:"Fichier introuvable !"})
            }
        }

        
    }

  return (
    <>
        <div className="bg-white w-full border border-gray-200 py-2 rounded-lg flex flex-row justify-between" onMouseEnter={()=>setshowButton(true)} onMouseLeave={()=>setshowButton(false)}>
            <div className="p-2">
                <div className="flex flex-row items-center space-x-3">
                    <h1 className="text-2xl font-bold">{Data?.entreprise}</h1>
                    <span className={`px-2 ring rounded-full text-sm ${statusStyles[Data?.statut].style}`}>{statusStyles[Data?.statut].label}</span>
                </div>
                <h1 className="text-md text-gray-400">{Data?.debut} - {Data?.fin}</h1>
            </div>
            { showButton &&
            <div className="p-5 flex flex-row justify-end items-center">
                <button className="flex items-center underline cursor-pointer" onClick={()=>{setViewing(true); fetchDetails()}}>
                    <EyeIcon className="text-primary w-8 h-6 opacity-50 hover:opacity-100 transition-all duration-100"/>
                </button>
            </div>
            }
        </div>
        {
            viewing &&
            <Window Title={"Détails"}>
                <div className="flex flex-col space-y-3 px-5 pb-5">
                    <div className="flex flex-row space-x-3 items-center">
                        <h1 className="text-xl font-bold">{Data?.entreprise}</h1>
                        <span className={`px-2 ring rounded-full text-sm ${statusStyles[Data?.statut].style}`}>{statusStyles[Data?.statut].label}</span>
                    </div>
                    <div>
                        <p>Debut : {Data?.debut}</p>
                        <p>Fin : {Data?.fin}</p>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-black">Encadrant</h1>
                        <div className="border border-gray-200 rounded-full w-fit px-2">{Data?.statut == 0? "Non assigné":`Prof. ${supervisor?.prenom} ${supervisor?.nom}`}</div>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-black">Documents</h1>
                        <div className="min-h-15 w-full rounded-lg border border-gray-200 flex flex-row justify-between items-center p-2">
                            <a className="text-primary cursor-pointer">{documents?.nom_fichier || "Chargement..."}</a>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <button className="p-2 bg-white border border-gray-300 text-gray-600 rounded-md hover:bg-gray-300 transition-all duration-200" onClick={()=>setViewing(false)}>Fermer</button>
                    </div>
                </div>
            </Window>
        }
    </>
  )
}

export default CardStage