import * as React from 'react';

// Definiendo estilos para Input
const styleTable = {
  cell: {
    border: '1px solid black',
  },
  row: {
    border: '1px solid black',
  },
  table: {
    border: '1px solid black',
    borderCollapse: 'collapse',
    marginBottom: '15px',
    textAlign: 'center'
  } as React.CSSProperties,
  
} 
interface ITableProps {
 array: [],
 ubigeo: string
}

const Table: React.StatelessComponent<ITableProps> = props => {
 const { array, ubigeo } = props
 return (
  <div> {ubigeo}
  <table style={styleTable.table}>
      <thead>
        <tr>
          <th style={styleTable.cell}>Código</th>
          <th style={styleTable.cell}>Nombre</th>
          <th style={styleTable.cell}>Código Padre</th>
          <th style={styleTable.cell}>Descripción Padre</th>
        </tr>
      </thead>
      <tbody>
      {array ? array.map((d: any) => 
        <tr key={d.cod} style={styleTable.row}>
          <td style={styleTable.cell}>{d.cod}</td>
          <td style={styleTable.cell}>{d.nombre}</td>
          <td style={styleTable.cell}>{d.codPa ? d.codPa : '-'}</td>
          <td style={styleTable.cell}>{d.nomPadre ? d.nomPadre : '-'}</td>
        </tr>
      ) : ''}
      </tbody>
    </table>
  </div>
 )
}

export default Table


