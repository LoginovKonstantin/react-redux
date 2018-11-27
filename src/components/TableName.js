import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function TableName(props) {
  return (
    <div>
      <Paper className={props.classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          {props.text}
        </Typography>
      </Paper>
    </div>
  );
}

TableName.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
};

export default withStyles(styles)(TableName);