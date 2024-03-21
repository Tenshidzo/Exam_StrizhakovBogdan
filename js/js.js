const animalTypes = document.querySelectorAll('.animals-type a');
const animalCountries = document.querySelectorAll('.animals-country a');
animalTypes.forEach(type => {
    type.addEventListener('click', function(event) {
        event.preventDefault();
        const selectedType = this.getAttribute('href').substring(1);
        filterAnimalsByType(selectedType);
        setActiveLink(type);
    });
});

animalCountries.forEach(country => {
    country.addEventListener('click', function(event) {
        event.preventDefault();
        const selectedCountry = this.getAttribute('href').substring(1);
        filterAnimalsByCountry(selectedCountry);
        setActiveLink(country);
    });
});
function filterAnimalsByType(type) {
    const gallery = document.querySelector('.animal-gallery');
    gallery.innerHTML = '';
    
    animalsData.forEach(animal => {
     const animalType = animal.Type.toLowerCase();
    
     if (type === 'all' || animalType === type) {
      addAnimalToGallery(animal);
     }
    });
   }
    
   function filterAnimalsByCountry(country) {
    const gallery = document.querySelector('.animal-gallery');
    gallery.innerHTML = '';
    
    animalsData.forEach(animal => {
     const animalCountry = animal.Country.toLowerCase();
    
      if (country === 'all' || animalCountry === country) {
       addAnimalToGallery(animal);
      }
     });
    }
function addAnimalToGallery(animal) {
    const gallery = document.querySelector('.animal-gallery');
    const html = `
        <div class="col-md-6 mb-3 animal">
            <a href="#"><img src="img/animals/${animal.Image}" alt="" class="img-fluid d-block mx-auto my-3"></a>
            <ul class="list-unstyled text-center">
                <li>Name: ${animal.Name}</li>
                <li>Country: ${animal.Country}</li>
                <li>Age: ${animal.Age}</li>
            </ul>
        </div>
    `;
    gallery.insertAdjacentHTML('beforeend', html);
}
function setActiveLink(element) {
    const siblings = element.parentNode.querySelectorAll('a');
    siblings.forEach(sibling => {
        sibling.classList.remove('active');
    });
    element.classList.add('active');
}
const url = 'download/animals.json';
let animalsData = [];
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        animalsData = data;
        filterAnimals('all', 'all');
        addAnimalToGallery(animal);
        setActiveLink(document.querySelector('.animals-type a[href="#all"]'));
        setActiveLink(document.querySelector('.animals-country a[href="#all"]'));
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });