import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import ReactTree from './components/react-tree/index'
import './index.css';

class App extends Component {
	render() {
		// Simula a busca de dados numa api ...
		const arrDadosArvore = require('./dados/data.json');

		return (
			<div className="App">
					<ReactTree
						arrDadosArvore={arrDadosArvore}
					/>
			</div >
		);
	}
}

export default App;