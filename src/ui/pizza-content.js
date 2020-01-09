import React from 'react';

const PizzaContent = ({children}) => (
	<div id="wrap_pizza">
		<div className="indent">
			{children}
		</div>
	</div>

);

export default PizzaContent;