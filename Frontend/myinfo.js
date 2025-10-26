// Get the modal element
const modal = document.getElementById("editModal");
const modalTitle = document.getElementById("modalTitle");

/**
 * Opens the modal and sets the title based on the action.
 * @param {string} action - The action being performed (e.g., 'Contact', 'Password').
 */
function openEditModal(action) {
    modalTitle.textContent = `Edit ${action} Information`;
    modal.style.display = "block";
}

/**
 * Closes the modal.
 */
function closeEditModal() {
    modal.style.display = "none";
}

// Close the modal if the user clicks anywhere outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}