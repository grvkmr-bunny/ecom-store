import React, { Component } from 'react';
import ProductService from '../../services/ProductService';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DataTable from '../common/DataTable';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import FormControl from '@material-ui/core/FormControl';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Form } from 'react-bootstrap';
import newId from '../common/GenerateId';

var sha512 = require('js-sha512');

const FormControls = withStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    }
}))(FormControl);

function getSteps() {
    return ['Products Added', 'Delivery Address', 'Payment'];
}

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
let count = 12345;
class BasicTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisabled: true,
            amountValue: this.props.amountValue,
            hashValue: sha512('The quick brown fox jumps over the lazy dog')
        }
        this.hashText = '';
        this.productService = new ProductService();
        this.handleChange = this.handleChange.bind(this);
        this.handlePay = this.handlePay.bind(this);
    }
    
    static getDerivedStateFromProps(nextProps, prevState){
        // console.log("=========INSIDE=====BASIC======", nextProps, "=========BASIC======", prevState);
        if(nextProps.amountValue!==prevState.amountValue){
            return { amountValue: nextProps.amountValue};
        }
        else return null;
    }
    
    handleChange(event) {

    }
    
    handlePay(data){
        this.productService.doPayment(data);
        // this.productService.updateOrders(this.props.userData.id, {txnid: this.count, amount: this.state.amountValue, products: this.props.userData}).then((data) => {
        //     return false;
        //     // this.setState({ redirectToReferrer: authenticator.isAuthenticated, loggedInUser: data });
        // }).catch(eMsg => {
        //     return false
        //     // this.setState({ message: eMsg });
        // });
        // return false;
    }

    render(){
        count = newId();
        this.hashText = `G9seVA|${count}|${this.state.amountValue}|sss|${this.props.userData.name}|${this.props.userData.email}|||||||||||wOcxHuw1`;
        this.hashText = sha512(this.hashText);
        return (
            <>
                <Form onSubmit={this.handlePay}>
                    <TableContainer style={{width: "800px", marginLeft: "50px", marginBottom: "20px"}} component={Paper}>
                        <Table aria-label="simple table">
                        <TableBody>
                            <TableRow key="1">
                                <TableCell style={{width: "300px", padding: "0px 16px"}}>Name</TableCell>
                                <TableCell style={{padding: "0px 16px"}}>
                                    <FormControl style={{margin: "1px"}}>
                                        <BootstrapInput name="firstname" defaultValue={this.props.userData.name} id="1" onChange={this.handleChange()} />
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                            <TableRow key="2">
                                <TableCell style={{width: "300px", padding: "0px 16px"}}>Email</TableCell>
                                <TableCell style={{padding: "0px 16px"}}>
                                    <FormControl style={{margin: "1px"}}>
                                        <BootstrapInput name="email" defaultValue={this.props.userData.email} id="2" onChange={this.handleChange()} />
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                            <TableRow key="3">
                                <TableCell style={{width: "300px", padding: "0px 16px"}}>Mobile</TableCell>
                                <TableCell style={{padding: "0px 16px"}}>
                                    <FormControl style={{margin: "1px"}}>
                                        <BootstrapInput name="phone" defaultValue={this.props.userData.mobile} id="3" onChange={this.handleChange()} />
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                            <TableRow key="4">
                                <TableCell style={{width: "300px", padding: "0px 16px"}}>Amount</TableCell>
                                <TableCell style={{padding: "0px 16px"}}>
                                    <FormControl style={{margin: "3px"}}>
                                        <BootstrapInput name="amount" value={this.state.amountValue} id="4" readOnly/>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <BootstrapInput hidden name="surl" defaultValue="http://localhost:3000/thankyou" id="5" />
                    <BootstrapInput hidden name="furl" defaultValue="http://localhost:3000/thankyou" id="6" />
                    <BootstrapInput hidden name="key" defaultValue="G9seVA" id="7" />
                    <BootstrapInput hidden name="hash" value={this.hashText} id="8" />
                    <BootstrapInput hidden name="txnid" value={count} id="9" />
                    <BootstrapInput hidden name="productinfo" defaultValue="sss" id="10" />
                    <BootstrapInput hidden name="lastname" defaultValue="" id="11" />
                    <center>
                        <Button variant="contained" type="submit" color="primary" style={{marginBottom: "10px"}} disabled={(this.state.amountValue) ? false : true} >
                            PAY
                        </Button>
                    </center>
                </Form>
            </>
        );
    }
}
  
class Steppers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0
        }
        this.steps = getSteps();
        this.handleStepNo = this.handleStepNo.bind(this);
    }
    
    componentDidMount(){
        const haveCartValue = (this.props.cartDetails.cartItem.fangear.length || this.props.cartDetails.cartItem.games.length) ? true : false;
        const haveAddress = (this.props.cartDetails.city && this.props.cartDetails.pin && this.props.cartDetails.state) ? true : false;
        if(haveAddress && haveCartValue){
            this.setState({activeStep: 2});
        }else if(haveCartValue && !haveAddress){
            this.setState({activeStep: 1});
        }else{
            this.setState({activeStep: 0});
        }
    }

    handleStepNo(){
        return (this.props.activeStep === -1) ? this.state.activeStep : this.props.activeStep
    }

    render(){
        var stepValue = this.handleStepNo();
        return (
            <Stepper alternativeLabel activeStep={stepValue}>
            {this.steps.map((label) => (
                <Step key={label}>
                <StepLabel>{label}</StepLabel>
                </Step>
            ))}
            </Stepper>
        );
    }
}

class CartDetails extends Component {
    constructor(props) {
        super(props);
        this.totalAmount = 0;
        [...this.props.cartDetails.cartItem.fangear, ...this.props.cartDetails.cartItem.games].forEach(element => {
            this.totalAmount += element.price;
        });
        this.state = {
            cartValue: [...this.props.cartDetails.cartItem.fangear, ...this.props.cartDetails.cartItem.games],
            amountValue: this.totalAmount,
            delMsg: '',
            isOpen: false,
        }
        this.productService = new ProductService();
        this.removeProduct = this.removeProduct.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(){ 
        this.setState({isOpen: false});
    }

    removeProduct(id, e){
        var usrDt = JSON.parse(window.sessionStorage.getItem('user_data'));
        var pname = (e.target.id <= usrDt.cartItem.fangear.length) ? 'fangear' : 'games';
        this.productService.deleteFromCart(pname, id).then(msg => {
            if(msg === "Product removed from cart successfully"){
                this.props.getCartVal();
                this.props.handleStepChange();
                usrDt = JSON.parse(window.sessionStorage.getItem('user_data'));
                var totalCartAmount = 0;
                [...usrDt.cartItem.fangear, ...usrDt.cartItem.games].forEach(element => {
                    totalCartAmount += element.price;
                });
                this.setState({
                    cartValue: [...usrDt.cartItem.fangear, ...usrDt.cartItem.games],
                    amountValue: totalCartAmount,
                    delMsg: msg,
                    isOpen: true
                });
            }else{
                this.setState({
                    delMsg: msg,
                    isOpen: true
                });
            }
        });
    }

    componentDidMount(){
        var usrD = JSON.parse(window.sessionStorage.getItem('user_data'));
        var totalAmount = 0;
        [...usrD.cartItem.fangear, ...usrD.cartItem.games].forEach(element => {
            totalAmount += element.price;
        });
        this.setState({cartValue: [...usrD.cartItem.fangear, ...usrD.cartItem.games], amountValue: totalAmount});
    }

    render(){
        // console.log("888888888888", this.props);
        return (
            <div style={{width: "80%",marginLeft: "10%"}}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography><b>Product Details</b></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <DataTable items={this.state.cartValue} onDelete={this.removeProduct} />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography><b>Address Details</b></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {this.props.cartDetails.name}, Mob: {this.props.cartDetails.mobile}
                        </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                        <Typography>
                            {this.props.cartDetails.locality}, {this.props.cartDetails.city}, {this.props.cartDetails.state} ({this.props.cartDetails.pin})
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography><b>Payment Method</b></Typography>
                    </AccordionSummary>
                    <BasicTable userData={this.props.userData} amountValue={this.state.amountValue} />
                </Accordion>
                <Snackbar open={this.state.isOpen} autoHideDuration={3000} onClose={this.handleClose}>
                    {
                        (this.state.delMsg === "Product removed from cart successfully") ? 
                            <Alert severity="success">{this.state.delMsg}</Alert>
                            : <Alert severity="error">{this.state.delMsg}</Alert>
                    }
                </Snackbar>
            </div>
        )
    }
}

class CartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepNo: -1
        }
        this.handleStepChange = this.handleStepChange.bind(this);
    }

    handleStepChange(){
        this.setState({ stepNo: (window.sessionStorage.getItem('cart_count') !== "0") ? 2 : 0});
    }
    
    render() {
        return (
            <div style={{marginTop: "100px"}}>
                <Steppers cartDetails={this.props.userData} activeStep={this.state.stepNo} />
                <CartDetails cartDetails={this.props.userData} {...this.props} handleStepChange={this.handleStepChange} />
            </div>
        );
    }
}

export default CartComponent;