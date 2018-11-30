import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import CONFIG from '../../../config'
import MemberTable from './MemberView';
import ContestTable from './ContestView';
import Noty from '../../../components/Noty';
import InfringementView from './InfringementView';
import GroupView from './GroupView';
import OrganizationView from './OrganizationView';
import LocationView from './LocationView';
import JudgeView from './JudgeView';
import ResultView from './ResultView';
import PropTypes from 'prop-types'

class HomeView extends React.Component {

	constructor(props) {
		super(props);
		this.state = { status: CONFIG.S[0], collapse: true, open: false, tables: [] };
	}

	initData() {
		fetch(CONFIG.ENDPOINTS.HOME)
			.then(response => response.json())
			.then(json => this.processing(json))
			.catch(e => { console.log(e);this.setState({ status: CONFIG.S[2] });})
	}

	processing(response) {
		if (response.status.toLowerCase() == 'ok') {
			const tables = response['response']
			this.setState({ status: CONFIG.S[1], open:true, tables })
			this.props.initData(tables)
		}
		else this.setState({ status: CONFIG.S[2] })
	}

	render() {
		let { status, tables } = this.state, result = '', message = '';

		if (status == CONFIG.S[0]) {
			this.initData();
			result = (<div className="alert alert-warning" role="alert"> Подключаюсь к БД, ожидайте ..... </div>)
		} else if (status == CONFIG.S[1]) {
			message = (<Noty message="Я подключилась к серверу с БД" variant="success" open={this.state.open} closeNoty={() => this.setState({ open: false })}/>);
			result = (<div>
				<MemberTable memberTable={tables.members} />
				<JudgeView judgeTable={tables.judges} />
				<ContestTable contestTable={tables.contests} />
				<InfringementView infringementTable={tables.infringements} />
				<GroupView groupTable={tables.groups} />
				<OrganizationView organizationTable={tables.organizations} />
				<LocationView locationTable={tables.locations} />
				<ResultView resultTable={tables.results} />				
			</div>);
		} else {
			result = (<div className="alert alert-danger" role="alert">
				У меня не удалось подключиться к серверу с БД ( </div>)
		}

		return (<div>{result}{message}</div>);
	}
}

HomeView.propTypes = {
  initData: PropTypes.func.isRequired,
  tables: PropTypes.object.isRequired,
}

export default HomeView
