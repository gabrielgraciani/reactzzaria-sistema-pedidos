import React, { lazy, useEffect, Suspense, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import firebase from 'services/firebase';
import {useAuth} from 'hooks';
import {HOME, LOGIN} from 'routes';

const MainPage = lazy(() => import('pages/main'));
const Login = lazy(() => import('pages/login'));

function App ({ location }) {
	const { userInfo, setUserInfo } = useAuth();
	const { isUserLoggedIn } = userInfo;
	const [didCheckUserIn, setDidCheckUserIn] = useState(false);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			console.log('dados do usuário:', user);
			setUserInfo({
				isUserLoggedIn: !!user,
				user: !!user && {
					...user,
					firstName: user.email.split('t')[0]
				}
			});
			setDidCheckUserIn(true);
		});

	}, [setUserInfo]);

	if(!didCheckUserIn){
		return <LinearProgress />
	}

	if(isUserLoggedIn && location.pathname === LOGIN){
		return <Redirect to={HOME} />
	}

	if(!isUserLoggedIn && location.pathname !== LOGIN){
		return <Redirect to={LOGIN} />
	}


	return (
		<Suspense fallback={<LinearProgress />}>
			<Switch>
				<Route path={LOGIN} component={Login} />
				<Route component={MainPage} />
			</Switch>
		</Suspense>
	)
}

export default App
