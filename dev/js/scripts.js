import { getData } from "./modules/getData";

const customersList = document.getElementById("customersList")
const search = document.getElementById("search")

getData('../../dist/json/customers.json').then(data => {
  let customers = data.customers

  search.addEventListener('keyup', () => {
    let searchValue = search.value;
    let expression = new RegExp(`${searchValue}.*`, "i")
    let query = ''
    if (searchValue != '') {
      query = customers.filter(customer => expression.test(customer.name))
    }

    if (customersList.hasChildNodes()) {
      while (customersList.childNodes.length >= 1) {
        customersList.removeChild(customersList.firstChild)
      }
    }

    query.forEach(customer => {
      const listItem = document.createElement('a')
      listItem.setAttribute = 'href="#"'
      listItem.classList.add('list-group-item', 'list-group-item-action', 'text-start')
      listItem.textContent = `${customer.name} - ${customer.id}`
      customersList.appendChild(listItem)
    });
  })
})