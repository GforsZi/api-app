const axios = require('axios/dist/browser/axios.cjs');
const apiUrl = "http://localhost:3030";

const requestUrl = `${apiUrl}/api/v1/users/`
const container = document.querySelector("#container");

fetch(requestUrl)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Request failed with status code: " + response.status);
    }
  })
  .then(datas => {
    const dataraw = datas.v1.data;
    
    dataraw.forEach(data => {
      container.innerHTML = `${data.email} </br> ${data.name} </br> ${data.job} </br>`;
    });
  })
  .catch(error => {
    console.error("An error occurred:", error.message);
  });
