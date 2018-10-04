import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import RegisterGarageForm from 'components/forms/RegisterGarageForm';

export default class RegisterGarageModal extends React.Component {

  onSubmit = () => {

  }
  
  render() {
    const { handleClose, isOpen } = this.props;
    return (
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Register Business</DialogTitle>
        <DialogContent>
          <RegisterGarageForm
            style={{ width: 500 }}
            onCancel={handleClose}
          />
        </DialogContent>
      </Dialog>
    );
  }
}

RegisterGarageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
