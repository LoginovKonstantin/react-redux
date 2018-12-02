import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Noty from '../Noty';
import CONFIG from '../../config';

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
			name: e.name,
			locationId: e.locationId,
			status: '',
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
		if (state.name.length < 1 || state.locationId < 1) {
			console.log("Не все поля зоплнены");
		} else {
			fetch(CONFIG.ENDPOINTS.UPDATE_ENTITY, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					table: "organization",
					id: id,
					name: state.name,
					id_location: state.locationId
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
			body: JSON.stringify({ table: "organization",	id })
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
				<form className={classes.container} autoComplete="off">
					<TextField fullWidth id="outlined-name" label="Наименование *" className={classes.textField} value={this.state.name}
						onChange={this.handleChange('name')} margin="normal" variant="outlined" />
					<TextField fullWidth id="outlined-number" label="Номер местоположения *" value={this.state.locationId}
						onChange={this.handleChange('locationId')} value={this.state.locationId} type="number" className={classes.textField} margin="normal" variant="outlined" />
				</form>
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