import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import ProductService from '../../services/ProductService';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import InputBase from '@material-ui/core/InputBase';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  table: {
    width: "800px",
    marginLeft: "150px",
    marginBottom: "20px"
  },
  margin: {
    margin: theme.spacing(1),
  }
}));

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 'auto',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
}))(InputBase);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function jsonToArrayConversion(json, removeItems){
    var allKeys = Object.keys(json);
    var allValues = Object.values(json);
    var arrayData = [];
    for (const [index, item] of allKeys.entries()) {
        if(removeItems.includes(item)){
            continue;
        }else{
            arrayData.push({[item]: allValues[index]});
        }
    }

    return arrayData
}

function BasicTable(props) {
    // console.log("=========", props);
    const classes = useStyles();
    const productService = new ProductService();

    const [values, setValues] = React.useState({
        isDisabled: true,
        isOpen: false,
        saveMsg: "",
        name: "",
        email: "",
        username: "",
        password: "",
        mobile: "",
        locality: "",
        city: "",
        state: "",
        pin: "",
    });

    var rows = jsonToArrayConversion(props.userData, ['cartItem', 'id']);  

    const handleEdit = () => setValues({ ...values, isDisabled: false });

    const handleSave = (prop) => {
        var isLoggedIn = window.sessionStorage.getItem('em_user');
        if(isLoggedIn){
            var updatedData = {};
            var removedValue = ['isDisabled', 'isOpen', 'saveMsg'];
            for(const property in values){
                if(removedValue.includes(property)){
                    continue;
                }else if(values[property]){
                    updatedData[property] = values[property];
                }
            }
            // console.log("=========", updatedData);
            productService.updateUserProfile(updatedData).then(msg => {
                setValues({ 
                    name: "",
                    email: "",
                    username: "",
                    password: "",
                    mobile: "",
                    locality: "",
                    city: "",
                    state: "",
                    pin: "",
                    saveMsg: msg,
                    isOpen: true,
                    isDisabled: true
                });
            });
        }else{
            this.props.history.push('/login', {from: props.location.pathname});
        }
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClose = () => setValues({...values, isOpen: false});
    
    return (
        <>
            <TableContainer className={classes.table} component={Paper}>
                <Table aria-label="simple table">
                <TableBody>
                    {rows.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell style={{width: "300px", padding: "0px 16px"}}>{Object.keys(row)[0].toUpperCase()}</TableCell>
                        <TableCell style={{padding: "0px 16px"}}>
                            <FormControl className={classes.margin}>
                                <BootstrapInput defaultValue={Object.values(row)[0]} id={Object.keys(row)[0]} disabled={values.isDisabled} onChange={handleChange(Object.keys(row)[0])} />
                            </FormControl>
                        </TableCell>
                        {/* <TableCell ><TextField id={index} variant="outlined" value={Object.values(row)[0]} onChange={handleChange}/></TableCell> */}
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <center>
                <Button variant="contained" color="primary" style={{marginRight: '20px', backgroundColor: 'orange'}} onClick={handleEdit}>
                    Edit
                </Button>
                <Button variant="contained" color="primary" style={{marginLeft: '20px'}} onClick={handleSave} disabled={values.isDisabled}>
                    Save
                </Button>
            </center>
            <Snackbar open={values.isOpen} autoHideDuration={3000} onClose={handleClose}>
                {
                    (values.saveMsg === "Details Updated Successfully") ? 
                        <Alert severity="success">{values.saveMsg}</Alert>
                        : <Alert severity="error">{values.saveMsg}</Alert>
                }
            </Snackbar>
        </>
    );
}

class ProfileComponent extends Component {
    render() {
        return (
            <div style={{marginTop: "100px"}}>
                <h4 className="text-info text-center">My Profile</h4>
                <br />
                <BasicTable userData={this.props.userData} {...this.props} />
            </div>
        );
    }
}

export default ProfileComponent;