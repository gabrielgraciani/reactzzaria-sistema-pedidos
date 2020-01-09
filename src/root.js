import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {CssBaseline} from '@material-ui/core';
import 'assets/css/styles.css';
import App from './app';
import {AuthProvider, OrderProvider} from 'contexts';


const Root = () =>(
		<AuthProvider>
			<OrderProvider>
				<CssBaseline />

				<BrowserRouter>
					<Route component={App} />
				</BrowserRouter>
			</OrderProvider>
		</AuthProvider>

);

export default Root;
