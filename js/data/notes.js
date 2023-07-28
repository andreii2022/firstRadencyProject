
import { images } from './images.js';

let notes = [
  {
    id: 1,
    img: '',
    name: `Shoping List 1`,
    creationDate: '2021-11-20',
    category: 'Task',
    content: 'Tomatoes, bread',
    dates: '3/5/2021',
    archived: false,
  },
  {
    id: 2,
    img: '',
    name: 'Shoping List 2',
    creationDate: '2021-02-10',
    category: 'Task',
    content: 'Phone, Tv 3/5/2021',
    dates: '3/5/2021',
    archived: false,
  },
  {
    id: 3,
    img: '',
    name: 'Shoping List 3',
    creationDate: '2021-04-20',
    category: 'Idea',
    content: 'Tomatoes, bread, milk',
    dates: '3/5/2021',
    archived: false,
  },
  {
    id: 4,
    img: '',
    name: 'Shoping List 4',
    creationDate: '2021-04-20',
    category: 'Task',
    content: 'Tomatoes, bread',
    dates: '3/5/2021',
    archived: false,
  },
  {
    id: 5,
    img: '',
    name: 'Shoping List 5',
    creationDate: '2018-12-10',
    category: 'Task',
    content: 'Tomatoes, bread',
    dates: '3/5/2021',
    archived: false,
  },
  {
    id: 6,
    img: '',
    name: 'Some random thought',
    creationDate: '2021-04-20',
    category: 'Random Thought',
    content: 'Tomatoes, bread',
    dates: '3/5/2021',
    archived: false,
  },
  {
    id: 7,
    img: '',
    name: 'Some random thought',
    creationDate: '2021-04-20',
    category: 'Random Thought',
    content: 'Tomatoes, bread',
    dates: '3/5/2021',
    archived: false,
  },
  
 
];

const dateRegEx = /^(0?[1-9]|1[012])[ /](0?[1-9]|[12][0-9]|3[01])[ /](19|20)?[0-9]{2}$/;

export const findDates = (value) => {
  let text = value.split(' ');
  const dates = text
    .map((str) => str.replace(',', ''))
    .filter((str) => str.match(dateRegEx));
  return dates.join(', ');
};

export const getNotes = () => notes;

export const addNewNote = (newNote) => {
  notes.push(newNote);
};

export const makeNewNoteObj = (form, noteId) => ({
  id: noteId || Date.now(),
  img: images.find((img) => img.imgName === form.elements[2].value)?.imgUrl || '',
  name: form.elements[0].value,
  creationDate: form.elements[1].value,
  category: form.elements[2].value,
  content: form.elements[3].value,
  dates: findDates(form.elements[3].value),
  archived: false,
});

export const editNoteData = (editNote) => {
  const noteIndex = notes.findIndex((note) => note.id === editNote.id);
  if (noteIndex !== -1) {
    notes[noteIndex] = editNote;
  }
};

export const archiveNote = (archiveId) => {
  const note = notes.find((note) => note.id === archiveId);
  if (note) {
    note.archived = true;
  }
};

export const deleteNoteData = (deleteId) => {
  notes = notes.filter((note) => note.id !== deleteId);
};

export const archiveAllNotes = () => {
  notes.forEach((note) => {
    note.archived = true;
  });
};

export const deleteAllNotes = () => {
  notes = [];
};

export const calculateActive = (category) =>
  notes.reduce((acc, note) => (note.category === category && !note.archived ? acc + 1 : acc), 0);

export const calculateArchived = (category) =>
  notes.reduce((acc, note) => (note.category === category && note.archived ? acc + 1 : acc), 0);

(() => {
  notes.forEach((note) => {
    note.img = images.find((imgObj) => imgObj.imgName === note.category)?.imgUrl || '';
  });
})();

export default notes;