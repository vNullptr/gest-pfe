import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import CardStudent from '../CardStudent'

const StudentValidationView = () => {

  const [students, setStudents] = useState([])

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const resp = await api.get("api/students/stages")
        setStudents(resp.data.filter(std=>std?.stages.find(s=>s?.statut === 0)))
      } catch(err){
        console.log(err)
      }
    }

    fetchData()
    
  },[])

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,200px))] gap-2">
      {students.map((std,index)=>(
        <CardStudent Data={std} />
      ))}
        
    </div>
  )
}

export default StudentValidationView