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
  state = {
    description: '',
    judgeId: '',
    infrDate: '',
    comment: '',
    idMember: '',
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
    console.log(this.state)
    if (
      state.description.length < 1 ||
      parseInt(state.judgeId) < 1 ||
      parseInt(state.idMember) < 1 ||
      state.infringementDate.length < 1
    ) {
      console.log('Заполните все поля, проверьте корректность даты');
    } else {
      fetch(CONFIG.ENDPOINTS.ADD_ENTITY, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          table: "infringement",
          description: state.description,
          id_judge: state.judgeId,
          infr_date: dateFormat(state.infringementDate, "dd/mm/yy"),
          comment: state.comment,
          id_member: state.idMember
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
          <TextField fullWidth id="outlined-name" label="Описание нарушения *" className={classes.textField} value={this.state.description}
            onChange={this.handleChange('description')} margin="normal" variant="outlined" />
          <TextField fullWidth id="outlined-number" label="Номер судьи *" value={this.state.judgeId}
            onChange={this.handleChange('judgeId')} value={this.state.judgeId} type="number" className={classes.textField} margin="normal" variant="outlined" />
          <TextField fullWidth id="date" label="Дата нарушения *" type="date" defaultValue='' onChange={this.handleChange('infringementDate')}
            className={classes.textFieldDate} variant="outlined" InputLabelProps={{ shrink: true }} />
          <TextField fullWidth id="outlined-name" label="Комментарий" className={classes.textField} value={this.state.comment}
            onChange={this.handleChange('comment')} margin="normal" variant="outlined" />
          <TextField fullWidth id="outlined-number" label="Номер участника *" value={this.state.idMember}
            onChange={this.handleChange('idMember')} value={this.state.idMember} type="number" className={classes.textField} margin="normal" variant="outlined" />
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
