import { getData } from "./modules/getData";
// import { search } from "./modules/getData";
/**
 * ***Tareas***
 * Módulo para crear elementos del DOM
 * Módulo de busqueda y respuesta
 * 
 */
const customersList = document.getElementById("customersList")
const searchInput = document.getElementById("search")

getData('../../dist/json/customers.json').then(data => {
  let data = data.customers
  
  searchInput.addEventListener('keyup', e => {
    console.log(e)

    // let queryResult = search()


    // let searchValue = search.value;
    // let expression = new RegExp(`${searchValue}.*`, "i")
    // let query = ''
    // if (searchValue != '') {
    //   query = customers.filter(customer => expression.test(customer.name))
    // customersList.style.display = "block"

    })

  //   if (customersList.hasChildNodes()) {
  //     while (customersList.childNodes.length >= 1) {
  //       customersList.removeChild(customersList.firstChild)
  //     }
  //   }

  //   if(query.length > 0) {
  //     let limit = 5;
  //     if(query.length < limit) {
  //       limit = query.length
  //     }
  //     for (let i = 0; i < limit; i++) {
  //       let customer = query[i];
  //       const listItem = document.createElement('span')
  //       listItem.style.cursor = "pointer"
  //       listItem.classList.add('list-group-item', 'list-group-item-action', 'text-start')
  //       listItem.textContent = `${customer.name}`
  //       customersList.appendChild(listItem)
  //     }
  //   } else if (search.value != '') {
  //     customersList.innerHTML = `<span class="text-danger py-3">No se encontró ningun resultado para: <span class="fw-bold">${search.value}</span></span>`
  //   }

  // })
  // customersList.addEventListener('click', e => {
  //   search.value = e.target.textContent
  //   customersList.style.display = "none"
  // })

})