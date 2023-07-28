
import { getNotes, editNoteData, makeNewNoteObj } from '../data/notes.js';
import { makeNoteItem, makeAddedItem } from '../data/makeNodeItem.js';
import archiveNoteItem from './archiveNote.js';
import deleteNote from './deleteNote.js';

export default function editNote(noteId, item, tableBody) {
  const note = getNotes().find((el) => el.id === noteId);
  replaceNoteWithEditForm(note, item, tableBody);
}

function replaceNoteWithEditForm(note, item, tableBody) {
  const editItem = document.createElement('tr');
  editItem.classList.add('note-item', `${note.id}`);
  editItem.innerHTML = makeAddedItem(note);
  item.replaceWith(editItem);

  const editBtn = editItem.querySelector('#edit');
  const editBtns = tableBody.querySelectorAll('.fas.fa-edit');
  const createBtn = document.querySelector('.button-create');

  editBtns.forEach((btn) => {
    const divItem = document.createElement('div');
    divItem.classList.add('empty');
    btn.replaceWith(divItem);
  });

  createBtn.disabled = true;

  editBtn.addEventListener('click', (e) => {
    const form = editItem.querySelector('form#add-form');
    const newNote = makeNewNoteObj(form, note.id);
    editNoteData(newNote);

    const newNoteItem = document.createElement('tr');
    newNoteItem.classList.add('note-item', `${note.id}`);
    newNoteItem.innerHTML = makeNoteItem(newNote);

    editItem.replaceWith(newNoteItem);

    const notesItems = tableBody.querySelectorAll('.note-item');

    notesItems.forEach((item) => {
      const itemId = +item.classList[1];
      if (itemId !== newNote.id) {
        const divItem = item.querySelector('.empty');
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-edit');
        icon.addEventListener('click', () => editNote(itemId, item, tableBody));
        divItem.replaceWith(icon);
      } else {
        const editBtnItem = newNoteItem.querySelector('.fas.fa-edit');
        const archiveBtnItem = newNoteItem.querySelector('.fas.fa-archive');
        const delBtnItem = newNoteItem.querySelector('.fas.fa-trash');
        delBtnItem.addEventListener('click', () => deleteNote(newNote.id, newNoteItem, tableBody));
        archiveBtnItem.addEventListener('click', () =>
          archiveNoteItem(newNote.id, newNoteItem, tableBody),
        );
        editBtnItem.addEventListener('click', function (event) {
          event.preventDefault();
          editNote(newNote.id, newNoteItem, tableBody);
        });
      }
    });
    createBtn.disabled = false;
  });
}
