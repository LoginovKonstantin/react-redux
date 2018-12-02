import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import dateFormat from 'dateformat';
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
	textFieldDate: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		marginTop: 15,
		marginBottom: 15
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
			dateStart: e.dateStart,
			dateEnd: e.dateEnd,
			status: e.status,
			organizationId: e.organizationId,
			name: e.name || '',
			open: false
		};
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	isDate (x) 
{ 
  return (null != x) && !isNaN(x) && ("undefined" !== typeof x.getDate); 
}

	handleSubmit = () => {
		const state = this.state;
		const id = this.props.id;
		const nowDate = (dateFormat('', "yyyy-mm-dd"))
		if (
			state.status.length < 1 ||
			state.organizationId < 1 ||
			state.name.length < 1 ||
			state.dateStart.length < 1 ||
			state.dateEnd.length < 1 ||
			state.dateStart >= state.dateEnd ||
			nowDate >= state.dateStart
		) {
			console.log('Заполните все поля, проверьте корректность даты');
		} else {
			fetch(CONFIG.ENDPOINTS.UPDATE_ENTITY, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					table: "contest",
					id: id,
					status: state.status,
					name: state.name,
					date_start: dateFormat(state.dateStart, "dd/mm/yy"),
					date_end: dateFormat(state.dateEnd, "dd/mm/yy"),
					id_organization: state.organizationId
				})
			}).then(resp => resp.json()).then(json => {
				if (json.status == "ok") {
					this.setState({ status: "ok", response: json.response, open: true })
					setTimeout(() => window.location.href = "/", 1500)
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
			body: JSON.stringify({ table: "contest", id })
		}).then(resp => resp.json()).then(json => {
			if (json.status == "ok") {
				this.setState({ status: "ok", response: json.response, open: true })
				setTimeout(() => window.location.href = "/", 1500)
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
					<TextField fullWidth id="outlined-name" label="Статус соревнования *" className={classes.textField} value={this.state.status}
						onChange={this.handleChange('status')} margin="normal" variant="outlined" />
					<TextField fullWidth id="outlined-number" label="Номер организации *" value={this.state.organizationId}
						onChange={this.handleChange('organizationId')} value={this.state.organizationId} type="number" className={classes.textField} margin="normal" variant="outlined" />
					<TextField fullWidth id="date" label="Начало сорвенований" type="date" defaultValue='' onChange={this.handleChange('dateStart')}
						className={classes.textFieldDate} variant="outlined" InputLabelProps={{ shrink: true }} />
					<TextField fullWidth id="date" label="Конец сорвенований" type="date" defaultValue='' onChange={this.handleChange('dateEnd')}
						className={classes.textFieldDate} variant="outlined" InputLabelProps={{ shrink: true }} />
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
