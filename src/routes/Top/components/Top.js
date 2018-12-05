import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem'
import CONFIG from '../../../config';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class Top extends React.Component {
  state = {
    contest: 0,
    organization: 0,
    group: 0,
    members: '',
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = () => {
    const state = this.state;
    fetch(CONFIG.ENDPOINTS.GET_TOP, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        table: "judge",
        id_organization: state.organization,
        id_contest: state.contest,
        id_group: state.group
      })
    }).then(resp => resp.json()).then(json => {
      if(json.response.members) {
        this.setState({ members: json.response.members });
      } else {
        this.setState({ members: '' });
      }
    })
  }
  
  render() {
    if (!this.props.tables) window.location.href = '/';
    const tables = this.props.tables;
    const { contests, groups, organizations } = this.props.tables;
    const classes = this.props.classes;
    let table = '';
    if(this.state.members && this.state.members[0]) {
      table = (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell numeric>#</TableCell>
                <TableCell>Фамилия</TableCell>
                <TableCell>Имя</TableCell>
                <TableCell>Отчество</TableCell>
                <TableCell numeric>Место</TableCell>
                <TableCell numeric>Количество очков</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.members.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell numeric component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.secondName}</TableCell>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell numeric>{row.place}</TableCell>
                    <TableCell numeric>{row.points}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      )
    }
    return (
      <div>
        <FormControl style={{marginRight: 30}} className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Соревнования</InputLabel>
          <Select value={this.state.contest} onChange={this.handleChange} inputProps={{ name: 'contest', id: 'age-simple' }} >
            <MenuItem value={0}> <em>None</em> </MenuItem>
            {contests.map(el => (<MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>))}
          </Select>
        </FormControl>
        <FormControl style={{marginRight: 30}} className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Группа</InputLabel>
          <Select value={this.state.group} onChange={this.handleChange} inputProps={{ name: 'group', id: 'age-simple' }} >
            <MenuItem value={0}> <em>None</em> </MenuItem>
            {groups.map(el => (<MenuItem key={el.id} value={el.id}>{el.id}</MenuItem>))}
          </Select>
        </FormControl>
        <FormControl style={{marginRight: 30}} className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Организация</InputLabel>
          <Select value={this.state.organization} onChange={this.handleChange} inputProps={{ name: 'organization', id: 'age-simple' }} >
            <MenuItem value={0}> <em>None</em> </MenuItem>
            {organizations.map(el => (<MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>))}
          </Select>
        </FormControl> 
        <button onClick={() => this.handleSubmit()} type="button" className="btn btn-success">Загрузить!</button>
        {table}        
      </div>
    )
  }
}

Top.propTypes = {
  tables: PropTypes.object,
};
export default withStyles(styles)(Top);
