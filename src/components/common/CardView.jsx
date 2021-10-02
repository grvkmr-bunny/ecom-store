import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';

const CardView = (props) => {

    const renderGridItem = (data) => {
        var gamesImage = require(`../../assets/${props.name}/${data.image}`).default;
        return (
            <div className="p-col-12 p-md-4">
                <div className="product-grid-item card">
                    <div className="product-grid-item-content">
                        <img src={gamesImage} alt={data.name} width="300px" height="100px"/>
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.description.substring(0,30)}...</div>
                        <Rating value={data.rating} readOnly cancel={false}></Rating>
                        <br/>
                        <Link to={(props.name === "games") ? `/${data.id}` : `${props.match.url}/${data.id}`} className={"text-decoration-none"} ><Button label="View Details"></Button></Link>
                        
                    </div>
                </div>
            </div>
        );
    }

    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }
        return renderGridItem(product);
    }

    return (
        <div className="dataview-demo" style={{marginTop: '100px'}}>
            <div className="card">
                <DataView value={props.products} itemTemplate={itemTemplate} />
            </div>
        </div>
    );
}

export default CardView;
