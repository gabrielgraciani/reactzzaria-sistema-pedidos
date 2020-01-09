import React, {Suspense, lazy} from 'react';
import Header from '../header';
import {Switch, Route} from 'react-router-dom';
import * as routes from 'routes';
import { LinearProgress } from '@material-ui/core';


const ChoosePizzaSize = lazy(() => import('pages/choose-pizza-size'));
const ChoosePizzaFlavours = lazy(() => import('pages/choose-pizza-flavours'));
const ChoosePizzaQuantity = lazy(() => import('pages/choose-pizza-quantity'));
const Checkout = lazy(() => import('pages/checkout'));
const CheckoutConfirmation = lazy(() => import('pages/checkout-confirmation'));
const CheckoutSuccess = lazy(() => import('pages/checkout-success'));

const Main = () => (
		<>
			<Header />

			<div className="main">
				<Suspense fallback={<LinearProgress />}>
					<Switch>
						<Route path={routes.HOME} component={ChoosePizzaSize} exact />
						<Route path={routes.CHOOSE_PIZZA_FLAVOURS} component={ChoosePizzaFlavours} />
						<Route path={routes.CHOOSE_PIZZA_QUANTITY} component={ChoosePizzaQuantity} />
						<Route path={routes.CHECKOUT} component={Checkout} exact />
						<Route path={routes.CHECKOUT_CONFIRMATION} component={CheckoutConfirmation} />
						<Route path={routes.CHECKOUT_SUCCESS} component={CheckoutSuccess} />
					</Switch>
				</Suspense>
			</div>
		</>
);

export default Main;