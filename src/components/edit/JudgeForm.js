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
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class OutlinedTextFields extends React.Component {

  constructor(props) {
    super(props);
    const e = props.entity;
    this.state = {
      secondName: e.secondName,
      firstName: e.firstName,
      lastName: e.lastName,
      organizationId: e.organizationId,
      contestId: e.contestId,
      status: e.status || '',
      open: false
    };
  }
  

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleSubmit = () => {
    const state = this.state;
    const id = this.props.id + 1;
    if (
      state.secondName.length < 1 ||
      state.firstName.length < 1 ||
      state.lastName.length < 1 ||
      state.contestId < 1 ||
      state.organizationId < 1
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
          table: "judge",
          id: id,
          second_name: state.secondName,
          first_name: state.firstName,
          last_name: state.lastName,
          id_contest: state.contestId,
          id_organization: state.organizationId
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
			body: JSON.stringify({ table: "judge",	id })
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
          <TextField fullWidth id="outlined-number" label="Фамилия *" value={this.state.secondName}
            onChange={this.handleChange('secondName')} value={this.state.secondName} type="string" className={classes.textField} margin="normal" variant="outlined" />
          <TextField fullWidth id="outlined-number" label="Имя *" value={this.state.firstName}
            onChange={this.handleChange('firstName')} value={this.state.firstName} type="string" className={classes.textField} margin="normal" variant="outlined" />
          <TextField fullWidth id="outlined-number" label="Отчетсво *" value={this.state.lastName}
            onChange={this.handleChange('lastName')} value={this.state.lastName} type="string" className={classes.textField} margin="normal" variant="outlined" />
          <TextField fullWidth id="outlined-number" label="Номер организации *" value={this.state.organizationId}
            onChange={this.handleChange('organizationId')} value={this.state.organizationId} type="number" className={classes.textField} margin="normal" variant="outlined" />
          <TextField fullWidth id="outlined-number" label="Номер соревнования *" value={this.state.contestId}
            onChange={this.handleChange('contestId')} value={this.state.contestId} type="number" className={classes.textField} margin="normal" variant="outlined" />
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
