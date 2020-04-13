import React from 'react';
import Player from './components/Player';
import Playlist from './components/Playlist';
import AudiosContextProvider from './../src/contexts/AudiosContext';

function App() {
	return (
		<div className="flex items-center justify-center h-screen bg-gray-900">
			<AudiosContextProvider>
				<div id="app" className="flex">
					<Player />
					<Playlist />
				</div>
			</AudiosContextProvider>
    	</div>
  	);
}

export default App;
