import { calculateActive, calculateArchived } from '../data/notes.js';

export default function renderSummary() {
  const categoryClasses = {
    'Task': { active: 'active-task', archived: 'archived-task' },
    'Random Thought': { active: 'active-thought', archived: 'archived-thought' },
    'Idea': { active: 'active-idea', archived: 'archived-idea' },
  };

  for (const category in categoryClasses) {
    const { active, archived } = categoryClasses[category];
    document.querySelector(`.${active}`).textContent = calculateActive(category);
    document.querySelector(`.${archived}`).textContent = calculateArchived(category);
  }
}