
import renderSummary from '../renderAll/renderSummary.js';
import { deleteNoteData } from '../data/notes.js';

export default function deleteNote(delId, item, tableBody) {
  deleteNoteData(delId);
  removeItemFromTable(item);
  updateSummary();
}

function removeItemFromTable(item) {
  if (item && item.parentElement) {
    item.parentElement.removeChild(item);
  }
}

function updateSummary() {
  renderSummary();
}
