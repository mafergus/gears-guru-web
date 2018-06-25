import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { connect } from 'react-redux';

import TopCategoriesList from 'components/profile/TopCategoriesList';
import ServicesList from 'components/profile/ServicesList';
import { dividerColor } from 'util/colors';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 5 }}>
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

function mapStateToProps(state, props) {
  const listIds = props.garage.lists;
  const lists = listIds && Object.keys(listIds).map(id => { return { ...state.lists[id], uid: id } });
  const leLists = lists && lists.map(item => {
    const list = state.lists[item.uid];
    const rank = list && list.items.indexOf(props.garage.uid);
    return list && { rank: rank+1, uid: item.uid, name: list.name };
  });
  let categories = props.garage && props.garage.categories && Object.keys(props.garage.categories).map(categoryId => state.categories[categoryId]);
  categories = categories && categories.filter(item => item !== undefined);
  return {
    lists: leLists && leLists.filter(item => item !== undefined),
    categories: categories || [],
  };
}

class ServicesPane extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.any,
    garage: PropTypes.object.isRequired,
    lists: PropTypes.array,
    style: PropTypes.object,
  };

  static defaultProps = {
    className: '',
    lists: [],
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
    const { categories, classes, className, lists, style } = this.props;
    const { value } = this.state;

    return (
      <div className={classNames(classes.root, className, 'border')} style={{ ...style }}>
        <AppBar
          position="static"
          style={{ backgroundColor: "white", borderRadius: 3 }}
          elevation={0}
        >
          <Tabs
            value={value}
            onChange={this.handleChange} 
            textColor="secondary"
            style={{ borderBottom: `1px solid ${dividerColor}` }}
          >
            <Tab label="Services" />
            <Tab label="Special Offers" />
          </Tabs>
        </AppBar>
        
        {value === 0 && <TabContainer>
            <TopCategoriesList style={{ width: "100%" }} lists={lists} />
            <hr style={{ marginTop: 6 }}/>
            <ServicesList style={{ width: "100%", marginTop: 10 }} categories={categories}/>
          </TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
      </div>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ServicesPane));
