import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../redux/actions/index'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from "react-router-dom";
import AddUser from '../user/AddUser';
import UserDelete from '../user/UserDelete'
  
const useStyles = makeStyles(theme => ({
    card:{
        borderRadius: '10px',
        boxShadow: '0 4px 20px 1px rgb(0 0 0 / 6%), 0 1px 4px rgb(0 0 0 / 8%)',
        border: 0,
    },

    editIcon: {
        color: '#435d7d',
        cursor: 'pointer'
    },

    deleteIcon: {
        color: '#F44336',
        cursor: 'pointer'
    },

    noList: {
        fontSize: '16px',
        color: '#435d7d'
    }
}))

const  UserList = ({ fetchUsers, users }) =>  {
    const classes = useStyles();

    useEffect  (() => {
        fetchUsers();
    },[])

   

    const rendorUserList = () => {
        return (
            <TableContainer>
                <Table className={classes.userListTable}  aria-label="User table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Date Of Birth</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="left">College</TableCell>
                            <TableCell align="left">Hobbies</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    {users.reverse().map(user => (
                        <TableRow className={classes.tableStrip} key={user.id}>
                            <TableCell align="left">{user.name}</TableCell>
                            <TableCell align="left">{user.dob}</TableCell>
                            <TableCell align="left">{user.address}</TableCell>
                            <TableCell align="left">{user.college}</TableCell>
                            <TableCell align="left">{user.hobbies.join(', ')}</TableCell>
                            <TableCell align="center" style={{display: 'flex', justifyContent: 'center'}}>
                                <Link to={`/users/edit/${user.id}`}><EditIcon className={classes.editIcon}  /> </Link>
                                <Link to={`/users/delete/${user.id}`}><DeleteIcon className={classes.deleteIcon}  /></Link>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> 
        )
    }

    const norecordUI = () =>{
        return (
            <div className={classes.noList}>
                "no user records found"
            </div>
        )
    }

    return (
        <Container maxWidth="lg" >
            <div className={classes.card} style={{margin:'3.5rem 0'}}>
                <div className="card-body">
                    <div style={{marginBottom: "2rem"}}>
                        <AddUser />
                    </div>

                    {users.length > 0 ? rendorUserList() : norecordUI() }
                </div>
            </div>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return { users: Object.values(state.users)}
}

export default connect( mapStateToProps, { fetchUsers }) ( UserList );
