import './styles.css';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Grid from './components/Grid';
import Modal from './components/Modal';
import Title from './components/Title';

const INCREASE_SPEED = 1;
const DECREASE_SPEED = -1;
const INITIAL_ANIMATION_SPEED = 100;
const BOARD_ROWS = 27;
const BOARD_COLUMNS = 60;

function App() {
  const [shouldVisualize, setShouldVisualize] = useState(false);
  const [chosenAlgo, setChosenAlgo] = useState('None');
  const [maze, setMaze] = useState(false);
  const [clearBoard, setClearBoard] = useState(false);
  const [noPossiblePath, setNoPossiblePath] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [triggerCreateBoard, setTriggerCreateBoard] = useState(false);
  const [modalClicked, setModalClicked] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(INITIAL_ANIMATION_SPEED);
  const [boardRows, setBoardRows] = useState(BOARD_ROWS);
  const [boardColumns, setBoardColumns] = useState(BOARD_COLUMNS);
  //Event listener for resize grid

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const handleWindowResize = (resizeEvent) => {
    console.log(window.innerWidth);
    if (window.innerWidth <= 425) {
      setBoardColumns((boardColumns) => 30);
      setBoardRows((boardRows) => 54);
    } else if (window.innerWidth <= 768) {
      setBoardColumns((boardColumns) => 45);
      setBoardRows((boardRows) => 36);
    } else {
      setBoardColumns((boardColumns) => 60);
      setBoardRows((boardRows) => 27);
    }
  };

  const updateShouldVisualize = (currShouldVisualize) => {
    setShouldVisualize((shouldVisualize) => currShouldVisualize);
  };

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

  const handleSetSpeed = (animationSpeedDirection) => {
    if (animationSpeedDirection === INCREASE_SPEED) {
      setAnimationSpeed((animationSpeed) => Math.max(animationSpeed - 75, 0));
    } else if (animationSpeedDirection === DECREASE_SPEED) {
      setAnimationSpeed((animationSpeed) =>
        Math.min(animationSpeed + 75, 1500)
      );
    }
  };

  return (
    <div className='App' onClick={() => handleModalClicked()}>
      <div className='app-header'>
        <Title></Title>
        <Navbar
          updateChosenAlgo={updateChosenAlgo}
          updateShouldVisualize={updateShouldVisualize}
          handleAddMaze={addMaze}
          handleClrMaze={clearMaze}
          handleSetSpeed={handleSetSpeed}
          createNewBoard={createNewBoard}
          chosenAlgo={chosenAlgo === 'None' ? '' : chosenAlgo}
        ></Navbar>
        {/* <IconList></IconList> */}
        <div className='grid-border'>
          <Grid
            shouldVisualize={shouldVisualize}
            updateShouldVisualize={updateShouldVisualize}
            chosenAlgo={chosenAlgo}
            updateChosenAlgo={updateChosenAlgo}
            maze={maze}
            clearBoard={clearBoard}
            handleBoardCleared={boardCleared}
            updateNoPossiblePath={updateNoPossiblePath}
            noPossiblePath={noPossiblePath}
            triggerCreateBoard={triggerCreateBoard}
            handleMazeCreated={handleMazeCreated}
            animationSpeed={animationSpeed}
            modalClicked={modalClicked}
            boardColumns={boardColumns}
            boardRows={boardRows}
          ></Grid>
        </div>
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
