import './styles.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import IconList from './components/IconList';
import Grid from './components/Grid';
import Modal from './components/Modal';

function App() {
  const [chosenAlgo, setChosenAlgo] = useState('None');
  const [maze, setMaze] = useState(false);
  const [clearBoard, setClearBoard] = useState(false);
  const [noPossiblePath, setNoPossiblePath] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [triggerCreateBoard, setTriggerCreateBoard] = useState(false);
  const [modalClicked, setModalClicked] = useState(false);

  const updateChosenAlgo = (chosenAlgo) => {
    setChosenAlgo(chosenAlgo);
  };

  const addMaze = () => {
    setMaze(true);
  };

  const handleMazeCreated = () => {
    setMaze(false);
  };
  const clearMaze = () => {
    setMaze(false);
    setClearBoard(true);
  };

  const createNewBoard = () => {
    setTriggerCreateBoard(true);
  };

  const boardCleared = () => {
    setClearBoard(false);
  };

  const updateNoPossiblePath = (noPossiblePathExist) => {
    setNoPossiblePath((noPossiblePath) => noPossiblePathExist);
    setCloseModal((closeModal) => noPossiblePathExist);
  };

  const handleModalClicked = () => {
    if (noPossiblePath) {
      setNoPossiblePath((noPossiblePath) => false);
      setModalClicked((modalClicked) => true);
    }
  };

  return (
    <div className='App' onClick={() => handleModalClicked()}>
      <div className='app-header'>
        <Navbar
          handleVisualizeClick={updateChosenAlgo}
          handleAddMaze={addMaze}
          handleClrMaze={clearMaze}
          createNewBoard={createNewBoard}
        ></Navbar>
        <IconList></IconList>
        <Grid
          chosenAlgo={chosenAlgo}
          updateChosenAlgo={updateChosenAlgo}
          maze={maze}
          clearBoard={clearBoard}
          handleBoardCleared={boardCleared}
          updateNoPossiblePath={updateNoPossiblePath}
          noPossiblePath={noPossiblePath}
          triggerCreateBoard={triggerCreateBoard}
          handleMazeCreated={handleMazeCreated}
          modalClicked={modalClicked}
        ></Grid>
      </div>
      {noPossiblePath ? (
        <Modal
          text={'No possible path'}
          modalClass={closeModal ? 'close-modal' : ''}
        ></Modal>
      ) : (
        ''
      )}
    </div>
  );
}

export default App;
