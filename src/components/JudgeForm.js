import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Noty from './Noty';
import CONFIG from '../config';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
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
  state = {
    secondName: '',
    firstName: '',
    lastName: '',
    organizationId: 1,
    contestId: 1,
    status: '',
    open: false
  };

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
    if (
      state.secondName.length < 1 ||
      state.firstName.length < 1 ||
      state.lastName.length < 1 ||
      state.contestId < 1 ||
      state.organizationId < 1
    ) {
      console.log("Не все поля зоплнены");
    } else {
      fetch(CONFIG.ENDPOINTS.ADD_ENTITY, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          table: "judge",
          secondName: state.secondName,
          firstName: state.firstName,
          lastName: state.lastName,
          contestId: state.contestId,
          organizationId: state.organizationId
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
