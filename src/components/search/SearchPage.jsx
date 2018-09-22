import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

import GPlacesList from 'components/garage-list/GPlacesList';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SearchPage extends React.Component {

  renderModal = () => {
    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        open={true}
      >
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <div>
        </div>
      </Dialog>
    );
  }

  render() {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ height: "100%", width: "67%", display: "flex" }}>
          <div style={{ width: "33%", backgroundColor: "blue" }}>
          </div>
          <GPlacesList style={{ width: "67%" }}/>
        </div>
        {this.renderModal()}
      </div>
    );
  }
}

export default withStyles(styles)(SearchPage);
