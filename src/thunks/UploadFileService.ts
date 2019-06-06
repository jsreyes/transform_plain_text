import { AnyAction, Dispatch } from 'redux';

// Creando acciones
const UPLOAD_FILE = '[UPLOAD_FILE] Upload File'
const UPLOAD_FILE_SUCCESS = '[UPLOAD_FILE] Upload File Success'
const UPLOAD_FILE_FAIL = '[UPLOAD_FILE] Upload File Fail'

// Interface de UploadFile
export interface IUploadFile {
 data?: any,
 file: File,
}

// Funciones de las acciones
const fetchUploadFile = (file: File) => ({
 file,
 type: UPLOAD_FILE,
})

const fetchUploadFileSuccess = (data: any) => ({
 data,
 type: UPLOAD_FILE_SUCCESS,
})

const fetchUploadFileError = (error: Error) => ({
 error,
 type: UPLOAD_FILE_FAIL,
})

// Estado inicial
const initialState = {
 data: [],
 file: undefined
}

export default function reducer(state = initialState, action: AnyAction) {
 switch (action.type) {
  case UPLOAD_FILE:
   return {
    ...state,
    file: action.file
   }

  case UPLOAD_FILE_SUCCESS:
   return {
    ...state,
    data: action.data,
   }

  case UPLOAD_FILE_FAIL:
   return {
    ...state,
    data: action.payload
   }

  default:
   return state
 }
}

// Thunk para subir archivo
export const uploadFile = ({ file }: IUploadFile) =>
  async (dispatch: Dispatch, getState: () => any) => {
    dispatch(fetchUploadFile(file))

         // tslint:disable-next-line:no-console
         console.log(file, ' llego el file')

    const formData = new FormData();

    formData.append('file', file);

    const url = 'http://localhost:5000/read';
    try {
     const result = await fetch(url, {
      body: formData,
      method: 'POST', 
     })
      .then((response) => {
       return response.json();
      })
      .then((data) => {
       return data;
      });
  
     const dataResponse = {
      data: result
     }
  
     dispatch(fetchUploadFileSuccess(dataResponse))
  
    } catch (error) {
     // tslint:disable-next-line:no-console
     console.log(error, ' este es el error')
     dispatch(fetchUploadFileError(error))
    }

}

