import './App.css';

import { History } from 'history'
import * as React from 'react';
import { Route } from 'react-router'

// Contenedores
import UploadFile from './container/UploadFile'

// Creando interface para APP
interface IAppProps {
 history: History
}

class App extends React.Component<IAppProps> {

 public state = {
  loading: true,
 }

 public componentDidMount() {
    if (/\app\/./.test(location.pathname)) {
     const { history } = this.props
     history.push('/')
    }
   // tslint:disable-next-line:no-console
   this.setState({
    loading: false
   })
 }

 public render() {
  return (
  <div>
    <Route exact={true} path='/' component={UploadFile} />
   </div>
  );
 }
}

export default App;
