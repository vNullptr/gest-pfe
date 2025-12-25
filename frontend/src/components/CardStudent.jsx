import React, {useEffect, useState} from 'react'
import Window from './Window'
import api from '../api/axios'

const CardStudent = ({Data}) => {

    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [isAssignOpen, setIsAssignOpen] = useState(false)
    
    const [Documents, setDocuments] = useState(null)
    const [Supervisors, setSupervisors] = useState([])
    const [selectedSupervisor, setSelectedSupervisor] = useState(null)

    const activeStage = Data?.stages?.find(s => s?.statut === 0)
    
    const fetchDocument = async ()=>{
        try {
            const resp = await api.get(`api/stage/${Data?.id}/doc`)
            setDocuments(resp.data)
        } catch (err) {
            setDocuments({nom_fichier:"Fichier introuvable !"})
        }
    }

    const fetchSupervisors = async ()=>{
        try {
            const resp = await api.get(`api/Supervisors`)
            setSupervisors(resp.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        if (isDetailsOpen) fetchDocument()
    }, [isDetailsOpen])

        useEffect(()=>{
        if (isAssignOpen) fetchSupervisors()
    }, [isAssignOpen])
    

    const handleAssigning = async (e) =>{
        e.preventDefault()
        try{
            const resp = await api.patch(
                `/api/stage/${activeStage?.id}/supervisor`,
                {"id_encadrant":selectedSupervisor}
            )
            setIsAssignOpen(false)
        } catch(err){ 
            console.log(err)
        }
        setSelectedSupervisor(null)
    }

  return (
    <>
        <div className="bg-white rounded-xl border border-gray-200 p-3 space-y-1 flex flex-col justify-evenly">
            <h1 className="text-xl font-bold">{Data?.prenom} {Data?.nom}</h1>
            <h2 className="text-gray-600 mb-5">Entreprise : {activeStage?.entreprise}</h2>
            <div className="flex flex-row space-x-1">
            <button className="w-4/5 px-2 py-1 bg-primary text-white rounded-md hover:bg-[#037fc7] transition-all duration-200" onClick={()=>setIsAssignOpen(Data?.id)}>Assigner</button>
            <button className="w-1/5 px-2 py-1 bg-white border border-gray-300 text-gray-600 rounded-md hover:bg-gray-300 transition-all duration-200" onClick={()=>setIsDetailsOpen(true)}>👁</button>
            </div>
        </div>

        {isDetailsOpen &&
            <Window Title="Informations">
                <div className="flex flex-col space-y-3 px-5 pb-5">
                        <div>
                            <h1 className="text-xl font-bold">{activeStage.entreprise}</h1>
                        </div>
                        <div>
                            <p>Nom : {Data?.nom}</p>
                            <p>Prénom : {Data?.prenom}</p>
                            <p>Numero : {Data?.telephone}</p>
                        </div>
                        <div>
                            <p>Debut : {activeStage?.debut}</p>
                            <p>Fin : {activeStage?.fin}</p>
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-black mb-2">Documents</h1>
                            <div className="min-h-15 w-full rounded-lg border border-gray-200 flex flex-row justify-between items-center p-2">
                                <a className="text-primary cursor-pointer">{Documents?.nom_fichier || "Chargement..."}</a>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <button className="p-2 bg-white border border-gray-300 text-gray-600 rounded-md hover:bg-gray-300 transition-all duration-200" onClick={()=>setIsDetailsOpen(false)}>Fermer</button>
                        </div>
                    </div>
            </Window>}
        {isAssignOpen &&
            <Window Title="Assigner un encadrant">
                <form className="flex flex-col space-y-3 px-5 pb-5" onSubmit={handleAssigning}>
                    <div className="relative">
                        <label className="absolute -top-2.5 left-3 text-[0.8em] bg-white text-gray-500 px-1">Encadrant</label>
                        <select className="border border-gray-200 rounded-md outline-none p-1 w-full min-h-9 text-gray-600" onChange={(e)=>setSelectedSupervisor(e.target.value)}>
                            <option></option>
                            {Supervisors.map((sup)=>(
                                <option value={sup?.id}>Prof. {sup?.prenom} {sup?.nom}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                        <button className="p-2 bg-white border border-gray-300 text-gray-600 rounded-md hover:bg-gray-300 transition-all duration-200" onClick={()=>setIsAssignOpen(false)}>Annuler</button>
                        <button className="p-2 bg-primary text-white rounded-md hover:bg-[#037fc7] transition-all duration-200" type="submit">Appliquer</button>
                    </div>
                </form>
            </Window>
        }  
    </>
  )
}

export default CardStudent