import React, { Component } from 'react';
import $ from "jquery";
// > npm i jquery
import "bootstrap/dist/css/bootstrap.css";
import './style.css';

class ReactTree extends Component {

	state = {
		objListData: this.props.arrDadosArvore,
		itemComponente: '',
		arrTeste: []
	}

	iniciaComponente() {
		let retorno_final = [];
		// eslint-disable-next-line
		for (let [key, value] of Object.entries(this.state.objListData)) {
			retorno_final.push(this.montarComponente(value, value.level));
		}
		return (retorno_final);
	}

	testeClick = (objEvent) => {
		let id_elemento = objEvent.currentTarget.getAttribute("data-tree");

		let checkBox = document.getElementById(`check-${id_elemento}`);
		let objElementosFilhos =
			document.getElementById(id_elemento).querySelectorAll('input[type="checkbox"]');

		if ((objElementosFilhos.length-1) < 1) {
			return;
		}

		for (let i = 0; i <= objElementosFilhos.length-1; i++) {
			let meu_id = objElementosFilhos[i].id;
			if (checkBox.checked) {
				$(`#${meu_id}`).prop("checked", true);
				continue;
			}

			$(`#${meu_id}`).prop("checked", false);
		}
	}

	montarComponente(objPercorrer, level_pai = 0) {
		let contador = 0;
		let { name, id } = objPercorrer;

		let str_retorno = [];
		str_retorno.push(
			<label for={"check-" + id}>
				<li className={id} data-tree={id} onClick={this.testeClick.bind(this)} >
					<input type="checkbox" name={'check-' + id} id={"check-" + id} /> {name} - {id}
				</li>
			</label>
		);

		if (!objPercorrer.hasOwnProperty('children') || Object.keys(objPercorrer).length < 1) {
			return;
		}

		contador = Object.keys(objPercorrer.children).length;
		for (let i = 0; i <= contador; i++) {
			if (objPercorrer.children[i] !== undefined) {
				str_retorno.push(this.montarComponente(objPercorrer.children[i], objPercorrer.level));
			}
		}

		return (<ul key={id} id={id} className={id} > {str_retorno} </ul>);
	}

	render() {
		const itemComponente = this.iniciaComponente();
		console.log('teste', itemComponente);

		return (
			<div>
				{itemComponente}
			</div>
		);
	}
}

export default ReactTree;