import React from 'react'

const Table = ({tableHead, rowData}) => {

  const listElements = []
  for (let i = 0; i < 10; i++) {
    listElements.push(
    <tr className="[&>td]:p-2 [&>td]:text-left [&>td]:font-light [&>td]:text-sm [&>td]:border-t [&>td]:border-gray-200">
      <td>Data</td>
      <td>Data</td>
      <td>Data</td>
      <td>Data</td>
    </tr>)
  }

  return (
    <>
      <table className='bg-white w-full outline outline-gray-200 rounded-lg select-none'>
        <thead className="bg-tertiary">
          <tr className=" [&>td]:p-2 [&>td]:font-bold [&>td]:text-left [&>td]:text-sm">
            <td className="rounded-tl-lg">Head</td>
            <td>Head</td>
            <td>Head</td>
            <td className="rounded-tr-lg">Head</td>
          </tr>
        </thead>
        <tbody>
          {listElements}
        </tbody>
      </table>
    </>
  )
}

export default Table