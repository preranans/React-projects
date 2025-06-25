document.addEventListener('DOMContentLoaded', () => {
  const rollSelect = document.getElementById('rollSelect');
  const studentDataDiv = document.getElementById('student-data');
  fetch('data.json')
    .then((response) => response.json())
    .then((data) => {
      const students = data.students;
      const schoolDiv = document.getElementById('school-details');
      schoolDiv.innerHTML = `<p><strong>School Name:</strong> ${data.school_name}</p>
                                <p><strong>Class:</strong> ${data.class}</p>
                                <p><strong>President:</strong> ${data.info.president}</p>
                                <p><strong>Address:</strong> ${data.info.address}</p>
                                <p><strong>Email:</strong> ${data.info.contacts.email}</p>
                                <p><strong>Tel:</strong> ${data.info.contacts.tel}</p>`;

      students.forEach((student) => {
        const option = document.createElement('option');
        option.value = student.roll_no;
        option.textContent = student.roll_no;
        rollSelect.appendChild(option);
      });

      rollSelect.addEventListener('change', function () {
        const selectedRoll = this.value;
        const student = students.find((s) => s.roll_no === selectedRoll);
        studentDataDiv.innerHTML = '';

        if (student) {
          const name = document.createElement('h3');
          name.textContent = `Name: ${student.name}`;
          studentDataDiv.appendChild(name);
          const grades = document.createElement('div');
          for (const subject in student.grade) {
            const gradeItem = document.createElement('div');
            gradeItem.className = 'grade-item';
            gradeItem.textContent = `${subject}: ${student.grade[subject]}`;
            grades.appendChild(gradeItem);
          }
          studentDataDiv.appendChild(grades);
        }
      });
    })
    .catch((error) => {
      studentDataDiv.textContent = 'Failed to load student data.';
      console.error('Error loading JSON:', error);
    });
});
