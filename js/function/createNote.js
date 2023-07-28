
import { makeNoteItem, makeAddedItem } from '../data/makeNodeItem.js';
import { addNotesBtn } from '../renderAll/renderMainTable.js';
import renderSummary from '../renderAll/renderSummary.js';
import { getNotes, addNewNote, makeNewNoteObj } from '../data/notes.js';


export default function addNote(tableBody) {
  let notes = getNotes();
  tableBody.innerHTML += makeAddedItem();

  const addedItem = document.querySelector('#addedItem');
  const submitBtn = tableBody.querySelector('#submitBtn');
  const removeBtn = tableBody.querySelector('#removeBtn');
  const createBtn = document.querySelector('.button-create');

  const form = addedItem.children[0].children[0];
  createBtn.disabled = true;

  submitBtn.addEventListener('click', (e) => {
    notes = getNotes();

    const newNote = makeNewNoteObj(form);

    const errors =
      Array.from(form.elements).filter(
        (el) => el.tagName.toLowerCase() !== 'button' && el.value === '',
      ).length > 0;

    if (!errors) {
      addNewNote(newNote);
      tableBody.removeChild(addedItem);
      tableBody.innerHTML += makeNoteItem(newNote);
      createBtn.disabled = false;
      notes = getNotes();
      addNotesBtn(tableBody);
      renderSummary();
    }
  });

  removeBtn.addEventListener('click', () => {
    tableBody.removeChild(addedItem);
    createBtn.disabled = false;
  });

  addNotesBtn(tableBody);
  renderSummary();
}