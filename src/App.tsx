import './App.css';

import { History } from 'history'
import * as React from 'react';
import { Route } from 'react-router'

// Contenedores
import NavBar from './components/NavBar';
import UploadFile from './container/UploadFile'

// Creando interface para APP
interface IAppProps {
 history: History
}

class App extends React.Component<IAppProps> {

 public render() {
  return (
  <div>
    <Route path='/' component={NavBar} />
    <Route exact={true} path='/' component={UploadFile} />
   </div>
  );
 }
}

export default App;
