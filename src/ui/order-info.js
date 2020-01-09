import React from 'react';
import {singularOrPlural} from 'utils';
import {useOrder} from 'hooks';
import {IconButton} from '@material-ui/core';
import {Close} from '@material-ui/icons';


function OrderInfo({showOptions}){
	const {order, removePizzaFromOrder} = useOrder();
	console.log("order", order);
	return(
		<>
			{order.pizzas.map((pizza) => {
				const {pizzaFlavours, pizzaSize, quantity} = pizza;
				const {name, slices, flavours} = pizzaSize;
				return(
					<div className="texto" key={pizza.id}>
						<span><b>{quantity}</b> {singularOrPlural(name, 'pizza', 'pizzas')} <b>{name.toUpperCase()} </b>
							({slices} {singularOrPlural(slices, 'fatia', 'fatias')}, {flavours} {singularOrPlural(flavours, 'sabor', 'sabores')})
						</span>

						<span>
						{singularOrPlural(pizzaFlavours.length, 'no sabor', 'nos sabores')} <b>{pizzaFlavours.map(({name}) => name).join(', ')}</b>
						</span>

						{showOptions && (
							<IconButton title="Remover" color="secondary" onClick={() => removePizzaFromOrder(pizza.id)}>
							<Close />
						</IconButton>
						)}
					</div>
				)
			})}
		</>
	)
}

export default OrderInfo;