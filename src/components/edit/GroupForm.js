import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Noty from '../Noty';
import CONFIG from '../../config';
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
  constructor(props) {
    super(props);
    const e = props.entity;
    this.state = {
      age: e.age,
      sex: '',
      weight: e.weight,
      rank: e.rank,
      status: e.status,
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
      parseInt(state.age) < 1 ||
      // state.sex !== '0' || state.sex !== '1' ||
      // parseInt(state.sex) != 0  || parseInt(state.sex) != 1 ||
      parseInt(state.weight) < 1 ||
      parseInt(state.rank.length) < 1
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
          table: "group",
          id: id,
          age: state.age,
          sex: state.sex,
          weight: state.weight,
          rank: state.rank
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
      body: JSON.stringify({ table: "group", id })
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
          <TextField fullWidth id="outlined-number" label="Возраст участника *" value={this.state.age}
            onChange={this.handleChange('age')} value={this.state.age} type="number" className={classes.textField} margin="normal" variant="outlined" />
          <TextField fullWidth id="outlined-number" label="Вес участника *" value={this.state.weight}
            onChange={this.handleChange('weight')} value={this.state.weight} type="number" className={classes.textField} margin="normal" variant="outlined" />
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Пол</FormLabel>
            <RadioGroup
              aria-label="Gender"
              name="gender1"
              className={classes.group}
              value={this.state.sex}
              onChange={this.handleChange('sex')}
            >
              <FormControlLabel value={1 + ''} control={<Radio />} label="М" />
              <FormControlLabel value={0 + ''} control={<Radio />} label="Ж" />
            </RadioGroup>
          </FormControl>
          <TextField fullWidth id="outlined-number" label="Разряд *" value={this.state.rank}
            onChange={this.handleChange('rank')} value={this.state.rank} type="string" className={classes.textField} margin="normal" variant="outlined" />
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