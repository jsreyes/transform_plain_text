import * as React from 'react'
import { connect } from 'react-redux';

// Importando componentes
import Card from '../components/Card'
import Container from '../components/Container'
import UploadFileForm from '../components/form/UploadFileForm'
import Table from '../components/Table'
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
    {departaments ? <Table array={departaments}/> : ''}
    {provinces ? <Table array={provinces}/> : ''}
    {districts ? <Table array={districts}/> : ''}
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
