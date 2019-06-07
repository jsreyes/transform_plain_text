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
     let departaments: any = [];
     let provinces: any = [];
     const districts: any = [];

     result.map((ubigeo: string) => {
      const dep = ubigeo.split(' ');
       if(result.indexOf(ubigeo) % 3 === 0 ) {
        departaments.push({cod: dep[0], nombre: dep[1]});
       } else if(result.indexOf(ubigeo) % 3 === 1) {
        // tslint:disable-next-line:no-console
        console.log(result[result.indexOf(ubigeo)-1], ' este es el padre');
        const padre = result[result.indexOf(ubigeo)-1].split(' ');
        provinces.push({cod: dep[0], nombre: dep[1], codPa: padre[0], nomPadre: padre[1]})
       } else if(result.indexOf(ubigeo) % 3 === 2) {
        const padre = result[result.indexOf(ubigeo)-1].split(' ');
        districts.push({cod: dep[0], nombre: dep[1], codPa: padre[0], nomPadre: padre[1]})
       }
    });
    
    const a = new Set(departaments.map(JSON.stringify));
    departaments = Array.from(a);
    // departaments = [...a]

    provinces = provinces.filter((item: any, pos: any,) => {
      // tslint:disable-next-line:no-console
      console.log(item, ' este es item');
            // tslint:disable-next-line:no-console
            console.log(provinces[pos], ' esta es la posicion');
       // tslint:disable-next-line:no-console
       console.log(provinces.indexOf(item.code), ' esta es la index of');
      return item !== provinces[pos]
    })

      // tslint:disable-next-line:no-console
      console.log(departaments, ' este es el arreglo de departamentos');
      // // tslint:disable-next-line:no-console
      // console.log(, ' este es el arreglo de departamentos');
      // tslint:disable-next-line:no-console
      console.log(provinces.filter(Boolean), ' este es el arreglo de provincias');
      // tslint:disable-next-line:no-console
      console.log(districts, ' este es el arreglo de distritos');

    //  const departaments = ['Lima', 'Arequipa'];
    //  const districts = ['Distrito 1', 'Distrito 2'];
    //  const provinces = ['Provincia 1', 'Provincia 2'];
  
     dispatch(fetchUploadFileSuccess(departaments, provinces, districts))
  
    } catch (error) {
     // tslint:disable-next-line:no-console
     console.log(error, ' este es el error')
     dispatch(fetchUploadFileError(error))
    }
}

