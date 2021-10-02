import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';

import React, { useState, useEffect } from 'react';
import ProductService from '../../services/ProductService';
import './FanGearComponent.css';
import CardView from '../common/CardView';

const FanGearComponent = (props) => {
    const [products, setProducts] = useState(null);
    
    const productService = new ProductService();

    useEffect(() => {
        productService.getProducts('fangear').then(data => {
            setProducts(data)});
    }, []);
    console.log("====Inside FanGearComponent=====");
    return (
        <CardView name={'fangear'} products={products} {...props}/>
    );
}

export default FanGearComponent;
