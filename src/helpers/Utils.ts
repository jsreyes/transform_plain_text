export default class Utils {

  public static getUnique(arr: any, comp: any) {

    const unique = arr
      .map((e: any) => e[comp])

      // Almacena las llaves de los objetos unicos
      .map((e: any, i: any, final: any) => final.indexOf(e) === i && i)

      // Elimina las llaves ignoradas y almacena los objetos unicos
      .filter((e: any) => arr[e]).map((e: any) => arr[e]);

    return unique;
  }
}