import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import emptyImage from './assets/empty.png'; // Adjust the path according to your project structure

function NotesList({ notes, deleteNote, editNote, toggleComplete }) {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <img src={emptyImage} alt="Empty" className="empty-image" />
        <p className="empty-text">Empty...</p>
      </div>
    );
  }

  return (
    <ul className="notes-list space-y-2">
      {notes.map((note, index) => (
        <li key={index} className="flex items-center space-x-2">
          <Checkbox
            checked={note.completed}
            onChange={() => toggleComplete(index)}
            sx={{ color: 'blue' }}
          />
          <span className={`flex-grow ${note.completed ? 'line-through' : ''}`}>{note.text}</span>
          <EditIcon
            sx={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => editNote(index)}
          />
          <DeleteIcon
            sx={{ color: 'red', cursor: 'pointer' }}
            onClick={() => deleteNote(index)}
          />
        </li>
      ))}
    </ul>
  );
}

export default NotesList;
