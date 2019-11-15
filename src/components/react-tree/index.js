import React, { Component } from 'react';
import $ from 'jquery';
import './style.css';

class ReactTree extends Component {


	state = {
		objListData: this.props.arrDadosArvore,
		itemComponente: ''
	}

	componentInit() {
		let objFinalContent = [];
		// eslint-disable-next-line
		for (let [key, objItem] of Object.entries(this.state.objListData)) {
			objFinalContent.push(this.buildComponent(objItem, objItem.level));
		}
		return (objFinalContent);
	}

	openCloseTree = (objEvent) => {

		let id_element = objEvent.currentTarget.parentElement.getAttribute('data-open-close');
		let tree_level = objEvent.currentTarget.parentElement.getAttribute('data-tree-level');

		let objChildElements =
			document.getElementById(id_element).querySelectorAll('ul');

		for (let i = 0; i <= objChildElements.length - 1; i++) {
			let my_id = objChildElements[i].id;
			let child_tree_level = objChildElements[i].getAttribute("data-tree-level");

			if ((parseInt(tree_level) + 1) === parseInt(child_tree_level)) {

				if ($(`#${my_id}`).hasClass('show-tree-items')) {

					$(`#open-${id_element}`)
						.removeClass('hide-tree-items')
						.addClass('show-tree-items');

					$(`#close-${id_element}`)
						.removeClass('show-tree-items')
						.addClass('hide-tree-items');

					$(`#${my_id}`)
						.removeClass('show-tree-items')
						.addClass('hide-tree-items');
					continue;
				}

				$(`#close-${id_element}`)
					.removeClass('hide-tree-items')
					.addClass('show-tree-items');

				$(`#open-${id_element}`)
					.removeClass('show-tree-items')
					.addClass('hide-tree-items');

				$(`#${my_id}`)
					.removeClass('hide-tree-items')
					.addClass('show-tree-items');
			}
		}

	}

	undoIndeterminateState = (objEventElement) => {
		let { id } = objEventElement;
		document.getElementById(`${id}`).indeterminate = false;
		$(`#check-${id}`).removeProp('indeterminate', false);
	}

	setItemsChecked = (objEvent) => {

		let id_element = objEvent.currentTarget.parentElement.getAttribute('data-tree');

		let tree_level = objEvent.currentTarget.getAttribute('data-tree-level');

		let checkBox = document.getElementById(`check-${id_element}`);

		let objChildElements =
			document.getElementById(id_element).querySelectorAll('input[type="checkbox"]');

		let objElementosPai =
			document.getElementById(id_element).parentElement;

		for (let i = 0; i <= objChildElements.length - 1; i++) {
			let my_id = objChildElements[i].id;
			this.undoIndeterminateState(objChildElements[i]);

			if (checkBox.checked) {
				$(`#${my_id}`)
					.prop('checked', true)
					.addClass('filled-in');
				continue;
			}

			$(`#${my_id}`).prop('checked', false);

		}

		// Depois de checar os itens da arvore, faz o rever para marcar o pai caso todos selecionads, parcial ou nenhum
		// if (parseInt(tree_level) > 0) {
		// 	this.setItemsCheckedParentElements(objElementosPai);
		// 	return;
		// }

		this.setItemsCheckedParentElements(objElementosPai);
	}

	setItemsCheckedParentElements = (objParentElement) => {
		try {
			let id_element = objParentElement.id;
			let elementHtml = document.getElementById(id_element);

			if (elementHtml === null || elementHtml === undefined) {
				return;
			}

			let objChildElements =
				elementHtml.querySelectorAll('input[type="checkbox"]');

			let counter = 0;
			for (let i = 1; i <= objChildElements.length - 1; i++) {
				if (objChildElements[i].checked) {
					counter++;
				}
			}

			document.getElementById(`check-${id_element}`).indeterminate = false;

			if (counter === 0) {
				$(`#check-${id_element}`)
					.addClass('filled-in')
					.prop('checked', false);
			}

			if (counter >= objChildElements.length - 1) {
				$(`#check-${id_element}`)
					.prop('checked', false);

				$(`#check-${id_element}`)
					.addClass('filled-in')
					.prop('checked', true);
			}

			if (counter > 0 && counter < objChildElements.length - 1) {
				$(`#check-${id_element}`)
					.removeClass('filled-in')
					.removeProp('checked');

				$(`#check-${id_element}`).removeProp('checked');

				document.getElementById(`check-${id_element}`).indeterminate = true;
			}

			if (objParentElement.parentElement.previousElementSibling != null) {
				this.setItemsCheckedParentElements(objParentElement.parentElement);
			}

		} catch (objError) {
			console.error('Erro ao renderizar o componente', objError);
		}
	}

	getLayoutComponent = (objItemsToComponent, counter) => {
		let { name, id, level } = objItemsToComponent;

		let layout = <li className="" data-tree={id}  >
			<label className="cursor-pointer" htmlFor={"check-" + id} data-tree={id} data-tree-level={level}>

				<input
					className="filled-in"
					type="checkbox"
					name={'check-' + id}
					id={"check-" + id}
					data-tree-level={level}
					onClick={this.setItemsChecked.bind(this)}
				/>
				<span className="cursor-pointer">{name}</span>

			</label>

			<div className="content-right cursor-pointer" data-open-close={id} data-tree-level={level}>
				<div
					className="opcao-abrir-fechar"
					id={'open-' + id}
					onClick={this.openCloseTree.bind(this)}
				>
					<i className="material-icons">keyboard_arrow_down</i>
				</div>
				<div
					className="hide-tree-items opcao-abrir-fechar"
					id={'close-' + id}
					onClick={this.openCloseTree.bind(this)}
				>
					<i className="material-icons">keyboard_arrow_up</i>
				</div>
			</div>
		</li>;

		// Se o counter é menor que 1(um), significa que esse item não tem filhos.
		if (counter < 1) {
			layout = <li className="" data-tree={id}  >
				<label className="cursor-pointer" htmlFor={"check-" + id} data-tree={id} data-tree-level={level}>

					<input
						className="filled-in"
						type="checkbox"
						name={'check-' + id}
						id={"check-" + id}
						data-tree-level={level}
						onClick={this.setItemsChecked.bind(this)}
					/>
					<span className="cursor-pointer">{name}</span>

				</label>
				<div className="content-right cursor-pointer" data-open-close={id} data-tree-level={level}>
					<div
						className="opcao-abrir-fechar"
						id={'open-' + id}
						onClick={this.openCloseTree.bind(this)}
						title="Último nível. Sem itens para listar"
					>
						<i className="material-icons">block</i>
					</div>
				</div>
			</li>;
		}

		return layout;
	}

	buildComponent(objItensComponent) {
		let counter = 0;
		let { name, id, level } = objItensComponent;

		let objContentComponent = [];
		counter = Object.keys(objItensComponent.children).length;

		objContentComponent.push(
			this.getLayoutComponent({name, id, level}, counter)
		);

		if (!objItensComponent.hasOwnProperty('children') || Object.keys(objItensComponent).length < 1) {
			return;
		}

		counter = Object.keys(objItensComponent.children).length;
		for (let i = 0; i <= counter; i++) {
			if (objItensComponent.children[i] !== undefined) {
				objContentComponent.push(
					this.buildComponent(objItensComponent.children[i], objItensComponent.level)
				);
			}
		}

		let str_class = 'browser-default ';
		str_class += ' hide-tree-items';
		if (level === 0) {
			str_class += ' show-tree-items';
		}

		return (<ul key={'ul-li-' + id} id={id} className={str_class} data-tree-level={level}> {objContentComponent} </ul>);
	}

	render() {
		const itemComponente = this.componentInit();
		return (
			<div className="fundo">
				{itemComponente}
			</div>
		);
	}
}

export default ReactTree;