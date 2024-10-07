// Load Categories
const loadPestCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayPetsCategories(data.categories));
}

// Load All Pets
const loadAllPets = (a) => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => displayAllPets(data.pets, a));
}

// Load Pets By Id
const loadPetsById = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(data => displayPetsDetails(data.petData))
}

// Load Pets By Categories
const displayPetsByCategories = (category) => {

    const loadingSpiner = document.getElementById('loading-spiners');
    loadingSpiner.classList.remove('hidden');


    setTimeout(function () {
        fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
            .then(res => res.json())
            .then(data => {
                removePrevButtonColor();
                const btnCategory = document.getElementById(`btn-${category}`);
                btnCategory.classList.add('active')
                displayAllPets(data.data)
            })

    }, 2000)

}
// Remove Previous Button Style
const removePrevButtonColor = () => {
    const prevColor = document.getElementsByClassName('active-button');
    for (let button of prevColor) {
        button.classList.remove('active')
    }
}

// Display Categories
const displayPetsCategories = (petsCategories) => {
    const petCategoriesContainer = document.getElementById('pet-categories-container');
    petsCategories.forEach(petCategory => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button id="btn-${petCategory.category}" onclick= "displayPetsByCategories('${petCategory.category}')" class="border-2 active-button font-bold rounded-lg px-4 py-2 md:px-8 md:py-4">${petCategory.category}</button>
        `
        petCategoriesContainer.appendChild(div);

    })
}

// Display All Pets
const displayAllPets = (pets, isSort) => {
    if (isSort) {
        pets.sort(function (a, b) {
            return b.price - a.price;
        })
    }
    const petsContainer = document.getElementById('pets-container');
    petsContainer.innerHTML = "";
    if (pets.length < 1) {
        const div = document.createElement('div');
        div.classList.add('col-span-3');
        div.classList.add('mt-20');
        div.classList.add('space-y-8');
        div.innerHTML = `
        <div class="w-full space-y-2">
            <div class="flex justify-center">
                <img class="" src="../assets/error.webp" alt="error" />
            </div>
        <div>
        <h2 class="text-center text-2xl font-bold">No Information Available</h2>
        <p class="text-center md:w-7/12 m-auto">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
        
        `
        petsContainer.appendChild(div);
    }
    pets.forEach(pet => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card card-compact bg-base-100 shadow-xl p-4 border-2">
                <figure>
                    <img class="w-full h-[200px] object-cover rounded-lg" src=${pet.image} alt="Pet" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${pet.pet_name}</h2>
                    <p><i class="fa-solid fa-list"></i> Breed: ${pet.breed || "Not Available"}</p>
                    <p><i class="fa-solid fa-cake-candles"></i> Birth: ${pet.date_of_birth || "Not Available"}</p>
                    <p><i class="fa-solid fa-person-half-dress"></i> Gender: ${pet.gender || "Not Available"}</p>
                    <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price || "Not Available"}</p>
                    <div class="card-actions justify-start items-center text-[#0E7A81]">
                        <button onclick="collectImages('${pet.image}')" class=" border-2 px-4 py-2 rounded-md"><i class="fa-solid fa-thumbs-up"></i></button>
                        <button onclick="adoptPets()" class=" border-2 font-bold hover:text-white hover:bg-[#0E7A81] px-4 py-2 rounded-md">Adopt</button>
                        <button onclick="loadPetsById(${pet.petId})" class=" border-2 font-bold  hover:text-white hover:bg-[#0E7A81] px-4 py-2 rounded-md">Details</button>
                    </div>
                </div>
            </div>
        `
        petsContainer.appendChild(div);
    })

    const loadingSpiner = document.getElementById('loading-spiners');
    loadingSpiner.classList.add('hidden')
}

// Pets Image Collection
const collectImages = (img) => {
    const imageContainer = document.getElementById('images-container');
    const div = document.createElement('div');
    div.innerHTML = `
    <img class="w-full rounded-md" src=${img} alt="pets_images" />
    `
    imageContainer.appendChild(div);
}

// Display Pets Details
const displayPetsDetails = (details) => {
    console.log(details);

    const cusmotModal = document.getElementById('custom-modal');
    cusmotModal.innerHTML = `
    <img class="w-full" src=${details.image} />
    <h3 class="text-2xl font-bold">${details.pet_name}</h3>
    <div class="flex justify-between">
        <div>
            <p><i class="fa-solid fa-list"></i> Breed: ${details.breed || "Not Available"}</p>
            <p><i class="fa-solid fa-person-half-dress"></i> Gender: ${details.gender || "Not Available"}</p>
            <p><i class="fa-solid fa-virus"></i> Vaccinated: ${details.vaccinated_status || "Not Available"}</p>
        </div>
        <div>
            <p><i class="fa-solid fa-cake-candles"></i> Birth: ${details.date_of_birth || "Not Available"}</p>
            <p><i class="fa-solid fa-dollar-sign"></i> Price: ${details.price || "Not Available"}</p>
        </div>
    </div>
    <h3 class="text-2xl font-bold">Details Information</h3>
    <p>${details.pet_details}</p>
    `

    document.getElementById('my_modal_5').showModal();

}

function adoptPets() {
    const modal = document.getElementById('my_modal');
    const counter = document.getElementById('counter');
    let countdown = 3; // Set your countdown time here

    modal.showModal();

    const interval = setInterval(() => {
        countdown--;
        counter.textContent = countdown;

        if (countdown <= 0) {
            clearInterval(interval);
            modal.close(); // Close the modal
            window.location.href = "../index.html"
        }
    }, 1000); // Update every second
}

// Sorting By Value
const handlesort = () => {
    loadAllPets(true);
}


loadPestCategories();
loadAllPets();