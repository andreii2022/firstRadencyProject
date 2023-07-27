// Sample data: prepopulating the notes variable
let notes = [
    {
      id: 1,
      createdAt: new Date('2023-07-25'),
      content: "I'm gonna have a dentist appointment on the 3/5/2023, I moved it from 5/5/2023",
      category: "Task",
      datesMentioned: ["3/5/2023", "5/5/2023"],
      archived: false
    },
    // Add more sample notes here
  ];
  

  
  









  const activeNotesTable = document.getElementById("activeNotesBody");
  const archivedNotesTable = document.getElementById("archivedNotesBody");
  const summaryTable = document.getElementById("summaryTableBody");
  
  function updateTables() {
    activeNotesTable.innerHTML = "";
    archivedNotesTable.innerHTML = "";
    summaryTable.innerHTML = "";
  
    let summaryData = {};
  
    notes.forEach((note) => {
      const { id, createdAt, content, category, datesMentioned, archived } = note;
      const formattedDates = datesMentioned.join(", ");
  
      const row = `
        <tr>
          <td>${createdAt.toLocaleString()}</td>
          <td>${content}</td>
          <td>${category}</td>
          <td>${formattedDates}</td>
          <td>
            <button onclick="editNote(${id})" ${archived ? 'disabled' : ''}>Edit</button>
            <button onclick="archiveNote(${id})">${archived ? 'Unarchive' : 'Archive'}</button>
            <button onclick="deleteNote(${id})">Delete</button> <!-- Добавили кнопку удаления -->
          </td>
        </tr>
      `;
  
      if (archived) {
        archivedNotesTable.innerHTML += row;
      } else {
        activeNotesTable.innerHTML += row;
      }
  
      // Update summary table data
      if (!summaryData[category]) {
        summaryData[category] = { active: 0, archived: 0 };
      }
      if (archived) {
        summaryData[category].archived++;
      } else {
        summaryData[category].active++;
      }
    });
  
    // Update summary table
    for (const category in summaryData) {
      const { active, archived } = summaryData[category];
      summaryTable.innerHTML += `
        <tr>
          <td>${category}</td>
          <td>${active}</td>
          <td>${archived}</td>
        </tr>
      `;
    }
  }
  
  function addNote() {
    const noteContent = document.getElementById("noteContent").value;
    const noteCategory = document.getElementById("noteCategory").value;
    const newNote = {
      id: notes.length + 1,
      createdAt: new Date(),
      content: noteContent,
      category: noteCategory,
      datesMentioned: extractDates(noteContent),
      archived: false
    };
    notes.push(newNote);
    updateTables();
  }
  
  function extractDates(noteContent) {
    const dateRegex = /(\d{1,2}\/\d{1,2}\/\d{4})/g;
    return noteContent.match(dateRegex) || [];
  }
  
  function editNote(noteId) {
    const noteToEdit = notes.find((note) => note.id === noteId);
    if (noteToEdit) {
      const newContent = prompt("Enter the new content:", noteToEdit.content);
      if (newContent !== null && newContent.trim() !== "") {
        noteToEdit.content = newContent;
        noteToEdit.datesMentioned = extractDates(newContent);
        updateTables();
      }
    }
  }
  
  function archiveNote(noteId) {
    const noteToArchive = notes.find((note) => note.id === noteId);
    if (noteToArchive) {
      noteToArchive.archived = !noteToArchive.archived;
      updateTables();
    }
  }
  
  function deleteNote(noteId) {
    const index = notes.findIndex((note) => note.id === noteId);
    if (index !== -1) {
      notes.splice(index, 1);
      updateTables();
    }
  }
  
  // Initial update of tables
  updateTables();