import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";

import ReactTree from './components/react-tree/index'

class App extends Component {
	render() {
		// Simula a busca de dados numa api ...
		const arrDadosArvore = require('./dados/data.json');

		return (
			<div className="App">
				<h1> Arvore recursiva </h1>
				<br />
				<br />
				<ReactTree
					arrDadosArvore={arrDadosArvore}
				/>
			</div>
		);
	}
}

export default App;
