document.addEventListener('DOMContentLoaded', () => {
  const universityListContainer = document.querySelector('.university-list');
  const universityTypeSelect = document.querySelector('#university-type');
  const localFilters = document.querySelector('#local-filters');
  const internationalFilters = document.querySelector('#international-filters');
  const searchForm = document.querySelector('#search-form');
  const searchResults = document.querySelector('#search-results');
  const mapContainer = document.querySelector('#map-container');
  const mapDiv = document.querySelector('#map');

  let map;

  // Toggle filters based on university type selection
  universityTypeSelect.addEventListener('change', () => {
      const universityType = universityTypeSelect.value;
      if (universityType === 'local') {
          localFilters.style.display = 'block';
          internationalFilters.style.display = 'none';
      } else if (universityType === 'international') {
          localFilters.style.display = 'none';
          internationalFilters.style.display = 'block';
      } else {
          localFilters.style.display = 'none';
          internationalFilters.style.display = 'none';
      }
  });

  // Initialize map
  function initMap(latitude = 51.505, longitude = -0.09) {
      if (map) {
          map.setView([latitude, longitude], 13);  // Reset map to new location
      } else {
          map = L.map('map').setView([latitude, longitude], 13);  // Create a new map
      }

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
  }

  // Function to fetch and display top universities
  async function fetchTopUniversities() {
      try {
          const response = await fetch('https://raw.githubusercontent.com/Hipo/university-domains-list/refs/heads/master/world_universities_and_domains.json');
          if (!response.ok) throw new Error('Failed to fetch universities');

          const universities = await response.json();

          // Clear placeholder content
          universityListContainer.innerHTML = '';

          // Display the first 10 universities dynamically
          universities.slice(0, 10).forEach((university) => { // Limit to top 10 universities
              const universityItem = document.createElement('div');
              universityItem.classList.add('university-item');
              universityItem.innerHTML = `
                  <h3>${university.name}</h3>
                  <p>Country: ${university.country}</p>
                  <p>Website: <a href="${university.web_pages[0]}" target="_blank">${university.web_pages[0]}</a></p>
              `;
              universityListContainer.appendChild(universityItem);
          });
      } catch (error) {
          universityListContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
      }
  }

  // Call the fetch function to populate the list on page load
  fetchTopUniversities();

  // Handle search form validation
  searchForm.addEventListener('submit', (e) => {
      const universityName = document.querySelector('#university-name').value.trim();
      const country = document.querySelector('#country').value;
      const fieldOfStudy = document.querySelector('#field-of-study').value.trim();

      if (!universityName && !country && !fieldOfStudy) {
          e.preventDefault();
          alert('Please fill out at least one search criterion!');
      }
  });

  // Handle search form submission
  searchForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Clear previous results
      searchResults.innerHTML = '<p>Searching...</p>';

      const formData = new FormData(searchForm);
      const searchParams = Object.fromEntries(formData);

      // Example search logic (you can replace this with an API call)
      console.log(searchParams); // Log search parameters for debugging

      setTimeout(() => {
          searchResults.innerHTML = `<p>No results found matching your criteria.</p>`;
      }, 1000);
  });

  // Show university location on the map
  function showUniversityLocation(lat, lng, uniName) {
      mapContainer.style.display = 'block';
      initMap(lat, lng);

      const marker = L.marker([lat, lng]).addTo(map);
      marker.bindPopup(`<b>${uniName}</b>`).openPopup();
  }

  // Simulated university data (you would fetch this in a real app)
  const universities = [
      { name: "Harvard University", country: "USA", lat: 42.373611, lng: -71.109733 },
      { name: "Oxford University", country: "UK", lat: 51.754816, lng: -1.254367 },
      { name: "University of Tokyo", country: "Japan", lat: 35.711634, lng: 139.767124 },
      { name: "University of Melbourne", country: "Australia", lat: -37.797627, lng: 144.960472 }
  ];

  // Example of filtering universities based on the search criteria
  searchForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const searchTerm = document.querySelector('#search-term').value.trim();
      searchResults.innerHTML = 'Searching...';

      const filteredUniversities = universities.filter((uni) => {
          return uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              uni.country.toLowerCase().includes(searchTerm.toLowerCase());
      });

      if (filteredUniversities.length === 0) {
          searchResults.innerHTML = `<p>No results found for "${searchTerm}".</p>`;
          return;
      }

      searchResults.innerHTML = filteredUniversities.map(uni => `
          <div class="university-item">
              <h3>${uni.name}</h3>
              <p>${uni.country}</p>
              <button class="show-location" data-lat="${uni.lat}" data-lng="${uni.lng}" data-name="${uni.name}">Show Location</button>
          </div>
      `).join('');

      // Add event listener to each "Show Location" button
      document.querySelectorAll('.show-location').forEach(button => {
          button.addEventListener('click', () => {
              const lat = button.getAttribute('data-lat');
              const lng = button.getAttribute('data-lng');
              const uniName = button.getAttribute('data-name');
              showUniversityLocation(lat, lng, uniName);
          });
      });
  });
});
