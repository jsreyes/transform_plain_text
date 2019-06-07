import * as React from 'react';

// import { faMapMarkedAlt,faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// definiendo estilos para Button
const style = {
 link: {
  color: '#555',
  textDecoration: 'none'
 },
 navbar: {
  borderBottom: 'solid 1px #aaa',
  padding: '10px 15px',
 },
}

export default class NavBar extends React.Component{
 public render() {
  return (
   <div style={style.navbar}>
    <div style={style.link}> Belatrix Test</div>
    <div style={{ float: 'right' }}>
     <div style={style.link} > Salir</div>
    </div>
   </div>
  )
 }
}

