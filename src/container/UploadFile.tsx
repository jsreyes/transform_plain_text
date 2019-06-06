import * as React from 'react'
import { connect } from 'react-redux';

// Importando componentes
import Card from '../components/Card'
import Container from '../components/Container'
import UploadFileForm from '../components/form/UploadFileForm'
import Title from '../components/Title'

import { IUploadFile, uploadFile as uploadFileThunk } from '../thunks/UploadFileService'

interface IUploadFileProps {
 uploadFile: (a: IUploadFile) => void
}

class UploadFile extends React.Component<IUploadFileProps> {
 public render() {
  const { uploadFile } = this.props
  return (
   <Container center={true}>
    <Card>
     <Title>Iniciar Sesión</Title>
      <UploadFileForm onSubmit={uploadFile}/>
    </Card>
   </Container>
  )
 }
}

const mapStateToProps = (state: any) => state

const mapDispatchToProps = (dispatch: any) => ({
  uploadFile: (payload: any) => dispatch(uploadFileThunk(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadFile)
