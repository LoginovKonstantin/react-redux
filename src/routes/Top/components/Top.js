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

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
class Top extends React.Component {
  state = {
    contest: 0,
    organization: 0,
    group: 0,
    members: '',
  };
  handleChange = event => {
    console.log(event.target.name)
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = () => {
    const state = this.state;
    console.log(state);
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
      if(json.members) {
        this.setState({ members: json.members });
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
    if(this.state.member != '') {
      table = (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell numeric>Calories</TableCell>
                <TableCell numeric>Fat (g)</TableCell>
                <TableCell numeric>Carbs (g)</TableCell>
                <TableCell numeric>Protein (g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell numeric>{row.calories}</TableCell>
                    <TableCell numeric>{row.fat}</TableCell>
                    <TableCell numeric>{row.carbs}</TableCell>
                    <TableCell numeric>{row.protein}</TableCell>
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

        
      </div>
    )
  }
}

Top.propTypes = {
  tables: PropTypes.object,
};
export default withStyles(styles)(Top);
