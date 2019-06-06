import { AnyAction, Dispatch } from 'redux';

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
  async (dispatch: Dispatch, getState: () => any) => {
    dispatch(fetchUploadFile(file))

         // tslint:disable-next-line:no-console
        //  console.log(file, ' llego el file')

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
  
    //  const dataResponse = {
    //   data: result
    //  }
     // tslint:disable-next-line:no-console
     console.log(result.length);
     const x: string[] = []
     const y: string[] = []
     const z: string[] = []

     const d = result.map((departament: string) => result.indexOf(departament) % 3 === 0 ? x.push(departament) : undefined);
     const p = result.map((province: string) => result.indexOf(province) % 3 === 1 ? y.push(province) : undefined);
     const ds = result.map((district: string) => result.indexOf(district) % 3 === 2 ? z.push(district) : undefined);

      // tslint:disable-next-line:no-console
      console.log(d, p, ds, ' este es el arreglo de departamentos');
      // tslint:disable-next-line:no-console
      console.log(x, ' este es el arreglo de departamentos');
      // tslint:disable-next-line:no-console
      console.log(y, ' este es el arreglo de provincias');
      // tslint:disable-next-line:no-console
      console.log(z, ' este es el arreglo de distritos');

     const departaments = ['Lima', 'Arequipa'];
     const districts = ['Distrito 1', 'Distrito 2'];
     const provinces = ['Provincia 1', 'Provincia 2'];
  
     dispatch(fetchUploadFileSuccess(departaments, provinces, districts))
  
    } catch (error) {
     // tslint:disable-next-line:no-console
     console.log(error, ' este es el error')
     dispatch(fetchUploadFileError(error))
    }
}

