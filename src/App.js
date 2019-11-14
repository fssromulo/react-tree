import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import ReactTree from './components/react-tree/index'

class App extends Component {
	render() {
		// Simula a busca de dados numa api ...
		const arrDadosArvore = require('./dados/data_copy.json');

		return (
			<div className="App">
				<form action="#">
					<h1> Árvore recursiva </h1>

					<br />
					<br />
					<ReactTree
						arrDadosArvore={arrDadosArvore}
					/>
				</form>
			</div >
		);
	}
}

export default App;