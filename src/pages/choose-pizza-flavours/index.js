import React, {useState} from 'react';
import HeaderContent from 'ui/header-content';
import PizzaContent from 'ui/pizza-content';
import {singularOrPlural, toMoney} from 'utils';
import {Redirect,} from 'react-router-dom';
import {HOME, CHOOSE_PIZZA_QUANTITY} from 'routes';
import Footer from 'ui/footer';
import {useCollection} from 'hooks';
import { LinearProgress } from '@material-ui/core';

const ChoosePizzaFlavours = ({ location }) => {
	const [checkboxes, setCheckboxes] = useState(() => ({}));
	const pizzasFlavours = useCollection('pizzasFlavours');

	if (!location.state) {
		return <Redirect to={HOME} />
	}

	if(!pizzasFlavours){
		return <LinearProgress />
	}

	if(pizzasFlavours.length === 0){
		return 'Não há dados';
	}

	const {flavours, id} = location.state.pizzaSize;

	const handleChangeCheckbox = (pizzaId) => (e) => {
		console.log('checkboxes', checkboxes);
		if (
			checkboxesChecked(checkboxes).length === flavours &&
			e.target.checked === true
		) {
			return
		}

		setCheckboxes((checkboxes) => {
			return {
				...checkboxes,
				[pizzaId]: !checkboxes[pizzaId]
			}
		})
	};

	return(
		<>
			<HeaderContent>
				<div className="texto top">
					<h4>Escolha até {flavours} {singularOrPlural(flavours, 'sabor', 'sabores')}:</h4>
				</div>
			</HeaderContent>

			<PizzaContent>
					{pizzasFlavours.map((pizza) => (
						<label key={pizza.id}>
							<div className={`item ${checkboxes[pizza.id] ? "active" : ""}`} >
								<input type="checkbox"
									   value=""
									   checked={!!checkboxes[pizza.id]}
									   onChange={handleChangeCheckbox(pizza.id)} />

								<div className="imagem">
									<img src={pizza.image} alt={pizza.name} />
								</div>

								<div className="borda"></div>

								<div className="texto">
									<h5>{pizza.name}</h5>
									<span>{toMoney(pizza.value[id])}</span>
								</div>
							</div>
						</label>
					))}
			</PizzaContent>

			<Footer buttons={{
				back:{
					to: HOME,
					children:'Mudar Tamanho'
				},
				action: {
					to: {
					pathname: CHOOSE_PIZZA_QUANTITY,
					state: {
					...location.state,
					pizzaFlavours: getFlavoursNameAndId({checkboxes, pizzasFlavours})
				}
				},
					children: 'Quantas pizzas?',
					disabled: checkboxesChecked(checkboxes).length === 0
				}
			}} />
		</>
	)
};

function checkboxesChecked (checkboxes) {
	return Object.values(checkboxes).filter(Boolean)
}

function getFlavoursNameAndId({checkboxes, pizzasFlavours}){
	return Object.entries(checkboxes).filter(([, value]) => !!value)
		.map(([id]) => ({
			id,
			name: pizzasFlavours.find((flavour) => flavour.id === id).name
		})
	);
}

export default ChoosePizzaFlavours;