import React from 'react';
import FooterWithOrderAndButtons from './footer-with-order-and-buttons';

const Footer = ({children, ...props}) => (
	<div id="wrap_footer">
		<div className="indent">
			{children || <FooterWithOrderAndButtons {...props} />}
		</div>
	</div>
);

export default Footer;