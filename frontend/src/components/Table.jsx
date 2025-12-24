import React, { useState } from 'react'

const Table = ({Headers, Data}) => {

  const [hovered, setHovered] = useState(null)

  return (
    <>
      <table className='bg-white w-full outline outline-gray-200 rounded-lg select-none'>
        <thead className="bg-tertiary">
          <tr className=" [&>th]:p-2 [&>th]:font-bold [&>th]:text-left [&>th]:text-sm">
            {Headers.map(h=>(
              <th key={h?.key}>{h?.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            Data.map((row,i)=>(
              <tr 
              className="[&>td]:p-2 [&>td]:text-left [&>td]:font-light [&>td]:text-sm [&>td]:border-t [&>td]:border-gray-200"
              onMouseEnter={()=>setHovered(i)}
              onMouseLeave={()=>setHovered(null)}
              >
                {Headers.map(col=>(
                  <td key={col?.key}>{col?.val(row)}</td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default Table