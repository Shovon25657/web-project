// Dummy University Data
const universityData = {
  local: [
      {
          name: "State University of Technology",
          location: "New York",
          type: "Public",
          programs: ["Computer Science", "Engineering", "Business"],
          gpaRequirement: 3.2,
          tuition: "$15,000 - $25,000"
      },
      {
          name: "Metropolitan Private College",
          location: "California",
          type: "Private",
          programs: ["Arts", "Media Studies", "Design"],
          gpaRequirement: 3.5,
          tuition: "$35,000 - $45,000"
      }
  ],
  international: [
      {
          name: "University of London",
          country: "United Kingdom",
          programs: ["International Business", "Law", "Economics"],
          languageRequirement: {
              IELTS: 6.5,
              TOEFL: 90
          },
          tuition: "£20,000 - £35,000"
      },
      {
          name: "Toronto Institute",
          country: "Canada",
          programs: ["Computer Engineering", "Data Science", "Management"],
          languageRequirement: {
              IELTS: 6.0,
              TOEFL: 80
          },
          tuition: "$25,000 - $40,000"
      }
  ]
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const localSearchForm = document.getElementById('localSearchForm');
  const internationalSearchForm = document.getElementById('internationalSearchForm');
  const searchResults = document.getElementById('searchResults');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  // Local University Search Handler
  localSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const location = e.target.location.value.toLowerCase();
      const programType = e.target.programType.value;

      const results = universityData.local.filter(uni => 
          uni.location.toLowerCase().includes(location) &&
          uni.programs.includes(programType)
      );

      displaySearchResults(results, 'Local');
  });

  // International University Search Handler
  internationalSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const country = e.target.country.value.toLowerCase();
      const languageScore = e.target.languageScore.value;

      const results = universityData.international.filter(uni => 
          uni.country.toLowerCase().includes(country)
      );

      displaySearchResults(results, 'International');
  });

  // Search Results Display Function
  function displaySearchResults(results, type) {
      searchResults.innerHTML = '';

      if (results.length === 0) {
          searchResults.innerHTML = `
              <div class="alert alert-warning">
                  No ${type} universities found matching your criteria.
              </div>
          `;
          return;
      }

      results.forEach(uni => {
          const resultCard = document.createElement('div');
          resultCard.classList.add('card', 'mb-3');
          resultCard.innerHTML = `
              <div class="card-body">
                  <h5 class="card-title">${uni.name}</h5>
                  <p class="card-text">
                      ${type === 'Local' ? 
                          `Location: ${uni.location}<br>
                           University Type: ${uni.type}<br>
                           Programs: ${uni.programs.join(', ')}<br>
                           GPA Requirement: ${uni.gpaRequirement}<br>
                           Tuition Range: ${uni.tuition}` :
                          `Country: ${uni.country}<br>
                           Programs: ${uni.programs.join(', ')}<br>
                           Language Requirements: 
                           IELTS: ${uni.languageRequirement.IELTS}, 
                           TOEFL: ${uni.languageRequirement.TOEFL}<br>
                           Tuition Range: ${uni.tuition}`
                      }
                  </p>
                  <button class="btn btn-primary me-2">Apply Now</button>
                  <button class="btn btn-info">More Details</button>
              </div>
          `;
          searchResults.appendChild(resultCard);
      });
  }

  // Login Form Handler
  loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = e.target.querySelector('input[type="email"]').value;
      const password = e.target.querySelector('input[type="password"]').value;

      // Basic validation
      if (email && password) {
          // In a real application, this would be an API call
          alert('Login Successful! (This is a dummy validation)');
          bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
      } else {
          alert('Please enter both email and password');
      }
  });

  // Signup Form Handler
  signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = e.target.querySelector('input[type="text"]').value;
      const email = e.target.querySelector('input[type="email"]').value;
      const password = e.target.querySelector('input[type="password"]').value;
      const academicLevel = e.target.querySelector('select').value;

      // Basic validation
      if (fullName && email && password) {
          // In a real application, this would be an API call
          alert('Account Created Successfully! (This is a dummy validation)');
          bootstrap.Modal.getInstance(document.getElementById('signupModal')).hide();
      } else {
          alert('Please fill in all required fields');
      }
  });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });
});

// Student Connection Feature (Placeholder)
function connectWithPeers() {
  alert('Student Connection Feature Coming Soon!');
}