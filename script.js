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
        moduleRow.className = 'grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 items-center';
        
        moduleRow.innerHTML = `
            <div class="md:col-span-5">
                <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sliitblue focus:border-transparent" placeholder="Module Name" required>
            </div>
            <div class="md:col-span-3">
                <input type="number" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sliitblue focus:border-transparent" placeholder="Credits" min="1" max="10" required>
            </div>
            <div class="md:col-span-3">
                <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sliitblue focus:border-transparent" required>
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
            </div>
            <div class="md:col-span-1 flex justify-center">
                <button class="remove-btn text-red-600 hover:text-red-800 transition-colors" title="Remove module">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
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
        const moduleRows = subjectsContainer.querySelectorAll('.grid');
        let totalCredits = 0;
        let totalGradePoints = 0;
        
        // Validate all inputs first
        let allValid = true;
        
        moduleRows.forEach(row => {
            const nameInput = row.querySelector('input[type="text"]');
            const creditsInput = row.querySelector('input[type="number"]');
            const gradeSelect = row.querySelector('select');
            
            if (!nameInput.value || !creditsInput.value || !gradeSelect.value) {
                allValid = false;
                if (!nameInput.value) nameInput.classList.add('border-red-500');
                if (!creditsInput.value) creditsInput.classList.add('border-red-500');
                if (!gradeSelect.value) gradeSelect.classList.add('border-red-500');
            } else {
                nameInput.classList.remove('border-red-500');
                creditsInput.classList.remove('border-red-500');
                gradeSelect.classList.remove('border-red-500');
            }
        });
        
        if (!allValid) {
            alert('Please fill in all fields for all modules.');
            return;
        }
        
        // Calculate GPA
        moduleRows.forEach(row => {
            const credits = parseFloat(row.querySelector('input[type="number"]').value);
            const gradePoints = parseFloat(row.querySelector('select').value);
            
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