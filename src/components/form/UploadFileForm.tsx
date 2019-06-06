import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form'

// Se importa el archivo con las validaciones
// import validate from '../../helpers/validators/validate'

// Importando componentes
import Button from '../Button'
import Center from '../Center'
import Input from '../Input'

class UploadFileForm extends React.Component<InjectedFormProps> {
 public render() {
  const { handleSubmit } = this.props
  return (
   <form onSubmit={handleSubmit}>
    <Field label="Archivo Plano" placeholder="Carga tu archivo plano" name="file" type="file" component={Input} />
    <Center>
      <Button block={'valid'}>Enviar</Button>
    </Center>
   </form>
  )
 }
}

export default reduxForm({
 form: 'uploadFile',
})(UploadFileForm)