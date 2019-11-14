import React, { Component } from 'react';
import $ from "jquery";
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

	abrirFecharArvore = (objEvent) => {

		let id_elemento = objEvent.currentTarget.id;
		let tree_level = objEvent.currentTarget.getAttribute("data-tree-level");

		let objElementosFilhos =
			document.getElementById(id_elemento).querySelectorAll('ul');


		for (let i = 0; i <= objElementosFilhos.length - 1; i++) {
			let meu_id = objElementosFilhos[i].id;
			let tree_level_filho = objElementosFilhos[i].getAttribute("data-tree-level");


			if ((parseInt(tree_level) + 1) === parseInt(tree_level_filho)) {

				if ($(`#${meu_id}`).hasClass('mostrar')) {
					$(`#${meu_id}`).removeClass('mostrar');
					$(`#${meu_id}`).addClass('esconder');
					continue;
				}

				$(`#${meu_id}`).removeClass('esconder');
				$(`#${meu_id}`).addClass('mostrar');
			}
		}

	}

	marcarDesmarcarItens = (objEvent) => {

		let id_elemento = objEvent.currentTarget.parentElement.getAttribute('data-tree');

		let tree_level = objEvent.currentTarget.getAttribute("data-tree-level");

		let checkBox = document.getElementById(`check-${id_elemento}`);

		let objElementosFilhos =
			document.getElementById(id_elemento).querySelectorAll('input[type="checkbox"]');

		let objElementosPai =
			document.getElementById(id_elemento).parentElement;

		for (let i = 0; i <= objElementosFilhos.length - 1; i++) {
			let meu_id = objElementosFilhos[i].id;
			if (checkBox.checked) {
				$(`#${meu_id}`).prop('checked', true);
				continue;
			}
			$(`#${meu_id}`).prop('checked', false);
		}

		// Depois de checar os itens da arvore, faz o rever para marcar o pai caso todos selecionads, parcial ou nenhum
		if (parseInt(tree_level) > 0) {
			this.marcarDesmarcarItensPais(objElementosPai, 0);
			return;
		}

		this.marcarDesmarcarItensPais(objElementosPai, 1);
	}

	marcarDesmarcarItensPais = (objPaisPercorrer, teste = 0) => {
		// console.log('marcarDesmarcarItensPais >', objPaisPercorrer);
		try {
			if (objPaisPercorrer.parentElement.previousElementSibling != null && teste === 0) {
				this.marcarDesmarcarItensPais(objPaisPercorrer.parentElement);
			}

			let id_elemento = objPaisPercorrer.id;
			let objElementosFilhos =
				document.getElementById(id_elemento).querySelectorAll('input[type="checkbox"]');

			let contador = 0;
			// debugger;
			for (let i = 1; i <= objElementosFilhos.length - 1; i++) {

				if (objElementosFilhos[i].checked) {
					contador++;
				}
			}

			$(`#${id_elemento}`)
				.removeClass('classe1')
				.removeClass('classe2')
				.removeClass('classe3');

			document.getElementById(`check-${id_elemento}`).indeterminate = false;

			if (contador === 0) {
				// $(`#${id_elemento}`).addClass('classe1');
				$(`#check-${id_elemento}`)
					.addClass('filled-in')
					.prop('checked', false);
			}

			if (contador >= objElementosFilhos.length - 1) {
				// $(`#${id_elemento}`)
				// 	.addClass('classe2');
				$(`#check-${id_elemento}`)
					.prop('checked', false);

				$(`#check-${id_elemento}`)
					.addClass('filled-in')
					.prop('checked', true);
			}

			// debugger
			if (contador > 0 && contador < objElementosFilhos.length - 1) {
				$(`#check-${id_elemento}`)
					.removeClass('filled-in')
					.removeProp('checked');
				$(`#check-${id_elemento}`).removeProp('checked');
				// $(`#${id_elemento}`).addClass('classe3');

				document.getElementById(`check-${id_elemento}`).indeterminate = true;

				return;
			}


			return '';
		} catch (objError) {
			console.error('Erro ao renderizar o componente', objError);
		}
	}

	montarComponente(objPercorrer) {
		let contador = 0;
		let { name, id, level } = objPercorrer;

		let str_retorno = [];
		str_retorno.push(
			<li className="collection-item" data-tree={id} >
				<label htmlFor={"check-" + id} data-tree={id} data-tree-level={level}>

					<input
						type="checkbox"
						className="filled-in"
						name={'check-' + id}
						id={"check-" + id}
						data-tree-level={level}
						onClick={this.marcarDesmarcarItens.bind(this)}
					/>
					<span>{name}</span>

				</label>
				<span

					data-tree-level={level}
					id={id}
					onClick={this.abrirFecharArvore.bind(this)}
				>Abrir</span>
			</li>
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

		let str_class = 'collection';
		str_class += ' esconder';
		if (level === 0) {
			str_class += ' mostrar';
		}

		return (<ul key={id} id={id} className={str_class} data-tree-level={level}> {str_retorno} </ul>);
	}

	render() {
		const itemComponente = this.iniciaComponente();
		return (
			<div>
				{itemComponente}
			</div>
		);
	}
}

export default ReactTree;