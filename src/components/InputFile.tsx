import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

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
     <div><label>{label}</label>
     <div>
       <input
        type='file'
        accept='.txt'
        onChange={this.onChange}
       />
     </div>
     </div>
    )
}
}