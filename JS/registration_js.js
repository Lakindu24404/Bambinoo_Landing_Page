let currentSection = 0;
const totalSections = 7;

// Set today's date
document.getElementById('registrationDate').value = new Date().toISOString().split('T')[0];

// Load saved data from localStorage on page load
function loadFromLocalStorage() {
    const fields = [
        'childName', 'childDOB', 'nationality', 'childNumber', 'language',
        'motherName', 'motherDOB', 'birthLocation', 'birthHospital',
        'deliveryType', 'birthWeight', 'birthLength', 'headCircumference',
        'personnelType', 'personnelName', 'livingAddress'
    ];

    fields.forEach(field => {
        const savedValue = localStorage.getItem(`bambinooo_${field}`);
        if (savedValue) {
            document.getElementById(field).value = savedValue;
        }
    });

    // Handle radio buttons for surgery
    const savedSurgery = localStorage.getItem('bambinooo_surgery');
    if (savedSurgery) {
        if (savedSurgery === 'Yes') {
            document.getElementById('surgeryYes').checked = true;
        } else {
            document.getElementById('surgeryNo').checked = true;
        }
    }

    // Handle checkbox
    const savedAgree = localStorage.getItem('bambinooo_agreeTerms');
    if (savedAgree === 'true') {
        document.getElementById('agreeTerms').checked = true;
        agreeWrapper.classList.add('checked');
        startBtn.disabled = false;
    }
}

// Save to localStorage whenever user types
function saveToLocalStorage(fieldId, value) {
    localStorage.setItem(`bambinooo_${fieldId}`, value);
}

// Attach event listeners to all form fields
function attachSaveListeners() {
    const fields = [
        'childName', 'childDOB', 'nationality', 'childNumber', 'language',
        'motherName', 'motherDOB', 'birthLocation', 'birthHospital',
        'deliveryType', 'birthWeight', 'birthLength', 'headCircumference',
        'personnelType', 'personnelName', 'livingAddress'
    ];

    fields.forEach(field => {
        const element = document.getElementById(field);
        element.addEventListener('input', function() {
            saveToLocalStorage(field, this.value);
        });
        element.addEventListener('change', function() {
            saveToLocalStorage(field, this.value);
        });
    });

    // Handle radio buttons
    const surgeryRadios = document.querySelectorAll('input[name="surgery"]');
    surgeryRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                saveToLocalStorage('surgery', this.value);
            }
        });
    });
}

// Load data when page loads
window.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
    attachSaveListeners();
    setupConfirmCheckbox();
});

// Agreement checkbox handler
const agreeCheckbox = document.getElementById('agreeTerms');
const agreeWrapper = document.getElementById('agreeWrapper');
const startBtn = document.getElementById('startBtn');

agreeCheckbox.addEventListener('change', function() {
    startBtn.disabled = !this.checked;
    if (this.checked) {
        agreeWrapper.classList.add('checked');
        saveToLocalStorage('agreeTerms', 'true');
    } else {
        agreeWrapper.classList.remove('checked');
        saveToLocalStorage('agreeTerms', 'false');
    }
});

agreeWrapper.addEventListener('click', function(e) {
    if (e.target !== agreeCheckbox) {
        agreeCheckbox.checked = !agreeCheckbox.checked;
        agreeCheckbox.dispatchEvent(new Event('change'));
    }
});

startBtn.addEventListener('click', function() {
    nextSection();
});

// Setup confirm checkbox for review section
function setupConfirmCheckbox() {
    const confirmCheckbox = document.getElementById('confirmCorrect');
    const confirmWrapper = document.getElementById('confirmWrapper');
    const finalSubmitBtn = document.getElementById('finalSubmitBtn');

    confirmCheckbox.addEventListener('change', function() {
        finalSubmitBtn.disabled = !this.checked;
        if (this.checked) {
            confirmWrapper.classList.add('checked');
        } else {
            confirmWrapper.classList.remove('checked');
        }
    });

    confirmWrapper.addEventListener('click', function(e) {
        if (e.target !== confirmCheckbox) {
            confirmCheckbox.checked = !confirmCheckbox.checked;
            confirmCheckbox.dispatchEvent(new Event('change'));
        }
    });
}

function validateSection(section) {
    const sectionElement = document.getElementById(`section${section}`);
    const inputs = sectionElement.querySelectorAll('input[required], select[required], textarea[required]');
    let valid = true;

    inputs.forEach(input => {
        if (input.type === 'radio') {
            const radioGroup = sectionElement.querySelectorAll(`input[name="${input.name}"]`);
            const isChecked = Array.from(radioGroup).some(radio => radio.checked);
            if (!isChecked) valid = false;
        } else if (!input.value.trim()) {
            valid = false;
        }
    });

    return valid;
}

function populateReviewSection() {
    const formData = {
        childName: document.getElementById('childName').value,
        childDOB: document.getElementById('childDOB').value,
        nationality: document.getElementById('nationality').value,
        childNumber: document.getElementById('childNumber').value,
        language: document.getElementById('language').value,
        motherName: document.getElementById('motherName').value,
        motherDOB: document.getElementById('motherDOB').value,
        birthLocation: document.getElementById('birthLocation').value,
        birthHospital: document.getElementById('birthHospital').value,
        deliveryType: document.getElementById('deliveryType').value,
        surgery: document.querySelector('input[name="surgery"]:checked').value,
        birthWeight: document.getElementById('birthWeight').value,
        birthLength: document.getElementById('birthLength').value,
        headCircumference: document.getElementById('headCircumference').value,
        personnelType: document.getElementById('personnelType').value,
        personnelName: document.getElementById('personnelName').value,
        livingAddress: document.getElementById('livingAddress').value,
        registrationDate: document.getElementById('registrationDate').value
    };

    const orderSuffix = ['1st', '2nd', '3rd', '4th', '5th', '6th'][parseInt(formData.childNumber) - 1];
    
    const reviewHTML = `
        <div class="review-section">
            <div class="review-section-title">Child Information</div>
            <div class="review-item">
                <span class="review-label">Full Name</span>
                <span class="review-value">${formData.childName}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Date of Birth</span>
                <span class="review-value">${new Date(formData.childDOB).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Nationality</span>
                <span class="review-value">${formData.nationality}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Position in Family</span>
                <span class="review-value">${orderSuffix} Child</span>
            </div>
            <div class="review-item">
                <span class="review-label">Preferred Language</span>
                <span class="review-value">${formData.language}</span>
            </div>
        </div>

        <div class="review-section">
            <div class="review-section-title">Mother Information</div>
            <div class="review-item">
                <span class="review-label">Mother's Name</span>
                <span class="review-value">${formData.motherName}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Mother's Date of Birth</span>
                <span class="review-value">${new Date(formData.motherDOB).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
        </div>

        <div class="review-section">
            <div class="review-section-title">Birth Details</div>
            <div class="review-item">
                <span class="review-label">Birth Location</span>
                <span class="review-value">${formData.birthLocation}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Birth Hospital/Home</span>
                <span class="review-value">${formData.birthHospital}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Delivery Type</span>
                <span class="review-value">${formData.deliveryType}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Surgery During Delivery</span>
                <span class="review-value">${formData.surgery}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Birth Weight</span>
                <span class="review-value">${formData.birthWeight} kg</span>
            </div>
            <div class="review-item">
                <span class="review-label">Birth Length</span>
                <span class="review-value">${formData.birthLength} cm</span>
            </div>
            <div class="review-item">
                <span class="review-label">Head Circumference</span>
                <span class="review-value">${formData.headCircumference} cm</span>
            </div>
        </div>

        <div class="review-section">
            <div class="review-section-title">Medical Personnel</div>
            <div class="review-item">
                <span class="review-label">Healthcare Provider Type</span>
                <span class="review-value">${formData.personnelType}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Provider Name</span>
                <span class="review-value">${formData.personnelName}</span>
            </div>
        </div>

        <div class="review-section">
            <div class="review-section-title">Contact Information</div>
            <div class="review-item">
                <span class="review-label">Living Address</span>
                <span class="review-value">${formData.livingAddress}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Registration Date</span>
                <span class="review-value">${new Date(formData.registrationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
        </div>
    `;

    document.getElementById('reviewContainer').innerHTML = reviewHTML;
}

function nextSection() {
    if (currentSection > 0 && !validateSection(currentSection)) {
        alert('Please fill in all required fields before continuing.');
        return;
    }

    if (currentSection < totalSections - 1) {
        document.getElementById(`section${currentSection}`).classList.remove('active');
        currentSection++;
        
        // If moving to review section, populate it
        if (currentSection === 6) {
            populateReviewSection();
        }
        
        document.getElementById(`section${currentSection}`).classList.add('active');
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function prevSection() {
    if (currentSection > 0) {
        document.getElementById(`section${currentSection}`).classList.remove('active');
        currentSection--;
        document.getElementById(`section${currentSection}`).classList.add('active');
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateProgress() {
    const steps = document.querySelectorAll('.step');
    const progressFill = document.getElementById('progressFill');
    
    steps.forEach((step, index) => {
        if (index < currentSection) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index === currentSection) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });

    const progress = (currentSection / (totalSections - 1)) * 100;
    progressFill.style.width = `${progress}%`;
}

function submitForm() {
    const formData = {
        childName: document.getElementById('childName').value,
        childDOB: document.getElementById('childDOB').value,
        nationality: document.getElementById('nationality').value,
        childNumber: document.getElementById('childNumber').value,
        language: document.getElementById('language').value,
        motherName: document.getElementById('motherName').value,
        motherDOB: document.getElementById('motherDOB').value,
        birthLocation: document.getElementById('birthLocation').value,
        birthHospital: document.getElementById('birthHospital').value,
        deliveryType: document.getElementById('deliveryType').value,
        surgery: document.querySelector('input[name="surgery"]:checked').value,
        birthWeight: document.getElementById('birthWeight').value,
        birthLength: document.getElementById('birthLength').value,
        headCircumference: document.getElementById('headCircumference').value,
        personnelType: document.getElementById('personnelType').value,
        personnelName: document.getElementById('personnelName').value,
        livingAddress: document.getElementById('livingAddress').value,
        registrationDate: document.getElementById('registrationDate').value
    };

    const orderSuffix = ['1st', '2nd', '3rd', '4th', '5th', '6th'][parseInt(formData.childNumber) - 1];
    
    document.getElementById('successMessage').innerHTML = `
        Registration for <strong>${formData.childName}</strong> has been submitted successfully. 
        The details have been sent to your assigned ${formData.personnelType.toLowerCase()}, 
        <strong>${formData.personnelName}</strong>, for validation and approval.
    `;

    const regDate = new Date(formData.registrationDate);
    const formattedDate = regDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    document.getElementById('registrationDetails').innerHTML = `
        <div class="detail-row">
            <span class="detail-label">Child Name</span>
            <span class="detail-value">${formData.childName}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Birth Position</span>
            <span class="detail-value">${orderSuffix} Child</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Preferred Language</span>
            <span class="detail-value">${formData.language}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Assigned ${formData.personnelType}</span>
            <span class="detail-value">${formData.personnelName}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Registration Date</span>
            <span class="detail-value">${formattedDate}</span>
        </div>
    `;

    document.getElementById(`section${currentSection}`).classList.remove('active');
    document.getElementById('successScreen').classList.add('active');
    
    const progressFill = document.getElementById('progressFill');
    progressFill.style.width = '100%';
    
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.classList.add('completed');
        step.classList.remove('active');
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
    if (confirm('Are you sure you want to register another child? This will clear all saved data.')) {
        // Clear localStorage
        const fields = [
            'childName', 'childDOB', 'nationality', 'childNumber', 'language',
            'motherName', 'motherDOB', 'birthLocation', 'birthHospital',
            'deliveryType', 'surgery', 'birthWeight', 'birthLength', 
            'headCircumference', 'personnelType', 'personnelName', 
            'livingAddress', 'agreeTerms'
        ];
        
        fields.forEach(field => {
            localStorage.removeItem(`bambinooo_${field}`);
        });
        
        location.reload();
    }
}