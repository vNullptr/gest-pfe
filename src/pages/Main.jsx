import React, { useState } from 'react'
import Navbar from '../components/navbar'
import Dashboard from '../compact-pages/dashboard'
import Inventory from '../compact-pages/inventory'
import {homeIcon, usersIcon, reportIcon, meetingIcon} from '../assets/icons/index'

const Main = () => {

  const [currentPage, setcurrentPage] = useState(0)
    const pages = [
      {name:"Tableau de bord", icon:homeIcon},
      {name:"Etudiants", icon:usersIcon},
      {name:"Rapports", icon:reportIcon},
      {name:"Soutenances", icon:meetingIcon},
    ]
    const compactPages = [
      Dashboard,
      Inventory
    ]

    const Placeholder = () => (
      <div className="p-6 text-center text-accent opacity-50">Page not implemented yet</div>
    )

    const PageComponent = compactPages[currentPage] ?? Placeholder


  return (
    <div className="flex flex-row">
      <Navbar pageList={pages} page={currentPage} changePage={setcurrentPage} />
      <div className="flex flex-col min-h-screen w-full">
          <div className="h-[10%] border-b border-accent">
            
          </div> 
          <div className="h-[90%]">
            <div className="bg-gray-100 w-full h-full overflow-hidden">
              <PageComponent/>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Main