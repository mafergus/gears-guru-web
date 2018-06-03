import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Avatar from '@material-ui/core/Avatar';

import { textDark } from 'util/colors';

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
  
  constructor() {
    super();
  }

  handleClick = () => {

  };

  renderChip = service => {
    const { classes } = this.props;
    return (
      <Chip
        avatar={<Avatar src={service.icon} style={{ backgroundColor: textDark.secondary }}/>}
        label={service.name}
        onClick={this.handleClick}
        style={{ margin: 5 }}
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