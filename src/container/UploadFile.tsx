import * as React from 'react'
import { connect } from 'react-redux';

// Importando componentes
import Card from '../components/Card'
import Container from '../components/Container'
import UploadFileForm from '../components/form/UploadFileForm'
import Title from '../components/Title'

import { IUploadFile, uploadFile as uploadFileThunk } from '../thunks/UploadFileService'

interface IUploadFileProps {
 uploadFile: (a: IUploadFile) => void,
 departaments?: any,
 districts?: any,
 provinces?: any
}

class UploadFile extends React.Component<IUploadFileProps> {
 public render() {
  const { uploadFile, departaments, provinces, districts } = this.props
  return (
   <Container center={true}>
    <Card>
     <Title>Read File</Title>
      <UploadFileForm onSubmit={uploadFile}/>                                    
    </Card>
    {departaments ? departaments.map((d: any) => 
        <table key={d.cod}>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Código Padre</th>
            <th>Descripción Padre</th>
          </tr>
          <tr>
            <td>{d.cod}</td>
            <td>{d.nombre}</td>
            <td>{d.codPa ? d.codPa : '-'}</td>
            <td>{d.nomPadre ? d.nomPadre : '-'}</td>
          </tr>
        </table>) : ''}
      {provinces ? provinces.map((p: any) => 
        <table key={p.cod}>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Código Padre</th>
          <th>Descripción Padre</th>
        </tr>
        <tr>
          <td>{p.cod}</td>
          <td>{p.nombre}</td>
          <td>{p.codPa ? p.codPa : '-'}</td>
          <td>{p.nomPadre ? p.nomPadre : '-'}</td>
        </tr>
      </table>) : ''}
      {districts ? districts.map((dis: any) => 
        <table key={dis.cod}>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Código Padre</th>
          <th>Descripción Padre</th>
        </tr>
        <tr>
          <td>{dis.cod}</td>
          <td>{dis.nombre}</td>
          <td>{dis.codPa ? dis.codPa : '-'}</td>
          <td>{dis.nomPadre ? dis.nomPadre : '-'}</td>
        </tr>
      </table>) : ''}      
   </Container>
  )
 }
}

const mapStateToProps = (state: any) => {
  const { UploadFile: { departaments, districts, provinces } } = state
  return {
    departaments,
    districts,
    provinces
  }
 }

const mapDispatchToProps = (dispatch: any) => ({
  uploadFile: (payload: any) => dispatch(uploadFileThunk(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadFile)
