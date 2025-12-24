import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import Dashboard from '../compact-pages/Dashboard'
import InternshipManager from '../compact-pages/InternshipManager'
import StudentManager from '../compact-pages/StudentManager'
import AccountManager from '../compact-pages/AccountManager'
import {HomeIcon, UsersIcon, LogoutIcon, UserIcon} from '../assets/icons/index'
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

  useEffect(()=>{
    checkLogin()
  },[])

  useEffect(()=>{
    if (user) {
      setLoading(false)
    }
  },[user])

  const [currentPage, setcurrentPage] = useState(0)

  const pages = [
    {name:"Tableau de bord", icon:HomeIcon, roles:[1,2,3], page:Dashboard},
    {name:"Mes Stages", icon:UsersIcon, roles:[0], page:InternshipManager},
    {name:"Validations", icon:UsersIcon, roles:[2], page:StudentManager},
    {name:"Comptes", icon:UserIcon, roles:[2], page:AccountManager},
  ]
  
  const allowedPages = user ? pages.filter(page=>page.roles.includes(user.role)) : [];

  const Placeholder = () => (
    <div className="p-6 text-center text-accent opacity-50">Page incomplete</div>
  )

    if (loading){
    return (
      <div className="w-screen h-screen flex items-center justify-center text-2xl">
        Loading ...
      </div>
    )
  }

  const PageComponent = allowedPages[currentPage]?.page ?? Placeholder

  const handleLogout = async ()=>{
    try{
      await api.post("/logout")
      setUser(null)
      navigate("/login")
    }catch(err){
      console.log(err)
    }
  }


  return (
    <div className="flex flex-row">
      <Navbar pageList={allowedPages} page={currentPage} changePage={setcurrentPage} />
      <div className="flex flex-col min-h-screen w-full">
          <div className="h-[5svh] border-b border-accent flex flex-row justify-end items-center p-5 space-x-2">
            <div className="flex flex-row items-center space-x-2 rounded-md border border-gray-200 px-2">
              <p>{user?.prenom} {user?.nom}</p>
              <span className="w-2 h-2 rounded-full bg-primary"></span>
            </div>
            <button className="hover:text-red-500 font-medium uppercase" onClick={handleLogout}>
              <LogoutIcon className="w-6 h-6"/>
            </button>
          </div> 
          <div className="h-fill">
            <div className="bg-gray-100 w-full h-[95svh] overflow-hidden">
              <PageComponent userData={user}/>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Main