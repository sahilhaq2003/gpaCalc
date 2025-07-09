// Fix the addModule function and event listener
document.addEventListener('DOMContentLoaded', function() {
    // ... (keep all your existing code)

    // Fix the addSubjectBtn event listener
    addSubjectBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default behavior
        addModule(); // Call without parameters
    });

    // Update the addModule function
    function addModule(name = '', credits = '', grade = '') {
        emptyState.classList.add('hidden');

        const moduleRow = document.createElement('div');
        moduleRow.className = 'grid grid-cols-1 md:grid-cols-12 gap-3 mb-3 items-center bg-sliitlight p-3 rounded-md';
        
        moduleRow.innerHTML = `
            <div class="md:col-span-5">
                <input type="text" value="${name}" class="module-name w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sliitblue" placeholder="Module Name" required>
            </div>
            <div class="md:col-span-2">
                <input type="number" value="${credits}" class="module-credits w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sliitblue" placeholder="Credits" min="1" max="10" required>
            </div>
            <div class="md:col-span-3">
                <select class="module-grade w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sliitblue" required>
                    <option value="">Select Grade</option>
                    <option value="4.0" ${grade === '4.0' ? 'selected' : ''}>A+</option>
                    <option value="4.0" ${grade === '4.0' ? 'selected' : ''}>A</option>
                    <option value="3.7" ${grade === '3.7' ? 'selected' : ''}>A-</option>
                    <option value="3.3" ${grade === '3.3' ? 'selected' : ''}>B+</option>
                    <option value="3.0" ${grade === '3.0' ? 'selected' : ''}>B</option>
                    <option value="2.7" ${grade === '2.7' ? 'selected' : ''}>B-</option>
                    <option value="2.3" ${grade === '2.3' ? 'selected' : ''}>C+</option>
                    <option value="2.0" ${grade === '2.0' ? 'selected' : ''}>C</option>
                    <option value="1.7" ${grade === '1.7' ? 'selected' : ''}>C-</option>
                    <option value="1.3" ${grade === '1.3' ? 'selected' : ''}>D+</option>
                    <option value="1.0" ${grade === '1.0' ? 'selected' : ''}>D</option>
                    <option value="0.0" ${grade === '0.0' ? 'selected' : ''}>E</option>
                </select>
            </div>
            <div class="md:col-span-2 flex justify-end space-x-2">
                <button class="move-up-btn text-gray-600 hover:text-sliitblue transition-colors" title="Move up">
                    <i class="fas fa-arrow-up"></i>
                </button>
                <button class="move-down-btn text-gray-600 hover:text-sliitblue transition-colors" title="Move down">
                    <i class="fas fa-arrow-down"></i>
                </button>
                <button class="remove-btn text-red-600 hover:text-red-800 transition-colors" title="Remove module">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        
        subjectsContainer.appendChild(moduleRow);
        
        // Add event listeners to new module
        const removeBtn = moduleRow.querySelector('.remove-btn');
        const moveUpBtn = moduleRow.querySelector('.move-up-btn');
        const moveDownBtn = moduleRow.querySelector('.move-down-btn');
        
        removeBtn.addEventListener('click', function() {
            subjectsContainer.removeChild(moduleRow);
            updateEmptyState();
        });
        
        moveUpBtn.addEventListener('click', function() {
            if (moduleRow.previousElementSibling && !moduleRow.previousElementSibling.id) {
                subjectsContainer.insertBefore(moduleRow, moduleRow.previousElementSibling);
            }
        });
        
        moveDownBtn.addEventListener('click', function() {
            if (moduleRow.nextElementSibling) {
                subjectsContainer.insertBefore(moduleRow.nextElementSibling, moduleRow);
            }
        });
    }

    // ... (rest of your existing code)
});