import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import MemberForm from '../../../components/MemberForm';
import LocationForm from '../../../components/LocationForm';
import OrganizationForm from '../../../components/OrganizationForm';
import ContestForm from '../../../components/ContestForm';
import ResultForm from '../../../components/ResultForm';
import GroupForm from '../../../components/GroupForm';
import JudgeForm from '../../../components/JudgeForm';
import InfringementForm from '../../../components/InfringementForm';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class AddEntity extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            <Tab label="УЧАСТНИКИ" />
            <Tab label="СУДЬИ" />
            <Tab label="СОРЕВНОВАНИЯ" />
            <Tab label="НАРУШЕНИЯ" />
            <Tab label="ГРУППЫ" />
            <Tab label="ОРГАНИЗАЦИИ" />
            <Tab label="МЕСТОПОЛОЖЕНИЯ" />
            <Tab label="РЕЗУЛЬТАТЫ" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><MemberForm/></TabContainer>}
        {value === 1 && <TabContainer><JudgeForm/></TabContainer>}
        {value === 2 && <TabContainer><ContestForm/></TabContainer>}
        {value === 3 && <TabContainer><InfringementForm/></TabContainer>}
        {value === 4 && <TabContainer><GroupForm/></TabContainer>}
        {value === 5 && <TabContainer><OrganizationForm/></TabContainer>}
        {value === 6 && <TabContainer><LocationForm/></TabContainer>}
        {value === 7 && <TabContainer><ResultForm/></TabContainer>}
      </div>
    );
  }
}

AddEntity.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AddEntity)
