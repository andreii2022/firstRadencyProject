export function makeNoteItem(note) {
  return `<tr class="note-item ${note.id}">
    <td class="note-info">
      <div style="display: flex; align-items: center; justify-content: space-around;">
          ${note.img}
          ${note.name}
      </div>
    </td>
    <td class="note-date-created">${note.creationDate}</td>
    <td class="note-category">${note.category}</td>
    <td class="note-text">${note.content}</td>
    <td class="note-dates-aditional">${note.dates}</td>
    <td>
      ${
        note.archived
          ? `<button class='unArchive'>Unarchive</button>`
          : `
          <div class="note-header-icons">
              <i class="fas fa-edit"></i>
              <i class="fas fa-archive"></i> 
              <i class="fas fa-trash"></i>
          </div>`
      } 
    </td>
  </tr>`;
}

export function makeAddedItem(note) {
  return `<tr class="note-item" id ='addedItem'>
    <td class='add-note' colspan="6">
        <form id='add-form'>
            <input required type="text" id="fname2" value="${
              note?.name || ''
            }" name='Name' placeholder="Name"
                form="add-form">
            <input required type="date" id="fname1" value="${
              note?.creationDate || ''
            }" name='Creation date'>
            <select name="Category" id="categorySelect">
                <option value="Task" ${note?.category === 'Task' ? 'selected' : ''}>Task</option>
                <option value="Random Thought" ${
                  note?.category === 'Random Thought' ? 'selected' : ''
                }>Random Thought</option>
                <option value="Idea" ${note?.category === 'Idea' ? 'selected' : ''}>Idea</option>
            </select>
            <textarea required value="" name="Content" id="contentArea" maxlength="150" cols="30" rows="2"
                placeholder="Content" form="add-form">${note?.content || ''}</textarea>
            <div class='note-dates'>
            ${note?.dates || ''}
            </div>
            ${
              !note
                ? `<button id='submitBtn'>Add note</button>
            <button id='removeBtn'>Close</button>`
                : `<button id='edit'>Confirm</button>`
            }
        </form>
    </td>
  </tr>`;
}
