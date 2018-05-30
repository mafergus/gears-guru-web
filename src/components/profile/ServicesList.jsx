import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

const services = [
  {
    name: "Car Repair"
  },
  {
    name: "Brakes"
  },
  {
    name: "Tires"
  }
];

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
        avatar={<FaceIcon />}
        label={service.name}
        onClick={this.handleClick}
        style={{ margin: 5 }}
      />
    );
  };

  render() {
    const { style } = this.props;

    return (
      <div style={{ ...style }}>
        {services.map(item => this.renderChip(item))}
      </div>
    );
  }
}

export default withStyles(styles)(ServicesList);