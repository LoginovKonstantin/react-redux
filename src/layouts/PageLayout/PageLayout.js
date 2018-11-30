import React from 'react'
import { Link, browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import SvgIcon from '@material-ui/core/SvgIcon';
import HomeIcon from '@material-ui/icons/Home';

let linkToName = [
  { link: "/", name: "Начальная страница" }, //HOME
  { link: "/add", name: "Добавить" },
  // { link: "/edit/member/?id=*", name: "Редактировать" },
  // { link: "/counter", name: "Counter" },
  // { link: "/about", name: "About" },
  // { link: "/correct", name: "Редактировать" },
  // { link: "/remove", name: "Удалить" },
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
    backgroundColor: theme.palette.background.paper
  }
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
    const href = window.location.href;
    const header = (href.indexOf("edit") > -1) ?
      <Tabs value={value} onChange={this.handleChange} indicatorColor="primary" >
        <Tab onClick={() => browserHistory.push("/")} icon={<HomeIcon />} />
      </Tabs>
      :
      <Tabs value={href.indexOf("add") > -1 ? 1 : 0} onChange={this.handleChange} scrollable scrollButtons="auto">
        {linkToName.map(TemplateNavigation)}
      </Tabs>
    return (
      <div className={classes.root}>
        <AppBar position="static">
          {header}
        </AppBar>
        <div className='container'>
          {children}
        </div>
      </div>
    );
  }
}

PageLayout.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
}

const TemplateNavigation = (arr, i) => (<Tab key={i} label={arr.name} onClick={() => browserHistory.push(arr.link)} />)
TemplateNavigation.propTypes = {
  arr: PropTypes.object,
  i: PropTypes.number,
}

export default withStyles(styles)(PageLayout)
