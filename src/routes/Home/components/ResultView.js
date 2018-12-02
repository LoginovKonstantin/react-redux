//https://material-ui.com/demos/tables/
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EnhancedTableHead from './TableHead';
import TableName from '../../../components/TableName';
import { stableSort, getSorting } from '../../../util';
import { browserHistory } from 'react-router'

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
	},
	table: {
		minWidth: 1020,
	},
	tableWrapper: {
		overflowX: 'auto',
	},
});

class EnhancedTable extends React.Component {
	state = {
		order: 'asc',
		orderBy: 'idResult',
		selected: [],
		data: this.props.resultTable,
		page: 0,
		rowsPerPage: 5,
	};

	handleRequestSort = (event, property) => {
		const orderBy = property;
		let order = 'desc';

		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc';
		}
		this.setState({ order, orderBy });
	};

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	isSelected = id => this.state.selected.indexOf(id) !== -1;

	render() {
		const { classes } = this.props;
		const { data, order, orderBy, rowsPerPage, page } = this.state;
		const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

		return (
			<div style={{ paddingTop: 50 }}>
				<TableName text='Результаты' />

				<Paper className={classes.root}>
					<div className={classes.tableWrapper}>
						<Table className={classes.table} aria-labelledby="tableTitle">
							<EnhancedTableHead
								order={order}
								orderBy={orderBy}
								onRequestSort={this.handleRequestSort}
								rows={[
									{ id: 'idResult', numeric: true, disablePadding: false, label: '#' },
									{ id: 'place', numeric: true, disablePadding: false, label: 'Место' },
									{ id: 'points', numeric: true, disablePadding: false, label: 'Количество очков' },
									{ id: 'contestId', numeric: true, disablePadding: false, label: 'Номер соревнования' },
								]}
							/>
							<TableBody>
								{stableSort(data, getSorting(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map(n => {
										const isSelected = this.isSelected(n.id);
										return (
											<TableRow
												hover
												role="checkbox"
												aria-checked={isSelected}
												tabIndex={-1}
												key={n.id}
												selected={isSelected}
											>
												<TableCell onClick={() => browserHistory.push('/edit/results/' + n.id)} style={{width:30}} numeric>{n.id}</TableCell>
												<TableCell numeric>{n.place}</TableCell>
												<TableCell numeric>{n.points}</TableCell>
												<TableCell numeric>{n.contestId}</TableCell>
											</TableRow>
										);
									})}
								{emptyRows > 0 && (
									<TableRow style={{ height: 49 * emptyRows }}>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={data.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={this.handleChangePage}
						onChangeRowsPerPage={this.handleChangeRowsPerPage}
					/>
				</Paper>
			</div>
		);
	}
}

EnhancedTable.propTypes = {
	classes: PropTypes.object.isRequired,
	resultTable: PropTypes.array.isRequired
};

export default withStyles(styles)(EnhancedTable);