import { AnyAction, Dispatch } from 'redux';

// Creando acciones
const UPLOAD_FILE = '[UPLOAD_FILE] Upload File'
const UPLOAD_FILE_SUCCESS = '[UPLOAD_FILE] Upload File Success'
const UPLOAD_FILE_FAIL = '[UPLOAD_FILE] Upload File Fail'

// Interface de UploadFile
export interface IUploadFile {
 data?: {},
 file: File,
}

// Funciones de las acciones
const fetchUploadFile = () => ({
 type: UPLOAD_FILE,
})

const fetchUploadFileSuccess = (payload: any) => ({
 payload,
 type: UPLOAD_FILE_SUCCESS,
})

const fetchUploadFileError = (error: Error) => ({
 error,
 type: UPLOAD_FILE_FAIL,
})

// Estado inicial
const initialState = {
 data: {},
 file: undefined
}

export default function reducer(state = initialState, action: AnyAction) {
 switch (action.type) {
  case UPLOAD_FILE:
   return {
    ...state,
   }

  case UPLOAD_FILE_SUCCESS:
   return {
    ...state,
    data: action.payload,
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
  async (dispatch: Dispatch, getState: () => any, { auth }: any) => {

     console.log('config');
}

