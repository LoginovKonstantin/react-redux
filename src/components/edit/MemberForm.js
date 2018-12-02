import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Noty from '../Noty';
import CONFIG from '../../config';
import './MemberForm.scss'

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
	dense: {
		marginTop: 16,
	},
	menu: {
		width: 200,
	},
});

class OutlinedTextFields extends React.Component {
	constructor(props) {
		super(props);
		const e = props.entity;
		this.state = {
			firstName: e.firstName,
			secondName: e.secondName,
			lastName: e.lastName,
			number: e.number,
			contestId: e.contestId,
			organizationId: e.organizationId,
			resultId: e.resultId,
			groupId: e.groupId,
			status: e.status,
			resultId: e.resultId || 0,
			open: false
		};
	}
	

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	handleSubmit = () => {
		const state = this.state;
		const id = this.props.id;
		if (
			state.firstName.length < 1 ||
			state.secondName.length < 1 ||
			state.lastName.length < 1 ||
			state.number < 1 ||
			state.contestId < 1 ||
			state.organizationId < 1 ||
			state.groupId < 1
		) {
			console.log("Не все поля зоплнены");
		} else {
			fetch(CONFIG.ENDPOINTS.UPDATE_ENTITY, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					table: "member",
					id: id,
					first_name: state.firstName,
					second_name: state.secondName,
					last_name: state.lastName,
					number: state.number,
					id_contest: state.contestId,
					id_organization: state.organizationId,
					id_group: state.groupId,
					id_result: state.resultId < 1 ? null : state.resultId
				})
			}).then(resp => resp.json()).then(json => {
				if (json.status == "ok") {
					this.setState({ status: "ok", response: json.response, open: true })
					setTimeout(()=> window.location.href = "/", 1500)
				}
				else this.setState({ status: "error", response: json.response, open: true });
			})
		}
	}

	handleErrorSubmit = () => {
		const id = this.props.id;
		fetch(CONFIG.ENDPOINTS.REMOVE_ENTITY, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ table: "member",	id })
		}).then(resp => resp.json()).then(json => {
			if (json.status == "ok") {
				this.setState({ status: "ok", response: json.response, open: true })
				setTimeout(()=> window.location.href = "/", 1500)
			}
			else this.setState({ status: "error", response: json.response, open: true });
		})
	}

	render() {
		const { classes } = this.props;
		let message = '';
		const { status, response } = this.state;
		if (status == "ok" && response == "update") {
			message = <Noty message="Запись обновлена" variant="success" open={this.state.open} closeNoty={() => this.setState({ open: false })} />
		} else if (status == "ok" && response == "remove") {
			message = <Noty message="Запись удалена" variant="success" open={this.state.open} closeNoty={() => this.setState({ open: false })} />
		} else if (status == "error" && response == "update") {
			message = <Noty message="Не удалось обновить запись" variant="error" open={this.state.open} closeNoty={() => this.setState({ open: false })} />;
		} else if (status == "error" && response == "remove") {
			message = <Noty message="Не удалось удалить запись" variant="error" open={this.state.open} closeNoty={() => this.setState({ open: false })} />;
		}
		return (
			<div>
				<TextField fullWidth id="outlined-name" label="Фамилия *" className={classes.textField} value={this.state.secondName}
					onChange={this.handleChange('secondName')} margin="normal" variant="outlined" />
				<TextField fullWidth id="outlined-name" label="Имя *" className={classes.textField} value={this.state.firstName}
					onChange={this.handleChange('firstName')} margin="normal" variant="outlined" />
				<TextField fullWidth id="outlined-name" label="Отчество *" className={classes.textField} value={this.state.lastName}
					onChange={this.handleChange('lastName')} margin="normal" variant="outlined" />
				<TextField fullWidth id="outlined-number" label="Номер участника *" value={this.state.number}
					onChange={this.handleChange('number')} value={this.state.number} type="number" className={classes.textField} margin="normal" variant="outlined" />
				<TextField fullWidth id="outlined-number" label="Номер соревнования *" value={this.state.age}
					onChange={this.handleChange('contestId')} value={this.state.contestId} type="number" className={classes.textField} margin="normal" variant="outlined" />
				<TextField fullWidth id="outlined-number" label="Номер организации *" value={this.state.age}
					onChange={this.handleChange('organizationId')} value={this.state.organizationId} type="number" className={classes.textField} margin="normal" variant="outlined" />
				<TextField fullWidth id="outlined-number" label="Номер группы *" value={this.state.groupId}
					onChange={this.handleChange('groupId')} type="number" className={classes.textField} margin="normal" variant="outlined" />
				<TextField fullWidth id="outlined-number" label="Номер результата *" value={this.state.resultId}
					onChange={this.handleChange('resultId')} type="number" className={classes.textField} margin="normal" variant="outlined" />
				<button onClick={() => this.handleSubmit()} type="button" className="btn btn-success">Изменить!</button>
				<button onClick={() => this.handleErrorSubmit()} type="button" className="btn btn-danger">Удалить запись!</button>
				{message}
			</div>
		);
	}
}

OutlinedTextFields.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);