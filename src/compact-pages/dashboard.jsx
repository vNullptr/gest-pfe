import React from 'react'

const Dashboard = () => {

  const tableHead = ["head1","head2","head3","head4"]
  /* dashboard will just have amounts of each stuff and a welcome text*/ 
  return (
    <div className="p-5 flex flex-col">
      <h1 className="font-bold text-3xl text-black">Tableau de bord</h1>
      <div className="flex flex-row gap-5">

        <div className="flex-1 my-5 h-50 bg-white rounded-xl border border-accent flex flex-col justify-between p-5">
        </div>

      </div>
    </div>
  )
}

export default Dashboard