import React, { useEffect, useState } from 'react'
import api from '../../api/axios';

const StageForm = ({onClose}) => {

  const [stage, setStage] = useState(null);
  const [file, setFile] = useState(null);
  const [isDragging, setDragging] = useState(false);
  const [error, setError] = useState(null)

  const handleDrop = (e)=>{
    e.preventDefault()
    setError(null)
    setDragging(false)

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile)
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if (stage?.entreprise && stage?.debut && stage?.fin && file){

      const formData = new FormData()
      formData.append('entreprise', stage?.entreprise)
      formData.append('debut', stage?.debut)
      formData.append('fin', stage?.fin)
      formData.append('document', file)

      api.post("api/stage", formData)
      .then(() => onClose())
      .catch(err => {
        if (err.response?.status === 422) {
          setError("Mauvais fichier !")
        }
      })
 
    } else {
      setError("Champ requis manquant")
    }
  }

  return (
    <div className="p-5">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="relative">
            <label className="absolute -top-2.5 left-3 text-[0.8em] bg-white text-gray-500 px-1">Entreprise</label>
            <input className="border border-gray-200 rounded-md outline-none p-1 min-w-70 min-h-9 text-gray-900" placeholder='Entrez ici' value={stage?.entreprise || ""} onChange={(e)=>{setStage(prev =>({...prev, entreprise:e.target.value})); setError(null)}}></input>
          </div>

          <div className="flex flex-row items-center justify-between space-x-5">
            <div className="relative">
              <label className="absolute -top-2.5 left-3 text-[0.8em] bg-white text-gray-500 px-1">Debut</label>
              <input type="date" className="border border-gray-200 rounded-md outline-none p-1 min-w-70 min-h-9 text-gray-600" value={stage?.debut || ""} onChange={(e)=>{setStage(prev =>({...prev, debut:e.target.value})); setError(null)}}></input>
            </div>
            <div className="relative">
              <label className="absolute -top-2.5 left-3 text-[0.8em] bg-white text-gray-500 px-1">Fin</label>
              <input type="date" className="border border-gray-200 rounded-md outline-none p-1 min-w-70 min-h-9 text-gray-600" min={stage?.debut || ""} value={stage?.fin || ""} onChange={(e)=>{setStage(prev =>({...prev, fin:e.target.value})); setError(null)}}></input>
            </div>
          </div>

          <div>
            <h1 className="text-lg font-semibold text-black">Documents</h1>
            <h2 className="text-gray-500 text-sm">Glissez vos documents ici !</h2>
            <div 
            className={`min-h-100 border-3 ${isDragging ? "border-primary" : "border-gray-200"} border-dashed rounded-lg bg-gray-100 p-5 mt-2 flex items-center justify-center relative`}
            onDragEnter={()=>setDragging(true)}
            onDragLeave={()=>setDragging(false)}
            onDrop={handleDrop}
            >
              {file ?
                <p className={`text-lg text-primary absolute`}>{file.name}</p>
                :
                <p className={`text-lg ${isDragging ? "text-primary" : "text-gray-500"} absolute`}>Glissez ici ou cliquez !</p>
              }
              <input className=" h-full w-full absolute top-0 left-0 cursor-pointer text-transparent" type="file" onChange={(e)=>setFile(e.target.files[0])}></input>
            </div>
          </div>

          {error && <p className="text-red-600"> {error} </p>}

          <div className="flex flex-row justify-between">
            <button className="p-2 bg-white border border-gray-300 text-gray-600 rounded-md hover:bg-gray-300 transition-all duration-200" onClick={onClose}>Annuler</button>
            <button className="p-2 bg-primary text-white rounded-md hover:bg-[#037fc7] transition-all duration-200" type="submit">Enregister</button>
          </div>
          
        </form>
    </div>
  )
}

export default StageForm