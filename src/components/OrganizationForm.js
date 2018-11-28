import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Noty from './Noty';
import CONFIG from '../config';

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
		name: '',
		locationId: '',
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
		if (state.name.length < 1 || state.locationId < 1) {
			console.log("Не все поля зоплнены");
		} else {
			fetch(CONFIG.ENDPOINTS.ADD_ENTITY, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					table: "location",
					name: state.name,
					locationId: state.locationId
				})
			}).then(resp => resp.json()).then(json => {
				if (json.status == "ok") this.setState({ status: "ok", open: true })
				else this.setState({ status: "error", open: true });
			})
		}
	}

	render() {
		const { classes } = this.props;
		let message = '';
		if (this.state.status == "ok") {
			message = <Noty message="Запись добавлена" variant="success" open={this.state.open} closeNoty={() => this.setState({ open: false })} />
		}
		if (this.state.status == "error") {
			message = <Noty message="Не удалось добавить запись" variant="error" open={this.state.open} closeNoty={() => this.setState({ open: false })} />;
		}
		return (
			<div>
				<form className={classes.container} autoComplete="off">
					<TextField fullWidth id="outlined-name" label="Наименование *" className={classes.textField} value={this.state.name}
						onChange={this.handleChange('name')} margin="normal" variant="outlined" />
					<TextField fullWidth id="outlined-number" label="Номер местоположения *" value={this.state.locationId}
						onChange={this.handleChange('number')} value={this.state.number} type="number" className={classes.textField} margin="normal" variant="outlined" />
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