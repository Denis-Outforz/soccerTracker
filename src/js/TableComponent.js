// TableComponent.js
import React, { useState } from 'react'
import '../css/TableComponent.css'

const TableComponent = ({ tableData, setTableData, onRowClick }) => {
  const [deleteId, setDeleteId] = useState(null)

  const handleDeleteClick = (id) => {
    setDeleteId(id)
  }

  const handleDeleteConfirm = () => {
    setTableData((prevData) => prevData.filter((data) => data.id !== deleteId))
    setDeleteId(null)
  }

  const handleDeleteCancel = () => {
    setDeleteId(null)
  }

  const downloadJson = () => {
    const jsonData = JSON.stringify(tableData, null, 2)
    const blob = new Blob([jsonData], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'football_data.json'
    link.click()
  }

  // Функция для скачивания данных в формате CSV
  const downloadCsv = () => {
    const csvData = tableData.map((data) => {
      return `${data.id},${data.period},${data.team},${data.playerNumber},${data.time},${data.x},${data.y},${data.event},${data.typeEvent},${data.subType}`
    })

    const csvContent = [
      'ID,Period,Team,Player Number,Time,X,Y,Event,Type Event,Sub Type',
      ...csvData,
    ].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'football_data.csv'
    link.click()
  }

  const handleClearTable = () => {
    setTableData([])
  }

  return (
    <div className="table-container">
      <div className="download-buttons">
        <button onClick={downloadJson}>Download JSON</button>
        <button onClick={downloadCsv}>Download CSV</button>
        <button onClick={handleClearTable}>Clear Table</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Half</th>
            <th>Team</th>
            <th>Player Number</th>
            <th>Time Video</th>
            <th>X</th>
            <th>Y</th>
            <th>Event</th>
            <th>Type Event</th>
            <th>Sub Type</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => (
            <tr key={data.id} onClick={() => onRowClick(data.time)}>
              <td>
                <span className="delete-icon" onClick={() => handleDeleteClick(data.id)}>
                  {deleteId === data.id ? (
                    <>
                      <span className="confirm-delete" onClick={handleDeleteConfirm}>
                        &#10003;
                      </span>
                      <span className="cancel-delete" onClick={handleDeleteCancel}>
                        &#10005;
                      </span>
                    </>
                  ) : (
                    'X'
                  )}
                </span>
                {data.id}
              </td>
              <td>{data.half}</td>
              <td>{data.team}</td>
              <td>{data.playerNumber}</td>
              <td>{data.time}</td>
              <td>{data.x ? data.x.toFixed(2) : ''}</td>
              <td>{data.y ? data.y.toFixed(2) : ''}</td>
              <td>{data.event}</td>
              <td>{data.typeEvent}</td>
              <td>{data.subType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableComponent
