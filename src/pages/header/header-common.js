import React, {useState}  from 'react';
import {IconButton, Menu, MenuItem} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons';
import {ReactComponent as Logo} from 'assets/images/logo-react-zzaria.svg';
import {useAuth} from 'hooks';
import {Link} from 'react-router-dom';
import {HOME} from 'routes';

function HeaderCommon(){
	const {logout, userInfo} = useAuth();
	const [anchorElement, setAnchorElement] = useState(null);
	const handleOpenMenu = (e) => {
		setAnchorElement(e.target);
	};
	const handleClose = () => {
		setAnchorElement(null);
	};

	return(
		<>
			<div className="logo">
				<Link to={HOME}>
					<Logo />
				</Link>
			</div>

			<div className="conteudo">
				<div className="texto">
					<span>Olá {userInfo.user.firstName} =)</span>
				</div>
				<div className="menu">
					<IconButton color="inherit" onClick={handleOpenMenu}>
						<AccountCircle />
					</IconButton>

					<Menu
						open={!!anchorElement}
						onClose={handleClose}
						anchorEl={anchorElement}
					>
						<MenuItem onClick={logout}>Sair</MenuItem>
					</Menu>
				</div>
			</div>
		</>
	)
}

export default HeaderCommon;