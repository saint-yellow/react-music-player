import React from 'react';
import Player from './components/Player';

function App() {
	return (
		<div className="flex items-center justify-center h-screen bg-gray-900">
			<div id="app" className="flex">
				<Player />
			</div>
    	</div>
  	);
}

export default App;
