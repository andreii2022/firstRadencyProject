import { archiveNote, getNotes } from '../data/notes.js';
import renderSummary from '../renderAll/renderSummary.js';
import { addUnArchivedListeners } from './updeteArchivedTables.js';
import { makeNoteItem } from '../data/makeNodeItem.js';

export default function archiveNoteItem(archiveId, item) {
  const mainTableBody = document.querySelector('tbody.main-table-body');
  const sumTableBody = document.querySelectorAll('.body.archived-items');
  const el = getNotes().find((el) => el.id === archiveId);

  console.log(getNotes());
  archiveNote(archiveId);
  mainTableBody.removeChild(item);

  Array.from(sumTableBody).map((body) => {
    body.classList.contains('open') && body.id === el.category
      ? (body.innerHTML += makeNoteItem(el)) && addUnArchivedListeners(body, getNotes())
      : false;
  });
  renderSummary();
}