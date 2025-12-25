import React, { useState } from 'react'

const Table = ({Headers, Data}) => {

  return (
    <>
      <table className='bg-white w-full outline outline-gray-200 rounded-lg select-none mb-[10%]'>
        <thead className="bg-tertiary">
          <tr className=" [&>th]:p-2 [&>th]:font-bold [&>th]:text-left [&>th]:text-sm">
            {Headers.map(h=>(
              <th key={h?.label}>{h?.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            Data ?
            Data.map((row,i)=>(
              <tr 
              className="[&>td]:p-2 [&>td]:text-left [&>td]:font-light [&>td]:text-sm [&>td]:border-t [&>td]:border-gray-200"
              >
                {Headers.map((col,index)=>(
                  <td key={index}>{col?.val(row)}</td>
                ))}
              </tr>
            ))
            :
            <tr>
            </tr>
          }
        </tbody>
      </table>
    </>
  )
}

export default Table