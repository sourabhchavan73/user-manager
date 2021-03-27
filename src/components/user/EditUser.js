import React, { useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchUser, editUser} from '../../redux/actions/index'
import AddEditForm from './AddEditForm';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles'; 
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles(theme => ({
    card:{
        borderRadius: '10px',
        boxShadow: '0 4px 20px 1px rgb(0 0 0 / 6%), 0 1px 4px rgb(0 0 0 / 8%)',
        border: 0,
    },

    deleteIcon: {
        color: '#F44336',
        cursor: 'pointer'
    },

    editIcon: {
        color: '#435d7d',
        cursor: 'pointer'
    },

    title:{
        color: '#435d7d',
        fontSize: '16px',
        fontWeight: 400,
        fontSize: '1.5rem',
    }

}))


const EditUser = ({ fetchUser, match, users, editUser }) => {
    const classes = useStyles();

    useEffect(() => {
        fetchUser(match.params.id);
        
      }, []);

    const formHandler = ( formValues ) => {
        editUser(match.params.id, formValues);
        
    }

    return (
        <Container maxWidth="lg" style={{marginTop:'3.5rem'}}>
            <div className={classes.card}>
                <div className="card-body">
                        <Typography style={{padding: '0 15px', marginBottom: '1.5rem'}} variant="h4" className={classes.title}>
                            Edit User: {users.name}
                        </Typography>
                    
                    <AddEditForm 
                        // using lodash to take only req values 
                        initialValues={ _.pick(users, 'name', 'dob', 'address', 'college', 'hobbies')}
                        onSubmit={formHandler} />
                </div>
            </div>
        </Container>
    )
}

const mapStateToProps = ( state, ownProps) => {
    return  {users: state.users[ownProps.match.params.id]}
}

export default connect(
    mapStateToProps, 
    { fetchUser, editUser }
) (EditUser);
