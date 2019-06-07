import { AnyAction, Dispatch } from 'redux';
import Utils from '../helpers/Utils';

// Creando acciones
const UPLOAD_FILE = '[UPLOAD_FILE] Upload File'
const UPLOAD_FILE_SUCCESS = '[UPLOAD_FILE] Upload File Success'
const UPLOAD_FILE_FAIL = '[UPLOAD_FILE] Upload File Fail'

// Interface de UploadFile
export interface IUploadFile {
 file: File,
 departaments?: string[],
 districts?: string[],
 error?: string
 provinces?: string[],
}

// Funciones de las acciones
const fetchUploadFile = (file: File) => ({
 file,
 type: UPLOAD_FILE,
})

const fetchUploadFileSuccess = (departaments: string[], provinces: string[], districts: string[]) => ({
 departaments,
 districts,
 provinces,
 type: UPLOAD_FILE_SUCCESS,
})

const fetchUploadFileError = (error: Error) => ({
 error,
 type: UPLOAD_FILE_FAIL,
})

// Estado inicial
const initialState = {
 departaments: undefined,
 districts: undefined,
 error: undefined,
 file: undefined,
 provinces: undefined,
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
    departaments: action.departaments,
    districts: action.districts,
    provinces: action.provinces,
   }

  case UPLOAD_FILE_FAIL:
   return {
    ...state,
    error: action.payload
   }

  default:
   return state
 }
}

// Thunk para subir archivo
export const uploadFile = ({ file }: IUploadFile) =>
  async (dispatch: Dispatch) => {
    // Despacha la accion de cargar archivo
    dispatch(fetchUploadFile(file))
    
    // Form data del file
    const formData = new FormData();
    formData.append('file', file);
    
    // Url del endpoint
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
  
     let departaments: any = [];
     let provinces: any = [];
     const districts: any = [];

     result.map((ubigeo: string) => {
      const dep = ubigeo.split(' ');
       if(result.indexOf(ubigeo) % 3 === 0 ) {
        departaments.push({cod: dep[0], nombre: dep[1]});
       } else if(result.indexOf(ubigeo) % 3 === 1) {
        // tslint:disable-next-line:no-console
        const padre = result[result.indexOf(ubigeo)-1].split(' ');
        if(dep[0] !== '') {
          provinces.push({cod: dep[0], nombre: dep[1], codPa: padre[0], nomPadre: padre[1]})
        }
       } else if(result.indexOf(ubigeo) % 3 === 2) {
        const padre = result[result.indexOf(ubigeo)-1].split(' ');
        districts.push({cod: dep[0], nombre: dep[2] ? dep[1] + ' ' + dep[2] : dep[1], codPa: padre[0], nomPadre: padre[1]})
       }
     });
    
    departaments = Utils.getUnique(departaments, 'cod');
    provinces = Utils.getUnique(provinces, 'cod');
  
    dispatch(fetchUploadFileSuccess(departaments, provinces, districts))
    } catch (error) {
     dispatch(fetchUploadFileError(error))
    }
}

