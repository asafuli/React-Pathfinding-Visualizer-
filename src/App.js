import './styles.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import IconList from './components/IconList';
import Grid from './components/Grid';

function App() {
  const [chosenAlgo, setChosenAlgo] = useState('None');
  const [maze, setMaze] = useState(false);
  const [clearBoard, setClearBoard] = useState(false);

  const updateChosenAlgo = (chosenAlgo) => {
    setChosenAlgo(chosenAlgo);
  };

  const addMaze = () => {
    setMaze(true);
  };

  const clearMaze = () => {
    setMaze(false);
    setClearBoard(true);
  };

  const boardCleared = () => {
    setClearBoard(false);
  };

  return (
    <div className='App'>
      <div className='app-header'>
        <Navbar
          handleVisualizeClick={updateChosenAlgo}
          handleAddMaze={addMaze}
          handleClrMaze={clearMaze}
        ></Navbar>
        <IconList></IconList>
        <Grid
          chosenAlgo={chosenAlgo}
          maze={maze}
          clearBoard={clearBoard}
          handleBoardCleared={boardCleared}
        ></Grid>
      </div>
    </div>
  );
}

export default App;
