import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import Dashboard from '../compact-pages/dashboard'
import Inventory from '../compact-pages/inventory'
import {homeIcon, usersIcon, reportIcon, meetingIcon} from '../assets/icons/index'
import api from "../api/axios"
import { useNavigate } from 'react-router-dom'

const Main = () => {

  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const checkLogin = async ()=>{
    try{
      const response = await api.get("/user/check");
      setUser(response.data)
    } catch(err){
      setUser(null)
      navigate("/login")
    } finally {
      setLoading(false)
    }
  }

  // logs in
  useEffect(()=>{
    checkLogin()
  },[])

  //check if loaded
  useEffect(()=>{
    if (user) {
      setLoading(false)
    }
  },[user])

  const [currentPage, setcurrentPage] = useState(0)

  const pages = [
    {name:"Tableau de bord", icon:homeIcon, roles:[1,2,3]},
    {name:"Etudiants", icon:usersIcon, roles:[2,3]},
    {name:"Rapports", icon:reportIcon, roles:[1,2,3]},
    {name:"Soutenances", icon:meetingIcon, roles:[2,3]},
  ]
  
  const allowedPages = user ? pages.filter(page=>page.roles.includes(user.role)) : [];
  console.log(user)

  const compactPages = [
    Dashboard,
    Inventory
  ]

  const Placeholder = () => (
    <div className="p-6 text-center text-accent opacity-50">Page not implemented yet</div>
  )

    if (loading){
    return (
      <div className="">
        Loading ...
      </div>
    )
  }

  const PageComponent = compactPages[currentPage] ?? Placeholder


  return (
    <div className="flex flex-row">
      <Navbar pageList={allowedPages} page={currentPage} changePage={setcurrentPage} />
      <div className="flex flex-col min-h-screen w-full">
          <div className="h-[10%] border-b border-accent">
            
          </div> 
          <div className="h-[90%]">
            <div className="bg-gray-100 w-full h-full overflow-hidden">
              <PageComponent userData={user}/>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Main