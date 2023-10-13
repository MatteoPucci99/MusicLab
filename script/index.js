// CREO GLI ELEMENTI

const createCards = (products) => {
  const row = document.getElementById("row");
  products.forEach((el, index) => {
    const newCol = document.createElement("div");
    newCol.classList.add("col", "col-8", "col-md-4", "col-lg-3");
    newCol.innerHTML = `
<div class="card mb-3">
    <img
        src="${el.imageUrl}"
        class="card-img-top"
        alt="product-img${index}"
    />

    <div class="card-body">
      <h5 class="card-title">${el.brand}</h5>
      <p class="card-text text-decoration-underline">${el.name}</p>
      <p class="card-text">
      ${el.description} <span class="ms-3">${el.price}</span>
      </p>
      <div class="d-flex flex-column flex-xl-row">
      <a href="./backoffice.html?productId=${el._id}" class="mb-3 me-xl-2 btn btn-warning">Modifica</a>
      <a href="./details.html?productId=${el._id}" class="mb-3 me-xl-2 btn btn-info">Scopri di più</a>

      </div>
    </div>

  </div>`;

    row.appendChild(newCol);
  });
};
// RECUPERO LO SPINNER PER NASCONDERLO UNA VOLTA CARICATA LA PAGINA
const spinner = document.getElementById("spinner");
// FUNZIONE PER NASCONDERLO
const hideSpinner = () => {
  spinner.classList.add("d-none");
};

// RECUPERO GLI ELEMENTI
const getProducts = () => {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmJiMjEzOWM0MzAwMTg4MTQ1OTMiLCJpYXQiOjE2OTcxODQ2OTAsImV4cCI6MTY5ODM5NDI5MH0.etX-8Ir9d-lMF3J7nJE5VrwIwYK-0uoEDTcPJZwqlHM",
    },
  })
    .then((res) => {
      hideSpinner();
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Si è verificato un errore!");
      }
    })
    .then((data) => {
      console.log(data);
      createCards(data);
    })
    .catch((err) => {
      hideSpinner();
      console.log(err);
    });
};

getProducts();
