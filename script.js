// ========== JavaScript Functionality ==========

const studentForm = document.getElementById("studentForm");
const tableBody = document.getElementById("tableBody");

let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null; // Track which record is being edited

// Function to validate inputs
function validateInputs(name, studentId, email, contact) {
    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^[0-9]{10}$/;

    if (!nameRegex.test(name)) {
        alert("Name must contain only letters.");
        return false;
    }
    if (isNaN(studentId) || studentId <= 0) {
        alert("Student ID must be a valid number.");
        return false;
    }
    if (!emailRegex.test(email)) {
        alert("Enter a valid email address.");
        return false;
    }
    if (!contactRegex.test(contact)) {
        alert("Contact must contain at least 10 digits.");
        return false;
    }
    return true;
}

// Function to display records
function displayStudents() {
    tableBody.innerHTML = "";
    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    localStorage.setItem("students", JSON.stringify(students));
}

// Handle form submission
studentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();

    if (!validateInputs(name, studentId, email, contact)) {
        return;
    }

    const student = { name, studentId, email, contact };

    if (editIndex === null) {
        // Add new student
        students.push(student);
    } else {
        // Update existing record
        students[editIndex] = student;
        editIndex = null;
    }

    studentForm.reset();
    displayStudents();
});

// Edit function
function editStudent(index) {
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;
    editIndex = index;
}

// Delete function
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        displayStudents();
    }
}

// Initial display
displayStudents();

