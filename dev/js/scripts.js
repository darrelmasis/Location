import { getData } from './modules/core'
import { search } from './modules/core'
import { createCustomElement, select, addAttributes} from './modules/dom'

const customerList = select('customersList', 'id')
const searchInput = select('search', 'id')
let dataUrl = '../../dist/json/customers.json'

getData(dataUrl)
.then(result => {
  let data = result.customers
  let limit = 5

  
  searchInput.addEventListener('keyup', () => {
    let query = searchInput.value
    let queryResponse = ''
    query != '' ? queryResponse = search(query, data) : null

    queryResponse.length < limit ? limit = queryResponse.length : null

    if(customerList.hasChildNodes()) {
      while (customerList.childNodes.length >= 1) {
        customerList.removeChild(customerList.firstChild)
      }
    }
    
    if (queryResponse.length) {
      for (let i = 0; i <= limit; i++) {
        let customer = queryResponse[i]
        // console.log(customer.name)
        let listItem = createCustomElement('div', { class: 'list-group-item list-group-item-action text-start'}, [customer.name])
        customerList.appendChild(listItem)
  
      }
    } else if(query != '') {
      customerList.style.display = "block"
    }
  })
})