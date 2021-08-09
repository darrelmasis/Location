import { getData } from "./modules/getData";

getData('../../dist/json/customers.json').then(data => {
  let customers = data.customers

  let customerData = customers.find(item => item.id == "H1128")

  console.log(customerData)

  let test = customers.filter(item => item.type == "Crédito" && item.seller == "H049")

  console.dir(test)

  // customers.forEach(customer => {
  // });

})


