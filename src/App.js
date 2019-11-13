import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";

import ReactTree from './components/react-tree/index'

class App extends Component {

	render() {

		// console.log(this.state.objListData);
		return (
			<div className="App">
				<h1> React - Arvore recursiva </h1>
				<br />
				<br />
				<ReactTree
				/>
			</div>
		);
	}
}

export default App;
