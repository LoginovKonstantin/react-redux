import React from 'react'
import { Link, browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

let linkToName = [
  { link: "/", name: "Начальная страница" }, //HOME
  // { link: "/counter", name: "Counter" },
  // { link: "/about", name: "About" },
  { link: "/add", name: "Добавить" },
  { link: "/correct", name: "Редактировать" },
  { link: "/remove", name: "Удалить" },
]


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

class PageLayout extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, children } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} scrollable scrollButtons="auto">
            {linkToName.map(TemplateNavigation)}
          </Tabs>
        </AppBar>
        {children}
      </div>
    );
  }
}

PageLayout.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
}

const TemplateNavigation = (arr, i) => (<Tab key={i} label={arr.name} onClick={()=>browserHistory.push(arr.link)} />)
TemplateNavigation.propTypes = {
  arr: PropTypes.object,
  i: PropTypes.number,
}

export default withStyles(styles)(PageLayout)
