import {Component} from 'react';

class ErrorBoundary extends Component{
	state = {hasError: false};
	static getDerivedStateFromError(error){
		console.log('error getDerivedStateFromError:', error);
		return {hasError: true}
	}

	componentDidCatch(error, info){
		console.log('error:', error);
		console.log('info:', info);
	}

	render(){
		return this.props.children(this.state.hasError)
	}
}

export default ErrorBoundary;