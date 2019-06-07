import * as React from 'react';

import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// definiendo estilos para Button
const style = {
 link: {
  color: '#555',
  textDecoration: 'none'
 },
 navbar: {
  backgroundColor: 'darkseagreen',
  borderBottom: 'solid 1px #aaa',
  borderRadius: '5px',
  padding: '10px 15px',
 },
}

export default class NavBar extends React.Component{
 public render() {
  return (
   <div style={style.navbar}>
    <div style={style.link}><FontAwesomeIcon icon={faFileUpload} /> Belatrix Test</div>
   </div>
  )
 }
}

