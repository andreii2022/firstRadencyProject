

import { replaceNoteWithEditForm } from '../function/editNote';

// Mocks for DOM methods
document.body.innerHTML = `
  <table>
    <tbody id="tableBody">
      <tr class="note-item 1">
        <td>...</td>
        <td>...</td>
        <td>
          <i id="edit" class="fas fa-edit"></i>
        </td>
      </tr>
    </tbody>
  </table>
`;

const makeNewNoteObj = jest.fn();
const editNoteData = jest.fn();

jest.mock('../path/to/data/notes', () => ({
  getNotes: jest.fn(() => [
    { id: 1, title: 'Note 1', content: 'Content 1' },
    { id: 2, title: 'Note 2', content: 'Content 2' },
  ]),
  makeNewNoteObj,
  editNoteData,
}));

const makeAddedItemMock = '<td>Edit form content</td>';
jest.mock('../path/to/data/makeNodeItem', () => ({
  makeAddedItem: jest.fn(() => makeAddedItemMock),
}));

describe('replaceNoteWithEditForm', () => {
  let editItem;
  let item;
  let tableBody;

  beforeEach(() => {
    editItem = document.createElement('tr');
    item = document.querySelector('.note-item');
    tableBody = document.getElementById('tableBody');
    jest.clearAllMocks();
  });

  test('should replace note with edit form', () => {
    replaceNoteWithEditForm({ id: 1, title: 'Note 1', content: 'Content 1' }, item, tableBody);

    // Check if the item is replaced by editItem
    expect(tableBody.contains(item)).toBe(false);
    expect(tableBody.contains(editItem)).toBe(true);
    expect(editItem.classList.contains('note-item')).toBe(true);
    expect(editItem.classList.contains('1')).toBe(true);

    // Check if makeAddedItem is called with correct note
    expect(makeAddedItemMock).toHaveBeenCalledWith({ id: 1, title: 'Note 1', content: 'Content 1' });
    expect(editItem.innerHTML).toBe(makeAddedItemMock);

    // Check if createBtn is disabled
    const createBtn = document.querySelector('.button-create');
    expect(createBtn.disabled).toBe(true);
  });

  test('should call editNoteData and replace with newNoteItem when editBtn is clicked', () => {
    // Mock the form and newNote for editBtn click
    const form = document.createElement('form');
    editItem.appendChild(form);
    makeNewNoteObj.mockReturnValueOnce({ id: 1, title: 'Updated Note 1', content: 'Updated Content 1' });

    // Call replaceNoteWithEditForm to replace the note
    replaceNoteWithEditForm({ id: 1, title: 'Note 1', content: 'Content 1' }, item, tableBody);

    const editBtn = editItem.querySelector('#edit');
    editBtn.click(); // Simulate editBtn click

    // Check if editNoteData is called with the correct newNote
    expect(makeNewNoteObj).toHaveBeenCalledWith(form, 1);
    expect(editNoteData).toHaveBeenCalledWith({ id: 1, title: 'Updated Note 1', content: 'Updated Content 1' });

    // Mock newNoteItem
    const newNoteItem = document.createElement('tr');
    newNoteItem.classList.add('note-item', '1');
    newNoteItem.innerHTML = '<td>New note content</td>';
    editItem.replaceWith = jest.fn(); // Mock replaceWith method

    // Call the editBtn click event listener
    editBtn.click();

    // Check if the editItem is replaced with newNoteItem
    expect(editItem.replaceWith).toHaveBeenCalledWith(newNoteItem);

    // Check if createBtn is enabled again
    const createBtn = document.querySelector('.button-create');
    expect(createBtn.disabled).toBe(false);
  });
});
