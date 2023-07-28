
import { makeNoteItem } from '../data/makeNodeItem.js';
import { getNotes } from '../data/notes.js';
import deleteNote from '../function/deleteNote.js';
import archiveNoteItem from '../function/archiveNote.js';
import editNote from '../function/editNote.js';

export default function renderMainTable() {
  const mainTableBody = document.querySelector('tbody.main-table-body');
  mainTableBody.innerHTML = '';

  const activeNotes = getNotes().filter((note) => !note?.archived);
  mainTableBody.innerHTML = activeNotes.map(makeNoteItem).join('');

  addNotesBtn(mainTableBody);
}

export function addNotesBtn(mainTableBody) {
  const noteItems = mainTableBody.querySelectorAll('tr:not(#addedItem)');

  noteItems.forEach((item) => {
    const noteId = +item.classList[1];
    const editBtn = item.querySelector('.fas.fa-edit');
    const archiveBtn = item.querySelector('.fas.fa-archive');
    const delBtn = item.querySelector('.fas.fa-trash');

    if (getNotes().length >= 1) {
      delBtn.addEventListener('click', () => deleteNote(noteId, item, mainTableBody));
      archiveBtn.addEventListener('click', () => archiveNoteItem(noteId, item, mainTableBody));
      editBtn.addEventListener('click', function (event) {
        event.preventDefault();
        editNote(noteId, item, mainTableBody);
      });
    }
  });
}