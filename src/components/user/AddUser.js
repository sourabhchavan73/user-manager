import React, { useState }  from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles'; 
import { connect } from 'react-redux'
import { createUser } from '../../redux/actions/index'
import AddEditForm from './AddEditForm'



const useStyles = makeStyles(theme => ({
    button:{
        ...theme.typography.button
    },

    formGroup: {
        width: "100%",
        marginBottom: "10px"
    },

    gridComponent: {
        paddingLeft: "15px", 
        paddingRight: "15px", 
        marginBottom: "2rem"
    },

    errorMessage: {
        color: "red"
    },

    modalheader: {
        ...theme.typography.modalHeader
    }
}))


const AddUser = ({ handleSubmit, createUser}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    
    const formHandler = (formValues) => {
        createUser(formValues);
        setOpen(false);
        console.log(formValues)
    }

    const onClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Button onClick={() => setOpen(true)} variant="contained" color="secondary" disableRipple className={classes.button}>
                + Add User
            </Button>

            <Dialog 
                open = {open} 
                onClose={() => setOpen(false)} 
                fullWidth 
                maxWidth="md">

                <MuiDialogTitle >
                    <div className={classes.modalheader}>
                        Add User
                        <CloseIcon onClick={() => setOpen(false)}  style={{cursor: "pointer"}} />
                    </div>
                </MuiDialogTitle>

                <DialogContent>
                    <AddEditForm onSubmit={formHandler} onClose= {onClose} />
                </DialogContent >
            </Dialog>
        </>
    )
}

export default connect(null, { createUser })(AddUser);