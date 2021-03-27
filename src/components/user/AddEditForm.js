import React, { useState, useEffect }  from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import { Field, formValues, reduxForm} from 'redux-form';
import TextField from '@material-ui/core/TextField';
import { Link } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

import history from '../../history';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';


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
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        padding: "0 15px"
    },

    error: {
       color: '#f44336',
       border: '1px solid #f44336',
       marginLeft: '.5rem'
    }
}))

const userHobbies = [
    { title: 'Reading' },
    { title: 'Gaming' },
    { title: 'Traveling' },
    { title: 'Drawing' }
  ];
  
const AddEditForm = ({ handleSubmit, createUser, onSubmit, options}) => {
    const classes = useStyles();
    const [colleges, settcolleges] = useState();
    

    useEffect(() => {
        const colleges = async () => {
            const response  = await axios.get('http://universities.hipolabs.com/search?name=india');
            const data = response.data;
            settcolleges(data)
        }
        colleges();
        
    }, [])

    const defaultProps = {
        options: colleges,
        getOptionLabel: (option) => option.name,
      };
    
    const rendorError = ({error, touched}) => {
        if(touched && error) {
            return (
                <div className={classes.errorMessage}>
                    {error}
                </div>
            )
        }
    }

    const renderUserName = ({input, label, meta }) => {
        return  (
            <>
                <TextField 
                    className={classes.formGroup}  
                    label={label} 
                    { ...input } 
                    autoComplete="off" />
                    {rendorError(meta)}
            </>
        )
    }

    const renderUserDob = ({input, meta }) => {
        return (
            <>
                <TextField
                { ...input}
                    className={classes.formGroup}
                    label="Birthday"
                    type="date"
                    autoComplete="off"
                    InputLabelProps={{
                    shrink: true,
                    }}
            />
                {rendorError(meta)}
            </>
        )
    };
    
    const rendorUserCollege = ({input, meta }) => {
        return(
            <>
                <Autocomplete
                    className={classes.formGroup}
                    {...defaultProps}
                    renderInput={(params) => 
                    <TextField 
                        className={classes.formGroup}
                        { ...input } 
                        {...params} 
                        label="Colleges" />
                    }
                />
                {rendorError(meta)}
            </>
        )
    }

    const rendorUserHobbies = ({input, meta}) => {
        const { onChange } = input;
        return (
            <>
                <Autocomplete
                    multiple
                    id="tags-filled"
                    options={userHobbies.map((option) => option.title)}
                    onChange={(e, newValue) => {
                        onChange(newValue);
                    }}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }

                    renderInput={(params) => (
                        <TextField {...params}  label="Enter or Select Hobby" placeholder="Favorites" />
                    )}
                />
                {rendorError(meta)}
            </>
        )
    }

    const formHandler = (formValues) => {
        onSubmit(formValues);
    }

    return (
        <>
            <form onSubmit={handleSubmit(formHandler)}>
                <Grid container>
                    <Grid sm={6} item  className={classes.gridComponent}>
                        <Field 
                            className={classes.formGroup}
                            name="name" 
                            label="User Name"  
                            component={renderUserName}/>
                    </Grid>

                    <Grid sm={6} item  className={classes.gridComponent}>
                        <Field name="dob" component={renderUserDob}/>
                    </Grid>

                    <Grid sm={6} item className={classes.gridComponent}>
                        <Field 
                            name="address" 
                            label="User Address" 
                            component={renderUserName}/>
                    </Grid>

                    <Grid sm={6} item className={classes.gridComponent}>
                        <Field 
                            name="college" 
                            label="Select College Name" 
                            component={rendorUserCollege}/>
                    </Grid>

                    
                    <Grid sm={6} item className={classes.gridComponent}>
                        <Field 
                            name="hobbies" 
                            label="Select Hobbies" 
                            component={rendorUserHobbies}/>
                    </Grid>
                </Grid>

                <div style={{paddingLeft: "15px"}}>
                    <Button style={{width: '100px'}}   type="submit" variant="contained" color="primary" disableRipple className={classes.button}>
                        Add
                    </Button>
                </div>
            </form>
        </>
    )
}

const validate = formValues => {
    const errors = {};

    if(!formValues.name){
        errors.name = 'Please Enter a user Name'
    }

    if(!formValues.address){
        errors.address = 'Please Enter a address'
    }

    if(!formValues.dob){
        errors.dob = 'Please Select a dob'
    }

    if(!formValues.college){
        errors.college = 'Please Enter a College'
    }

    if(!formValues.hobbies){
        errors.hobbies = 'Please Enter or Select Hobby'
    }

    return errors;
    
}

export default reduxForm({
    form: 'addEditForm',
    validate: validate
})(AddEditForm);

