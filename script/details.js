// RINTRACCIO L'ID DALLA BARRA DI RICERCA
const addressBarContent = new URLSearchParams(location.search);
const productId = addressBarContent.get("productId");
console.log(productId);

//  IF CONDITION PER LA productId
//  RICEVO I DATI DALLA productId E MODIFICO L'HTML
fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmJiMjEzOWM0MzAwMTg4MTQ1OTMiLCJpYXQiOjE2OTcxODQ2OTAsImV4cCI6MTY5ODM5NDI5MH0.etX-8Ir9d-lMF3J7nJE5VrwIwYK-0uoEDTcPJZwqlHM",
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((data) => {
    const col = document.getElementById("col");
    col.innerHTML = `<div class="card mb-3">
    <img
      src="${data.imageUrl}"
      class="card-img-top"
      alt="product-img-${productId}"
    />

    <div class="card-body">
      <h5 class="card-title">${data.name}</h5>
      <p class="card-text text-decoration-underline">${data.brand}</p>
      <p class="card-text">
        ${data.description}
        
      </p>
      <p class="mb-3">Al prezzo di: ${data.price}$</p>
      <div class="d-flex flex-column flex-xl-row">
        <a href="./index.html" class="mb-3 me-xl-2 btn btn-success"
          >Torna a Home</a
        >
      </div>
    </div>
  </div>`;
  })
  .catch((err) => {
    console.log(err);
  });
