import * as React from 'react';

// // Definiendo estilos para Input
// const style = {
//  backgroundColor: '#fff',
//  border: '1px solid #eee',
//  borderRadius: '4px',
//  marginBottom: '10px',
//  padding: '10px 15px',
//  width: 'calc(100% - 30px)',
// }

// // Definiendo estilos para el span
// const spanStyle = {
//  color: '#777',
//  fontSize: '10px',
//  fontWeight: 900,
//  textTransform: 'uppercase'
// } as React.CSSProperties // Se indica a react que lo tome como propiedades Css, no como un objeto

interface ITableProps {
 array: []
}

const Table: React.StatelessComponent<ITableProps> = props => {
 const { array } = props
 return (
  <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Código Padre</th>
          <th>Descripción Padre</th>
        </tr>
      </thead>
      <tbody>
      {array ? array.map((d: any) => 
        <tr key={d.cod}>
          <td>{d.cod}</td>
          <td>{d.nombre}</td>
          <td>{d.codPa ? d.codPa : '-'}</td>
          <td>{d.nomPadre ? d.nomPadre : '-'}</td>
        </tr>
      ) : ''}
      </tbody>
    </table>
 )
}

export default Table


