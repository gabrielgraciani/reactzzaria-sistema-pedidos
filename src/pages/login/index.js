import React from 'react';
import {ReactComponent as Logo} from 'assets/images/logo-react-zzaria.svg';
import {useAuth} from 'hooks';


function Login(){
	const {login} = useAuth();

	return(
		<div id="wrap_login">
			<div className="indent">
				<div className="logo">
					<Logo />
				</div>

				<button className="botao ripple" onClick={login}>Entrar com GitHub</button>
			</div>
		</div>
	);
}

export default Login;