import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import classNames from 'classnames';

import FeedContainer from 'components/feed/FeedContainer';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

function mapStateToProps(state, props) {
  return {

  };
}

class ReviewsPane extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.any,
    garageID: PropTypes.string.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    className: '',
    style: {},
  };
  
  render() {
    const { classes, className, style } = this.props;
    return (
      <div className={classNames(classes.root, className, 'border')} style={{ ...style }}>
        <h3 style={{ fontWeight: 400, margin: 20 }}>Reviews</h3>
        <hr />
        <FeedContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ReviewsPane));