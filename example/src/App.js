import React from 'react'

import { ProgressCircle } from 'react-simple-circle-rating';

const App = () => {
	return (
		<>
			<ProgressCircle percentage={80}/>
			<ProgressCircle 
				percentage={70}
				color="#ffc7e3"
				colorBackground="#f0f0f0"
				textColor="#3d3d3d"
				size={30}
			/>
			<ProgressCircle 
				percentage={50}
				color={["#00bd00", "#ffb01f", "#ff3d3d"]}
				colorBackground="#4d4d4d"
				textColor="#3d3d3d"
				size={40}
			/>
		</>  
	)
}

export default App
