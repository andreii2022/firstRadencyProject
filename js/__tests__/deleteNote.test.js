

import deleteNote from '../function/deleteNote';


test('deleteNote should remove the item from tableBody', () => {
 
  const delId = 1; 
  const tableBody = document.createElement('tbody');
  const item = document.createElement('tr');
  item.classList.add('note-item', `${delId}`);
  tableBody.appendChild(item);

  
  deleteNote(delId, item, tableBody);

  
  expect(tableBody.contains(item)).toBe(false);
});
