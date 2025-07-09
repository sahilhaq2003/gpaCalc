document.addEventListener('DOMContentLoaded', function() {
    const subjectsContainer = document.getElementById('subjects-container');
    const addSubjectBtn = document.getElementById('add-subject');
    const calculateBtn = document.getElementById('calculate');
    const resultsDiv = document.getElementById('results');
    
    // Add first module by default
    addModule();
    
    // Event listeners
    addSubjectBtn.addEventListener('click', addModule);
    calculateBtn.addEventListener('click', calculateGPA);
    
    function addModule() {
        const moduleRow = document.createElement('div');
        moduleRow.className = 'subject-row';
        
        moduleRow.innerHTML = `
            <input type="text" class="subject-name" placeholder="Module Name" required>
            <input type="number" class="credits" placeholder="Credits" min="1" max="10" required>
            <select class="grade" required>
                <option value="">Select Grade</option>
                <option value="4.0">A+</option>
                <option value="4.0">A</option>
                <option value="3.7">A-</option>
                <option value="3.3">B+</option>
                <option value="3.0">B</option>
                <option value="2.7">B-</option>
                <option value="2.3">C+</option>
                <option value="2.0">C</option>
                <option value="1.7">C-</option>
                <option value="1.3">D+</option>
                <option value="1.0">D</option>
                <option value="0.0">E</option>
            </select>
            <button class="remove-btn" title="Remove module"><i class="fas fa-times"></i></button>
        `;
        
        subjectsContainer.appendChild(moduleRow);
        
        // Add event listener to remove button
        const removeBtn = moduleRow.querySelector('.remove-btn');
        
        removeBtn.addEventListener('click', function() {
            subjectsContainer.removeChild(moduleRow);
            if (subjectsContainer.children.length === 0) {
                resultsDiv.classList.add('hidden');
            }
        });
    }
    
    function calculateGPA() {
        const moduleRows = subjectsContainer.querySelectorAll('.subject-row');
        let totalCredits = 0;
        let totalGradePoints = 0;
        
        // Validate all inputs first
        let allValid = true;
        
        moduleRows.forEach(row => {
            const nameInput = row.querySelector('.subject-name');
            const creditsInput = row.querySelector('.credits');
            const gradeSelect = row.querySelector('.grade');
            
            if (!nameInput.value || !creditsInput.value || !gradeSelect.value) {
                allValid = false;
                if (!nameInput.value) nameInput.style.borderColor = 'red';
                if (!creditsInput.value) creditsInput.style.borderColor = 'red';
                if (!gradeSelect.value) gradeSelect.style.borderColor = 'red';
            } else {
                nameInput.style.borderColor = '';
                creditsInput.style.borderColor = '';
                gradeSelect.style.borderColor = '';
            }
        });
        
        if (!allValid) {
            alert('Please fill in all fields for all modules.');
            return;
        }
        
        // Calculate GPA
        moduleRows.forEach(row => {
            const credits = parseFloat(row.querySelector('.credits').value);
            const gradePoints = parseFloat(row.querySelector('.grade').value);
            
            totalCredits += credits;
            totalGradePoints += credits * gradePoints;
        });
        
        const gpa = totalGradePoints / totalCredits;
        
        // Display results
        document.getElementById('total-credits').textContent = totalCredits;
        document.getElementById('total-grade-points').textContent = totalGradePoints.toFixed(2);
        document.getElementById('gpa').textContent = gpa.toFixed(2);
        
        resultsDiv.classList.remove('hidden');
    }
});