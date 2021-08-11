import { getData } from './modules/core'
import { search } from './modules/core'
import { createCustomElement, select, addAttributes} from './modules/dom'

const customerList = select('customersList', 'id')
const searchInput = select('search', 'id')
let dataUrl = '../../dist/json/customers.json'

getData(dataUrl)
.then(result => {
  let data = result.customers
  let limit

  
  searchInput.addEventListener('input', () => {
    let query = searchInput.value
    let queryResponse = ''
    query != '' ? queryResponse = search(query, data) : null

    queryResponse.length < limit ? limit = queryResponse.length : limit = 5

    if(customerList.hasChildNodes()) {
      while (customerList.childNodes.length >= 1) {
        customerList.removeChild(customerList.firstChild)
      }
    }
    
    if (queryResponse.length > 0) {
      for (let i = 0; i <= limit; i++) {
        let customer = queryResponse[i];
        let content = createCustomElement('span', null, [`<span class="text-secondary">${customer.id} - </span> ${customer.name}`])
        let listItem = createCustomElement('a', {href: `./?q=${customer.id.toLowerCase()}`, class: 'list-group-item d-flex list-group-item-action border-0'}, [content])
        customerList.appendChild(listItem)
  
      }
    } else if(query != '') {
      customerList.style.display = "block"
    }

    customerList.addEventListener('click', e => {
      searchInput.value = e.target.innerText
    })
  })
})