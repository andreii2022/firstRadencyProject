

// Import the addNote function
import addNote from '../addNote.js';

// Mock the dependencies
jest.mock('../data/makeNodeItem.js', () => ({
  makeNoteItem: jest.fn(),
  makeAddedItem: jest.fn(),
}));

jest.mock('../renderAll/renderMainTable.js', () => ({
  addNotesBtn: jest.fn(),
}));

jest.mock('../renderAll/renderSummary.js', () => jest.fn());

jest.mock('../data/notes.js', () => ({
  getNotes: jest.fn(),
  addNewNote: jest.fn(),
  makeNewNoteObj: jest.fn(),
}));

describe('addNote function', () => {
  it('should add a new note when the submit button is clicked without errors', () => {
    // Create mock DOM elements and their properties
    const tableBody = document.createElement('tbody');
    const addedItem = document.createElement('div');
    addedItem.innerHTML = '<form><input type="text" name="title" value="Test Title"></form>';
    tableBody.appendChild(addedItem);

    // Mock the return values and behavior of dependent functions
    const newNoteObj = { title: 'Test Title', content: 'Test Content' };
    const form = addedItem.querySelector('form');
    makeNewNoteObj.mockReturnValue(newNoteObj);
    getNotes.mockReturnValue([]);
    addNewNote.mockReturnValue(true);

    // Call the function being tested
    addNote(tableBody);

    // Check that the functions were called with the correct arguments
    expect(makeNewNoteObj).toHaveBeenCalledWith(form);
    expect(addNewNote).toHaveBeenCalledWith(newNoteObj);
    expect(tableBody.innerHTML).toContain('Test Title');
    expect(renderSummary).toHaveBeenCalledTimes(1);
  });
});
