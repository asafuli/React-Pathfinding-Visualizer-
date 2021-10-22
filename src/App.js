import './styles.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import IconList from './components/IconList';
import Grid from './components/Grid';

function App() {
  const [ChosenAlgo, setChosenAlgo] = useState('None');
  const [maze, setMaze] = useState('false');

  const updateChosenAlgo = (chosenAlgo) => {
    setChosenAlgo(chosenAlgo);
  };

  const addMaze = () => {
    setMaze((maze) => true);
  };

  const clearMaze = () => {
    setMaze((maze) => false);
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
        <Grid chosenAlgo={ChosenAlgo} maze={maze}></Grid>
      </div>
    </div>
  );
}

export default App;
