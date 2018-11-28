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
		city: '',
		country: '',
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
		if (state.city.length < 1 || state.country.length < 1) {
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
					country: state.country,
					city: state.city
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
					<TextField fullWidth id="outlined-name" label="Страна *" className={classes.textField} value={this.state.country}
						onChange={this.handleChange('country')} margin="normal" variant="outlined" />
					<TextField fullWidth id="outlined-name" label="Город *" className={classes.textField} value={this.state.city}
						onChange={this.handleChange('city')} margin="normal" variant="outlined" />
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