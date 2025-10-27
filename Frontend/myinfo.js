
const modal = document.getElementById("editModal");
const modalTitle = document.getElementById("modalTitle");

/**

 * @param {string} action -
 */
function openEditModal(action) {
    modalTitle.textContent = `Edit ${action} Information`;
    modal.style.display = "block";
}

function closeEditModal() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}