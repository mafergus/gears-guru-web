import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import TopCategoriesList from 'components/profile/TopCategoriesList';
import ServicesList from 'components/profile/ServicesList';

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
    backgroundColor: theme.palette.background.paper,
  },
});

class ServicesPane extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  constructor() {
    super();
    
    this.state = {
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, style } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root} style={{ ...style }}>
        <AppBar position="static" style={{ backgroundColor: "white" }}>
          <Tabs value={value} onChange={this.handleChange} textColor="secondary">
            <Tab label="Services" />
            <Tab label="Special Offers" />
          </Tabs>
        </AppBar>
        
        {value === 0 && <TabContainer>
            <TopCategoriesList style={{ width: "100%", backgroundColor: "red" }} />
            <ServicesList style={{ width: "100%", backgroundColor: "yellow" }}/>
          </TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
      </div>
    );
  }
}

export default withStyles(styles)(ServicesPane);
