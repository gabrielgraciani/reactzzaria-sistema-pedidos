import React, {useState} from 'react';
import HeaderContent from 'ui/header-content';
import Footer from 'ui/footer';
import {HOME, CHOOSE_PIZZA_FLAVOURS, CHECKOUT} from 'routes';
import {Redirect, Link} from 'react-router-dom';
import {useOrder} from 'hooks';

function ChoosePizzaQuantity({location}) {
	const [quantity, setQuantity] = useState(1);
	const {addPizzaToOrder} = useOrder();

	if(!location.state){
		return <Redirect to={HOME} />
	}

	function handleChange(e){
		const {value} = e.target;
		if(value >=1){
			setQuantity(value);
		}
	}

	function addPizza(){
		addPizzaToOrder({
			...location.state,
			quantity
		})
	}

	return(
		<>
			<HeaderContent>
				<div className="texto top">
					<h4>Quantas pizzas você gostaria <br />
						de pedir, com esses sabores?</h4>
				</div>
			</HeaderContent>

			<div id="wrap_quantidade">
				<div className="indent">
					<div className="input">
						<input type="number" value={quantity} onChange={handleChange} autoFocus />
					</div>

					<div className="texto">
						<Link to={HOME} onClick={addPizza}>
							<button className="botao ripple rosa">Adicionar e montar outra</button>
						</Link>

					</div>
				</div>
			</div>

			<Footer buttons={{
				back:{
					to: CHOOSE_PIZZA_FLAVOURS,
					children: 'Mudar sabores'
				},
				action:{
					to: CHECKOUT,
					onClick: addPizza,
					children: 'Finalizar Compra',
				}
			}} />
		</>
	)
}

export default ChoosePizzaQuantity;