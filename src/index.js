let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const url = 'http://localhost:3000/toys'
  fetch(url)
    .then(response => response.json())
    .then(toys => {
      toys.forEach(function (toyObject) {
        renderNewToy(toyObject)
        // ARTISINAL WAY
        // const div = document.createElement('div')
        // const h2 = document.createElement('h2')
        // const img = document.createElement('img')
        // const p = document.createElement('p')
        // const button = document.createElement('button')

        // div.classList.add('card')
        // h2.textContent = toyObject.name
        // img.src = toyObject.image
        // // img.classList.add('toy-avatar')
        // img.className = "toy-avatar"
        // p.textContent = toyObject.likes
        // button.className = "like-btn"
        // button.textContent = "Likes <3"

        // div.append(h2, img, p, button)

        // const toyCollection = document.querySelector("#toy-collection")
        // console.log(toyCollection)

        // toyCollection.append(div)

      })
    })

  const newToyForm = document.querySelector('.add-toy-form')
  newToyForm.addEventListener('submit', function (event) {
    event.preventDefault()
    console.log(event.target)
    const nameInput = event.target.name.value
    const imageInput = event.target.image.value
    const newToyObject = {
      name: nameInput,
      image: imageInput,
      likes: 0
    }

    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newToyObject)
    })
      .then(response => response.json())
      .then(newToyObject => {
        console.log(newToyObject)
        renderNewToy(newToyObject)
      })
    // .catch
    // response.ok
  })


  const toyCollectionDiv = document.querySelector('#toy-collection')
  console.log(toyCollectionDiv)
  toyCollectionDiv.addEventListener('click', function (event) {
    if (event.target.matches('.like-btn')) {
      const cardDiv = event.target.closest('.card')
      console.log(cardDiv)
      const id = cardDiv.dataset.id
      const pTag = cardDiv.querySelector('p')
      const newLikes = parseInt(pTag.textContent) + 1
      
      fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({likes: newLikes})
      })
      .then(response => response.json())
      .then(updatedToyObject => {
        console.log(updatedToyObject)
        pTag.textContent = `${updatedToyObject.likes} Likes`
      })
    }
  })


  function renderNewToy(toyObject) {
    // INNER HTML WAY
    const div = document.createElement('div')
    div.dataset.id = toyObject.id
    // <div data-id='2'></div>
    div.className = 'card'
    div.innerHTML = `
        <h2>${toyObject.name}</h2>
        <img src='${toyObject.image}' class="toy-avatar" />
        <p>${toyObject.likes} Likes </p>
        <button class="like-btn">Like <3</button>`

    const toyCollection = document.querySelector("#toy-collection")
    toyCollection.append(div)
  }

});
