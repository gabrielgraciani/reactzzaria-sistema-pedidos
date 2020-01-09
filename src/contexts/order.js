import React, {createContext, useState} from 'react';
import uuidv4 from 'uuid/v4';
import firebase, {db} from 'services/firebase';
import {useAuth} from 'hooks';

const OrderContext = createContext();

function OrderProvider({children}){
	const [pizzas, addPizza] = useState([]);
	const [orderInProgress, setOrderInProgress] = useState(false);
	const [phone, addPhone] = useState('');
	const [address, addAddress] = useState({});
	const {userInfo} = useAuth();

	function addPizzaToOrder(pizza){
		if(orderInProgress){
			return addPizza((pizzas) => pizzas.concat(newPizza(pizza)));
		}

		setOrderInProgress(true);
		addPizza([newPizza(pizza)]);
	}

	function newPizza(pizza){
		return {
			id: uuidv4(),
			...pizza
		}
	}

	async function sendOrder(){
		console.log('send order');

		try{
			await db.collection('orders').add({
				userId: userInfo.user.uid,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				address,
				phone,
				pizzas: pizzas.map(pizza => ({
					size: pizza.pizzaSize,
					flavours: pizza.pizzaFlavours,
					quantity: pizza.quantity
				}))
			});
		}catch(e){
			console.log('erro ao salvar pedido: ', e);
		}


		setOrderInProgress(false);
	}

	function removePizzaFromOrder(id){
		console.log('remover', id);
		addPizza((pizzas) => pizzas.filter(p => p.id !== id))
	}
	return(
		<OrderContext.Provider value={{
			order:{
				pizzas,
				address,
				phone
			},
			addPizzaToOrder,
			sendOrder,
			removePizzaFromOrder,
			addAddress,
			addPhone
		}}>
			{children}
		</OrderContext.Provider>
	)
}

export {OrderProvider, OrderContext};