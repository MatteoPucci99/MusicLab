// INDICE RICHIAMO ELEMENTI DELLA PAGINA (FORM E INPUT & co.)
const form = document.getElementById("form");
const nameProduct = document.getElementById("name");
const descriptionProduct = document.getElementById("description");
const brandProduct = document.getElementById("brand");
const imgProduct = document.getElementById("imageUrl");
const priceProduct = document.getElementById("price");
const modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
const modalError = new bootstrap.Modal(document.getElementById("alertError"));
const textModalError = document.getElementById("alertText");
const secondModal = new bootstrap.Modal(
  document.getElementById("staticBackdrop2")
);
const confirmModal = document.querySelector("#staticBackdrop .show");

// RINTRACCIO L'ID DAL BARRA RICERCA
const addressBarContent = new URLSearchParams(location.search);
const productId = addressBarContent.get("productId");
console.log(productId);

// IF CONDITION PER LA productId
if (productId) {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmJiMjEzOWM0MzAwMTg4MTQ1OTMiLCJpYXQiOjE2OTcxODQ2OTAsImV4cCI6MTY5ODM5NDI5MH0.etX-8Ir9d-lMF3J7nJE5VrwIwYK-0uoEDTcPJZwqlHM",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        if (res.status === 404) {
          throw new Error("404 - Not Found");
        } else if (res.status === 403) {
          throw new Error("Forbidden");
        } else if (res.status === 401) {
          throw new Error("Unauthorized");
        } else if (res.status === 429) {
          throw new Error("Too Many Request");
        } else if (res.status === 500) {
          throw new Error("Internal Server Error");
        }
      }
    })
    .then((productData) => {
      //   console.log(productData);
      //   UPDATE DEI BUTTONS NELLA SESSIONE MODIFICA
      const newUpdateButton = document.getElementById("updateButton");
      const newDeleteButton = document.getElementById("deleteButton");
      newUpdateButton.innerText = "Modifica";
      newUpdateButton.classList.add("btn-warning");
      newDeleteButton.classList.remove("d-none");

      // COMPILO IL FORM CON I DATI RICEVUTI
      nameProduct.value = productData.name;
      descriptionProduct.value = productData.description;
      brandProduct.value = productData.brand;
      imgProduct.value = productData.imageUrl;
      priceProduct.value = productData.price;
    })
    .catch((err) => {
      textModalError.innerHTML = `${err}`;
      modalError.show();
    });
}

// FUNCTION PER ELIMINARE LA CARD DI CUI ABBIAMO IMPORTATO I DATI
const deleteCard = () => {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmJiMjEzOWM0MzAwMTg4MTQ1OTMiLCJpYXQiOjE2OTcxODQ2OTAsImV4cCI6MTY5ODM5NDI5MH0.etX-8Ir9d-lMF3J7nJE5VrwIwYK-0uoEDTcPJZwqlHM",
    },
  })
    .then((res) => {
      if (res.ok) {
        location.assign("./index.html");
      } else {
        if (res.status === 404) {
          throw new Error("404 - Not Found");
        } else if (res.status === 403) {
          throw new Error("Forbidden");
        } else if (res.status === 401) {
          throw new Error("Unauthorized");
        } else if (res.status === 429) {
          throw new Error("Too Many Request");
        } else if (res.status === 500) {
          throw new Error("Internal Server Error");
        }
      }
    })
    .catch((err) => {
      textModalError.innerHTML = `${err}`;
      modalError.show();
    });
};

// FUNCTION PER APRIRE IL MODALE 1
const showModal = () => {
  modal.show();
};
// FUNCTION PER APRIRE IL MODALE 2
const showSecondModal = () => {
  secondModal.show();
};

// FUNCTION CONFIRM FOR RESET
const confirmForReset = () => {
  resetForm();

  modal.hide();
};
// FUNCTION CONFIRM FOR DELETE
const confirmForDelete = () => {
  deleteCard();

  modal.hide();
};

//FUNCTION PER RESETTARE GLI INPUT DEL FORM
const resetForm = () => {
  nameProduct.value = "";
  descriptionProduct.value = "";
  brandProduct.value = "";
  imgProduct.value = "";
  priceProduct.value = "";
};

// RESET DEL FORM

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // IF CONDITIONS PER URL E METHOD DELLA FETCH
  let myMethod = "POST";
  let myUrl = "https://striveschool-api.herokuapp.com/api/product/";
  if (productId) {
    myMethod = "PUT";
    myUrl = "https://striveschool-api.herokuapp.com/api/product/" + productId;
  }

  // RECUPERO I VALUES DEL FORM
  //   Qui c'erano i .value, se esplode qualcosa per un non so qualche motivo, RIMETTILI QUI!

  // CREO L'OGGETTO PRODUCTS CON I VALORI CORRENTI DEL FORM

  const newProduct = {
    name: nameProduct.value,
    description: descriptionProduct.value,
    brand: brandProduct.value,
    imageUrl: imgProduct.value,
    price: priceProduct.value,
  };

  fetch(myUrl, {
    method: myMethod,
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmJiMjEzOWM0MzAwMTg4MTQ1OTMiLCJpYXQiOjE2OTcxODQ2OTAsImV4cCI6MTY5ODM5NDI5MH0.etX-8Ir9d-lMF3J7nJE5VrwIwYK-0uoEDTcPJZwqlHM",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("Prodotto inviato correttamente!");
      } else {
        if (res.status === 404) {
          throw new Error("404 - Not Found");
        } else if (res.status === 403) {
          throw new Error("Forbidden");
        } else if (res.status === 401) {
          throw new Error("Unauthorized");
        } else if (res.status === 429) {
          throw new Error("Too Many Request");
        } else if (res.status === 500) {
          throw new Error("Internal Server Error");
        }
      }
    })
    .catch((err) => {
      textModalError.innerHTML = `${err}`;
      modalError.show();
    });
});
