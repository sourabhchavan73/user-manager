import React, { useState, useEffect } from 'react';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchUser, deleteUser } from '../../redux/actions/index'

import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
    modalheader: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
    }
}))

function UserDelete( props ) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    useEffect(() => {
        props.fetchUser(props.match.params.id);
      }, []);

      const rendorContent = () => {
          if(!props.users){
              return 'Are you sure want to delete this User?'
          }

          return `Are you sure want to delete this User with title: ${props.users.name}`
      }

    return ( 
        <div>
            <Dialog 
                open = {open} 
                onClose={() => history.push('/')} 
                fullWidth 
                
                maxWidth="sm">

                <MuiDialogTitle >
                    <div  className={classes.modalheader}>
                        Delete User
                        <CloseIcon onClick={() => history.push('/')}   style={{cursor: "pointer"}} />
                    </div>
                </MuiDialogTitle>

                <DialogContent>
                    {rendorContent()}
                </DialogContent >

                <DialogActions>
                    <Button onClick={() => history.push('/')}  color="primary">
                        Disagree
                    </Button>

                    <Button onClick={() => props.deleteUser(props.match.params.id)}  color="primary" autoFocus>
                        Agree
                    </Button>
                
                </DialogActions>
            </Dialog>
        </div>
    )
}

const mapStateToProps = ( state, ownProps ) => {
    return { users: state.users[ownProps.match.params.id]}
}

export default connect(
    mapStateToProps, 
    { fetchUser, deleteUser }
) ( UserDelete );
