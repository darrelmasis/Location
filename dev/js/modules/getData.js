const getData = url => {
  let response = fetch(url)
  .then(response => response.json())

  return response
}

export {getData}