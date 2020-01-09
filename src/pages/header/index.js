import React from 'react';
import HeaderCommon from './header-common';
import HeaderCheckout from './header-checkout';
import {Route, Switch} from 'react-router-dom';
import {CHECKOUT} from 'routes';

const Header = () => (
		<>
		<div id="wrap_header">
			<div className="indent">
				<Switch>
					<Route path={CHECKOUT} component={HeaderCheckout} />
					<Route component={HeaderCommon} />
				</Switch>
			</div>
		</div>
		</>
);

export default Header;