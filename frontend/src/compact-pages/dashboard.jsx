import React from 'react'

const Dashboard = () => {

  return (
    <div className="p-5 flex flex-col">
      <h1 className="font-bold text-3xl text-black">Tableau de bord</h1>
      <div className="grid grid-cols-4 gap-5 py-3">
        <div className="bg-white flex flex-col justify-between items-center rounded-xl col-span-1 p-2 border border-gray-200">
          <h1 className="font-semibold text-xl text-gray-700 text-left w-full">Nb. d'etudiant</h1>
          <h1 className="text-3xl font-semibold">{0}</h1>
        </div>
      </div>
    </div>
  )
}

export default Dashboard