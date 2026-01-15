import React from 'react'
import ReactDOM from 'react-dom/client'

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import './index.css'

type Habit = { title: string, dNeg1: number, dNeg2: number, total: number }


function App() {


  const columns = React.useMemo<ColumnDef<Habit>[]>(() =>
    
    [{ id: 'select', cell: () =>(<input type='checkbox'></input>)},

    {accessorKey: 'title', cell: info => info.getValue() },
    {accessorKey: 'dNeg1', header: '07/07' },
    {accessorKey: 'dNeg2', header: '06/07' },
    {accessorKey: 'total', header: 'total' }, ], [])


  const data = [
    {title: "test1", dNeg1: 1, dNeg2: 2, total: 18},
    {title: "test2", dNeg1: 1, dNeg2: 2, total: 18},
    {title: "test3", dNeg1: 1, dNeg2: 2, total: 18},
    {title: "test4", dNeg1: 1, dNeg2: 2, total: 18},
  ]

  //console.log(data)

  const table = useReactTable({
    data, columns, enableRowSelection: true, getCoreRowModel: getCoreRowModel(), debugTable: true, })

  return (
    <div className="TableContainer"><table className='border-none'>
      <thead>
        
        {table.getHeaderGroups().map(headerGroup => (<tr key={headerGroup.id}>{headerGroup.headers.map(header => {
        return (<th key={header.id} colSpan={header.colSpan}>{header.isPlaceholder ? null :
        (<>{flexRender( header.column.columnDef.header,header.getContext())}</>)}</th>)})}</tr>))}

      </thead>
        <tbody>

          {table.getRowModel().rows.map(row => {return (<tr key={row.id}>{row.getVisibleCells().map(cell => {return (
          <td key={cell.id}>{flexRender(cell.column.columnDef.cell,cell.getContext())}</td>)})}</tr>)})}

        </tbody>
      </table>
    </div>
  )
}




const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

ReactDOM.createRoot(rootElement).render(<App />)
