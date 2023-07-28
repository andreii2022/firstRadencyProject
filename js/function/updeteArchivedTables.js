import renderSummary from '../renderAll/renderSummary.js';
import { getNotes } from '../data/notes.js';
import renderMainTable from '../renderAll/renderMainTable.js';
import { makeNoteItem } from '../data/makeNodeItem.js';

export function updeteArchivedTables(categoryId) {
  const sumTableBody = document.querySelectorAll('tbody.archived-items');

  Array.from(sumTableBody).forEach((body) => {
    if (body.id === categoryId && body.classList.contains('open')) {
      closeTable(body);
    } else if (body.id === categoryId) {
      renderArchivedTable(body, getNotes(), categoryId);
    }
  });

  checkOpenClass(sumTableBody);
}

export function renderArchivedTable(body, notes, categoryId) {
  body.innerHTML = '';

  notes.forEach((note) => {
    if (note.archived === true && note.category === categoryId) {
      body.innerHTML += makeNoteItem(note);
    }
  });

  addUnArchivedListeners(body, notes);
}

export function addUnArchivedListeners(body, notes) {
  const unArchiveBtn = body.querySelectorAll('button.unArchive');

  Array.from(unArchiveBtn).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      notes.forEach((note) => {
        if (note.id === +e.target.parentElement.parentElement.classList[1]) {
          note.archived = false;

          if (body.contains(e.target.parentElement.parentElement)) {
            body.removeChild(e.target.parentElement.parentElement);
            renderMainTable();
            renderSummary();
          }

          if (!body.hasChildNodes()) {
            body.classList.remove('open');
          }
        }
      });
    });
  });
}

function closeTable(body) {
  const allArchivedNotes = body.querySelectorAll('tr');

  Array.from(allArchivedNotes).forEach((note) => {
    body.removeChild(note);
  });
}

function checkOpenClass(sumTableBody) {
  Array.from(sumTableBody).forEach((body) => {
    body.classList.toggle('open', body.hasChildNodes());
  });
}
