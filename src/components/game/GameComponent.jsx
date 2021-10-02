import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React, { useState, useEffect } from 'react';
import ProductService from '../../services/ProductService';
import './GameComponent.css';
import CardView from '../common/CardView';

const GameComponent = (props) => {
    const [products, setProducts] = useState(null);
    
    const productService = new ProductService();

    useEffect(() => {
        productService.getProducts('games').then(data => {
            setProducts(data)});
    }, []);
    console.log("====Inside GameComponent=====");
    return (
        <CardView name={'games'} products={products} {...props}/>
    );
}

export default GameComponent;
