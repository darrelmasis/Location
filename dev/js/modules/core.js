/**
 * Obtiene datos de un archivo JSON
 * @param {string} url la ruta del archivo JSON
 * @returns promise
 */
const getData = url => {
  let response = fetch(url)
  .then(response => response.json())
  return response
}

/**
 * 
 * @param {string} query criterio de búsqueda
 * @param {array} data data a procesar
 * @returns array
 */
const search = (query, data) => {
  let expression = new RegExp(`${query}`, 'i')
  let queryResponse = data.filter(result => expression.test(result.name) )
  return queryResponse
}

export {getData, search}
