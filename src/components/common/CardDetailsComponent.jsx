import React, { Component } from 'react';
import ProductService from '../../services/ProductService';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { Rating } from 'primereact/rating';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({

    mainGrid: {
        marginTop: theme.spacing(3),
    },
    markdown: {
        ...theme.typography.body2,
        padding: theme.spacing(3, 0),
    },
    comments: {
        marginTop: '10px',
    },
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class CardDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetails: {},
            imageUrl: '',
            isAdded: false,
            addMsg: '',
            isOpen: false
        }
        this.productService = new ProductService();
        this.classes = useStyles;
        this.addToCart = this.addToCart.bind(this);
        this.buyNow = this.buyNow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    addToCart(){
        var isLoggedIn = window.sessionStorage.getItem('em_user');
        if(isLoggedIn){
            this.productService.updateIntoCart(this.props.name, this.state.dataDetails).then(msg => {
                this.props.getCartVal();
                this.setState({isAdded: true, addMsg: msg, isOpen: true});
            });
        }else{
            this.props.history.push('/login', {from: this.props.location.pathname});
        }
    }

    buyNow(){
        var isLoggedIn = window.sessionStorage.getItem('em_user');
        if(isLoggedIn){
            if(this.state.isAdded){
                this.props.history.push('/cart', {from: this.props.location.pathname});
            }else{
                this.productService.updateIntoCart(this.props.name, this.state.dataDetails).then(msg => {
                    this.props.getCartVal();
                    this.setState({isAdded: true}, () => this.props.history.push('/cart', {from: this.props.location.pathname}));
                });
            }
        }else{
            this.props.history.push('/login', {from: this.props.location.pathname});
        }
    }

    handleClose(){ 
        this.setState({isOpen: false});
    };

    componentDidMount(){
        this.productService.getProductsById(this.props.name,this.props.match.params.id).then(data => {
            this.setState({dataDetails: data, imageUrl: require(`../../assets/${this.props.name}/${data.image}`).default}, () => {
                var cartItem = (JSON.parse(window.sessionStorage.getItem('user_data'))) ? JSON.parse(window.sessionStorage.getItem('user_data')).cartItem : '';
                var itemFound = cartItem ? cartItem[this.props.name].findIndex((data) => data.id === this.props.match.params.id) : -1;
                if(itemFound > -1){
                    this.setState({isAdded: true});
                }
            });
        });
    }

    render() {
        const { dataDetails } = this.state;
        return (
            <div className="card" style={{display: 'inline-block'}}>
                <img src={this.state.imageUrl} alt={this.state.dataDetails.name} style={{width: '400px', height: '400px', padding: '16px', marginLeft: '75px'}} />

                <div style={{width: '500px', float: 'right', marginLeft: '130px'}}>
                    <CardContent >
                        <Typography component="h2" variant="h5" style={{padding: "5px"}}>
                            {dataDetails.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" style={{padding: "5px"}}>
                            <Rating value={dataDetails.rating} readOnly cancel={false}></Rating>
                        </Typography>
                        <Typography variant="subtitle1" paragraph style={{padding: "5px"}}>
                            {dataDetails.description ? dataDetails.description.substring(0,50)+'...' : ''}
                        </Typography>
                        <Typography variant="subtitle1" paragraph style={{padding: "5px"}}>
                            <b>Price: {dataDetails.price} INR</b>
                        </Typography>
                    </CardContent>
            
                    <CardContent >
                        <Button variant="contained" color="primary" style={{marginRight: '20px', backgroundColor: 'orange'}} onClick={this.addToCart} disabled={this.state.isAdded}>
                            <i className="pi pi-shopping-cart layout-menuitem-icon" style={{ fontSize: '1.5rem' }}></i>
                            <span style={{marginLeft: '10px'}}>Add To Cart</span>
                        </Button>
                        <Button variant="contained" color="primary" style={{marginLeft: '20px', backgroundColor: 'green'}} onClick={this.buyNow}>
                            Buy Now
                        </Button>
                    </CardContent>
                </div>

                <CustomizedAccordions desc={dataDetails.description} review={dataDetails.review} />

                <Snackbar open={this.state.isOpen} autoHideDuration={3000} onClose={this.handleClose}>
                    {
                        (this.state.addMsg === "Product Added to Cart Successfully") ? 
                            <Alert severity="success">{this.state.addMsg}</Alert>
                            : <Alert severity="error">{this.state.addMsg}</Alert>
                    }
                </Snackbar>
            </div>
        );
    }
}
CardDetailsComponent.propTypes = {
  post: PropTypes.object,
};

export default CardDetailsComponent;

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const CustomizedAccordions = (props) => {
    const [expanded, setExpanded] = React.useState('panel1');
    const {desc, review} = props;
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div style={{marginTop: '20px'}}>
            <Accordion square defaultExpanded={true} onChange={handleChange('panel1')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography><b>Product Description</b></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {desc}
                        </Typography>
                    </AccordionDetails>
            </Accordion>

            <Accordion square defaultExpanded={true} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography><b>Comments</b></Typography>
                </AccordionSummary>
                {
                    (review) ?
                    review.map((data, index)=>{
                        return (
                            <AccordionDetails key={index}>
                                <Typography style={{display: 'flex'}}>
                                    <Avatar>{data.reviewerName[0]+data.reviewerName[data.reviewerName.length-1].toUpperCase()}</Avatar>
                                    <OutlinedInput
                                        id={data.reviewerName}
                                        value={data.comments}
                                        aria-describedby="outlined-weight-helper-text"
                                        labelWidth={0}
                                        style={{width: '1000px'}}
                                    />
                                </Typography>
                            </AccordionDetails>
                        )
                    }) : ''
                }
            </Accordion>
        </div>
    );
}