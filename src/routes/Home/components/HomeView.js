import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import CONFIG from '../../../config'
import MemberTable from './MemberView';
import Noty from '../../../components/Noty';

const s = ["connecting", "success", "error"]

export default class HomeView extends React.Component {

	constructor(props) {
		super(props);
		this.state = { status: s[0], collapse: true, open: false};
	}

	initData() {
		fetch(CONFIG.ENDPOINTS.HOME, CONFIG.POST_REQUEST())
			.then(response => response.json())
			.then(json => this.processing(json))
			.catch(e => this.setState({ status: s[1] }))
	}

	processing(response) {
		if (response.status.toLowerCase() == 'ok') this.setState({ status: s[1], open:true })
		else this.setState({ status: s[2] })
	}

	closeNoty() {
		this.setState({ open: false });
	}
	
	render() {
		let status = this.state.status, result = '', message = '';

		if (status == s[0]) {
			this.initData();
			result = (<div className="alert alert-warning" role="alert"> Подключаюсь к БД, ожидайте ..... </div>)
		} else if (status == s[1]) {
			message = (<Noty message="Я подключилась к серверу с БД" variant="success" open={this.state.open} closeNoty={() => this.closeNoty()}/>);
			result = (<MemberTable />);
		} else {
			result = (<div className="alert alert-danger" role="alert">
				У меня не удалось подключиться к серверу с БД ( </div>)
		}

		return (<div>{result}{message}</div>);
	}
}


