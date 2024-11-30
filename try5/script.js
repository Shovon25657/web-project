/// Function to fetch and parse the CSV from GitHub
async function fetchUniversities() {
  const url = "https://raw.githubusercontent.com/endSly/world-universities-csv/master/world-universities.csv"; // Raw CSV file URL

  try {
    // Fetch the CSV content
    const response = await fetch(url);
    const csvText = await response.text();

    // Split the CSV text into lines
    const lines = csvText.split('\n');
    
    // Remove the header line (optional)
    lines.shift(); // Remove the first line if it's the header

    const universityList = document.getElementById('universityList');
    
    // Process each line (university data)
    lines.forEach((line, index) => {
      const universityData = line.split(',');

      // Ensure the line has all the expected fields (Country code, University name, Website)
      if (universityData.length === 3) {
        const country = universityData[0];
        const name = universityData[1];
        const website = universityData[2];
        
        // Create a card for each university
        const universityCard = document.createElement('div');
        universityCard.classList.add('col-md-4');
        universityCard.innerHTML = `
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">${index + 1}. ${name}</h5>
              <p class="card-text">Country: ${country}</p>
              <p class="card-text">Website: <a href="${website}" target="_blank">${website}</a></p>
            </div>
          </div>
        `;
        universityList.appendChild(universityCard);
      }
    });

  } catch (error) {
    console.error('Error fetching CSV:', error);
  }
}

// Event Listener for Document Load
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('universityList')) {
    fetchUniversities();
  }
});





// Dynamic form fields based on university type
function handleDynamicFields() {
  const universityTypeSelect = document.getElementById("universityType");
  const additionalFields = document.getElementById("additionalFields");

  if (!universityTypeSelect || !additionalFields) return;

  universityTypeSelect.addEventListener("change", function () {
    additionalFields.innerHTML = ""; // Clear existing fields
    if (this.value === "Local") {
      additionalFields.innerHTML = `
          <div class="mb-3">
              <label>University Type (Private/Public):</label>
              <select class="form-control" id="universityCategory">
                  <option>Private</option>
                  <option>Public</option>
              </select>
          </div>
          <div class="mb-3">
              <label>Tuition Budget Range:</label>
              <input type="text" class="form-control" id="tuitionBudget">
          </div>
          <div class="mb-3">
              <label>Preferred Teaching Language:</label>
              <input type="text" class="form-control" id="teachingLanguage">
          </div>
          <div class="mb-3">
              <label>Evening/Weekend Classes:</label>
              <select class="form-control" id="eveningClasses">
                  <option>Yes</option>
                  <option>No</option>
              </select>
          </div>`;
    } else if (this.value === "International") {
      additionalFields.innerHTML = `
          <div class="mb-3">
              <label>Desired Course Name:</label>
              <input type="text" class="form-control" id="courseName">
          </div>
          <div class="mb-3">
              <label>Language Proficiency Scores:</label>
              <input type="text" class="form-control" id="languageScores">
          </div>
          <div class="mb-3">
              <label>Budget Preferences:</label>
              <input type="text" class="form-control" id="budgetPreferences">
          </div>
          <div class="mb-3">
              <label>Scholarship Eligibility:</label>
              <select class="form-control" id="scholarshipEligibility">
                  <option>Yes</option>
                  <option>No</option>
              </select>
          </div>`;
    }
  });

  // Trigger initial load of dynamic fields
  universityTypeSelect.dispatchEvent(new Event("change"));
}

// Form handlers for login and signup
function setupFormHandlers() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('input[type="email"]').value;
      const password = loginForm.querySelector('input[type="password"]').value;

      if (email && password) {
        alert("Login Successful! (This is a dummy validation)");
        bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();
      } else {
        alert("Please enter both email and password.");
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fullName = signupForm.querySelector('input[type="text"]').value;
      const email = signupForm.querySelector('input[type="email"]').value;
      const password = signupForm.querySelector('input[type="password"]').value;

      if (fullName && email && password) {
        alert("Account Created Successfully! (This is a dummy validation)");
        bootstrap.Modal.getInstance(document.getElementById("signupModal")).hide();
      } else {
        alert("Please fill in all required fields.");
      }
    });
  }
}

// Smooth scrolling for navigation
function enableSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

// Document Ready
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("universityList")) {
    fetchUniversities();
  }
  handleDynamicFields();
  setupFormHandlers();
  enableSmoothScrolling();
});