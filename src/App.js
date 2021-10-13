import './styles.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import IconList from './components/IconList';
import Grid from './components/Grid';

function App() {
  const [ChosenAlgo, setChosenAlgo] = useState('None');
  console.log('ChosenAlgo :', ChosenAlgo );

  const updateChosenAlgo = (chosenAlgo) => {
    setChosenAlgo(chosenAlgo);
  };

  return (
    <div className='App'>
      <div className='app-header'>
        <Navbar handleVisualizeClick={updateChosenAlgo}></Navbar>
        <IconList></IconList>
        <Grid chosenAlgo={ChosenAlgo}></Grid>
      </div>
    </div>
  );
}

export default App;
