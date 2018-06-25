import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import { secondary } from 'util/colors';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

class ServicesList extends React.Component {

  static propTypes = {
    categories: PropTypes.array.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };
  
  handleClick = () => {

  };

  renderChip = service => {
    const { classes } = this.props;
    return (
      <Chip
        avatar={<Avatar src={service.icon} style={{ margin: 10, backgroundColor: "transparent" }}/>}
        label={service.name}
        onClick={this.handleClick}
        style={{ margin: 5, backgroundColor: secondary[500] }}
        className={classes}
      />
    );
  };

  render() {
    const { categories, style } = this.props;

    return (
      <div style={{ ...style }}>
        {categories.map(item => this.renderChip(item))}
      </div>
    );
  }
}

export default withStyles(styles)(ServicesList);