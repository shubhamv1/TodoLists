import React, { useState } from 'react';
import Header from './Header';
import NewNoteForm from './NewNoteForm';
import NotesList from './NotesList';
import './index.css';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';


function App() {
  const [notes, setNotes] = useState([
    { text: 'NOTE #1', completed: false },
    { text: 'NOTE #2', completed: true },
    { text: 'NOTE #3', completed: false },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentNote, setCurrentNote] = useState('');
  const [currentNoteIndex, setCurrentNoteIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentNoteIndex(null);
    setCurrentNote('');
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const addNote = (note) => {
    if (currentNoteIndex === null) {
      setNotes([...notes, { text: note, completed: false }]);
    } else {
      const updatedNotes = [...notes];
      updatedNotes[currentNoteIndex] = { ...updatedNotes[currentNoteIndex], text: note };
      setNotes(updatedNotes);
    }
    handleCloseModal();
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const editNote = (index) => {
    setCurrentNoteIndex(index);
    setCurrentNote(notes[index].text);
    handleOpenModal();
  };

  const toggleComplete = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].completed = !updatedNotes[index].completed;
    setNotes(updatedNotes);
  };

  // Filter notes based on the selected filter
  const filteredNotes = notes
    .filter(note => {
      if (filter === 'completed') return note.completed;
      if (filter === 'incomplete') return !note.completed;
      return true; // 'all' filter
    })
    .filter(note => note.text.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className={darkMode ? 'dark min-h-screen' : 'min-h-screen'}>
      <div className={`container-center ${darkMode ? 'dark' : ''}`}>
        <div className={`flex-area ${darkMode ? 'dark' : ''} bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 w-full max-w-md`}>
          <Header />
          <div className="flex items-center mb-4">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search note..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <SearchIcon className="search-icon" />
            </div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
              variant="contained"
              sx={{ marginLeft: 2, backgroundColor: 'blue', color: 'white' }}
            >
              {filter === 'completed' ? 'Completed' : filter === 'incomplete' ? 'Incomplete' : 'All'}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => { setFilter('all'); handleMenuClose(); }}>All</MenuItem>
              <MenuItem onClick={() => { setFilter('completed'); handleMenuClose(); }}>Completed</MenuItem>
              <MenuItem onClick={() => { setFilter('incomplete'); handleMenuClose(); }}>Incomplete</MenuItem>
            </Menu>
            <Button
              variant="contained"
              sx={{ marginLeft: 2, backgroundColor: 'blue', color: 'white' }}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? '🌞' : '🌙'}
            </Button>
          </div>
          
          <NotesList notes={filteredNotes} deleteNote={deleteNote} editNote={editNote} toggleComplete={toggleComplete} />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'dark' : ''}`}>
            <NewNoteForm
              addNote={addNote}
              closeModal={handleCloseModal}
              currentNote={currentNote}
              darkMode={darkMode}
            />
          </div>
        </div>
      )}

      <div className="fixed bottom-8 right-8 z-20">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg"
          onClick={handleOpenModal}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default App;
