import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

// Definiendo estilos para Input
const style = {
  backgroundColor: '#fff',
  border: '1px solid #eee',
  borderRadius: '4px',
  marginBottom: '10px',
  padding: '10px 15px',
  width: 'calc(100% - 30px)',
 }
 
 // Definiendo estilos para el span
 const spanStyle = {
  color: '#777',
  fontSize: '10px',
  fontWeight: 900,
  textTransform: 'uppercase'
 } as React.CSSProperties // Se indica a react que lo tome como propiedades Css, no como un objeto
 

interface IInputProps {
  placeholder?: string,
  label: string
 }

export default class FieldFileInput  extends React.Component<WrappedFieldProps & IInputProps>{
  constructor(props: any) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  public onChange(e: any) {
    const { input: { onChange } } = this.props
    onChange(e.target.files[0])
  }

  public render(){
    // const { input: { value } } = this.props
    const {label} = this.props  // whatever props you send to the component from redux-form Field
    return(
    <div>
     <span style={spanStyle}>{label}</span>
     <div>
       <input
        type='file'
        accept='.txt'
        onChange={this.onChange}
        style={style}
       />
     </div>
     </div>
    )
}
}