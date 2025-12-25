import React from 'react'

const KPECard = ({text, value}) => {
  return (
    <div className="bg-white flex flex-col items-start rounded-xl p-5 border border-gray-200 cursor-default">
        <h1 className="text-3xl font-semibold text-left">{value}</h1>
        <h1 className="text-sm font-medium text-gray-500 text-left">{text}</h1>
    </div>
  )
}

export default KPECard