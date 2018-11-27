import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Noty from './Noty';
import CONFIG from '../config';
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
	state = {
		firstName: '',
		secondName: '',
		lastName: '',
		number: 1,
		contestId: 1,
		organizationId: 1,
		resultId: 0,
		groupId: 1,
		status: '',
		open: false
	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	handleSubmit = () => {
		const state = this.state;
		if (
			state.firstName.length < 1 ||
			state.secondName.length < 1 ||
			state.lastName.length < 1 ||
			state.number < 1 ||
			state.contestId < 1 ||
			state.organizationId < 1 ||
			state.resultId < 0 ||
			state.groupId < 1
		) {
			this.setState({ error: "Вы пропустили поле...." })
			console.log("error")
		} else {
			fetch(CONFIG.ENDPOINTS.ADD_ENTITY, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					table: "member",
					firstName: state.firstName,
					secondName: state.secondName,
					lastName: state.lastName,
					number: state.number,
					contestId: state.contestId,
					organizationId: state.organizationId,
					resultId: state.resultId,
					groupId: state.groupId,
				})
			}).then(resp => resp.json()).then(json => {
				if (json.status.toLowerCase() == "ok") {
					this.setState({ status: "ok", open: true })
				} else {
					console.log(json)
					this.setState({ status: json.response, open: true });
				}
			})
		}
	}

	render() {
		const { classes } = this.props;
		const message = (this.state.status.toLowerCase() == "ok") ? 
		<Noty message="Запись добавлена" variant="success" open={this.state.open} closeNoty={() => this.setState({ open: false })}/> :
		<Noty message={this.state.status} variant="error" open={this.state.open} closeNoty={() => this.setState({ open: false })}/> ;
		return (
			<div>
				<form className={classes.container} autoComplete="off">
					<TextField id="outlined-name" label="Фамилия *" className={classes.textField} value={this.state.name}
						onChange={this.handleChange('secondName')} margin="normal" variant="outlined" />
					<TextField id="outlined-name" label="Имя *" className={classes.textField} value={this.state.name}
						onChange={this.handleChange('firstName')} margin="normal" variant="outlined" />
					<TextField id="outlined-name" label="Отчество *" className={classes.textField} value={this.state.name}
						onChange={this.handleChange('lastName')} margin="normal" variant="outlined" />
					<TextField id="outlined-number" label="Номер участника *" value={this.state.age}
						onChange={this.handleChange('number')} value={this.state.number} type="number" className={classes.textField} margin="normal" variant="outlined" />
					<TextField id="outlined-number" label="Номер соревнования *" value={this.state.age}
						onChange={this.handleChange('contestId')} value={this.state.contestId} type="number" className={classes.textField} margin="normal" variant="outlined" />
					<TextField id="outlined-number" label="Номер организации *" value={this.state.age}
						onChange={this.handleChange('organizationId')} value={this.state.organizationId} type="number" className={classes.textField} margin="normal" variant="outlined" />
					<TextField id="outlined-number" label="Номер группы *" value={this.state.groupId}
						onChange={this.handleChange('groupId')} type="number" className={classes.textField} margin="normal" variant="outlined" />
					<TextField id="outlined-number" label="Номер результата" value={this.state.resultId}
						onChange={this.handleChange('resultId')} type="number" className={classes.textField} margin="normal" variant="outlined" />
				</form>
				<button onClick={() => this.handleSubmit()} type="button" className="btn btn-success">Создать!</button>
				{message}
			</div>
		);
	}
}

OutlinedTextFields.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);