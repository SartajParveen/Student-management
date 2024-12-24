// Function to edit a student's details
function editStudent(id) {
  const student = studentsData.find((s) => s.id === id);
  if (student) {
    document.getElementById("table").style.display = "none";
    const editForm = document.getElementById("edit-form");
    editForm.style.display = "block";

    // Fill the form with the student's details
    document.getElementById("edit-student-id").value = student.id;
    document.getElementById("edit-first-name").value = student.first_name;
    document.getElementById("edit-last-name").value = student.last_name;
    document.getElementById("edit-email").value = student.email;
    document.getElementById("edit-age").value = student.age;
    document.getElementById("edit-gender").value = student.gender;

    // Set up a click event for the Save button
    document.getElementById("save-button").onclick = () =>
      saveStudentDetails(student.id);
  }
}

function viewStudent(id) {
  const student = studentsData.find((s) => s.id === id);
  if (student) {
    document.getElementById("table").style.display = "none";
    const viewForm = document.getElementById("view-form");
    viewForm.style.display = "block";

    // Fill the form with the student's details
    document.getElementById("view-student-id").value = student.id;
    document.getElementById("view-first-name").value = student.first_name;
    document.getElementById("view-last-name").value = student.last_name;
    document.getElementById("view-email").value = student.email;
    document.getElementById("view-age").value = student.age;
    document.getElementById("view-gender").value = student.gender;

    // Set up a click event for the Save button
    document.getElementById("back-button").onclick = () => {
      document.getElementById("table").style.display = "block";
      viewForm.style.display = "none";
    };
  }
}

let studentsData; // To store the student data

//GET
// Function to fetch student data from the API
async function fetchStudentData() {
  try {
    const response = await fetch("http://localhost:8080/details/students");
    if (response.ok) {
      studentsData = await response.json();
      renderStudentList(studentsData);
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

//POST
//Function to save student details
async function postStudentDetails() {
  const addStudent = {
    first_name: document.getElementById("firstname").value,
    last_name: document.getElementById("lastname").value,
    email: document.getElementById("email").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
  };

  try {
    const response = await fetch(`http://localhost:8080/details/addStudents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addStudent),
    });

    if (response.ok) {
      // Hide the edit form and refresh the student list
      location.reload();
      window.location.href = "studentsList.html";
      //fetchStudentData();
    } else {
      console.error("Failed to save data");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

//PUT
// Function to save edited student details
async function saveStudentDetails(studentId) {
  const updatedStudent = {
    id: studentId,
    first_name: document.getElementById("edit-first-name").value,
    last_name: document.getElementById("edit-last-name").value,
    email: document.getElementById("edit-email").value,
    age: document.getElementById("edit-age").value,
    gender: document.getElementById("edit-gender").value,
  };

  try {
    const response = await fetch(
      `http://localhost:8080/details/updateStudent/${studentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStudent),
      }
    );

    if (response.ok) {
      // Hide the edit form and refresh the student list
      document.getElementById("edit-form").style.display = "none";
      document.getElementById("table").style.display = "block";

      document.getElementById("student-edit-form").reset();
      location.reload();
      //fetchStudentData();
    } else {
      console.error("Failed to save data");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function onlogin() {
  var form = document.getElementById("login-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
  });
  if (
    document.getElementById("username").value == "team" &&
    document.getElementById("password").value == "1234"
  ) {
    alert("Logged in successfully");
    window.location.href = "home.html";
    // Fetch and render student data when the page loads
    fetchStudentData();
  } else {
    document.getElementById("warn").textContent =
      "Enter valid credentials!!!!!";
  }
}

var table = document.getElementById("my-table");
var prevButton = document.getElementById("prevPage");
var nextButton = document.getElementById("nextPage");
var itemsPerPage = 10; // Number of rows per page
var currentPage = 1;
// Function to render the student list in the table
function renderStudentList(students) {
  const studentList = document.getElementById("student-list");
  studentList.innerHTML = "";
  var startIndex = (currentPage - 1) * itemsPerPage;
  var endIndex = startIndex + itemsPerPage;
  var dataToShow = students.slice(startIndex, endIndex);

  dataToShow.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.first_name}</td>
                    <td>${student.last_name}</td>
                    <td>${student.email}</td>
                    <td>${student.age}</td>
                    <td>${student.gender}</td>
                    <td><button onclick="editStudent(${
                      student.id
                    })">Edit</button>${"  "}<button style="background-color:red;" onclick="deleteStudent(${
      student.id
    })">Delete</button></td>
                `;
    studentList.appendChild(row);
  });
}

function previous() {
  if (currentPage > 1) {
    currentPage--;

    renderStudentList(studentsData);
  }
}

function next() {
  if (currentPage < Math.ceil(studentsData.length / itemsPerPage)) {
    currentPage++;
    renderStudentList(studentsData);
  }
}
