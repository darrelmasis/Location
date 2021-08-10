const getData = url => {
  let response = fetch(url)
  .then(response => response.json())

  return response
}

/**
 * 
 * @param {string} query 
 * @param {array} data 
 */
const search = (query, data) => {
  let expression = new RegExp(`${query}`, 'i')

  return data.filter(result => expression.test(result))
}

export {getData}