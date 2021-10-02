import React from 'react';
import PropTypes from 'prop-types';

const Ths = ({ item }) => {
    var allHeads = Object.keys(item).concat([""]);

    var ths = allHeads.map((item, index) => {
        if(index === 0){
            return <th key={index}>NO.</th>;
        }
        if(item === "name"){
            return <th style={{wordBreak: "break-all", width: "200px"}} key={index}>{item.toUpperCase()}</th>;
        }else if(item === "description"){
            return <th style={{wordBreak: "break-all", width: "400px"}} key={index}>{item.toUpperCase()}</th>;
        }else{
            return <th style={{wordBreak: "break-all", width: "100px"}} key={index}>{item.toUpperCase()}</th>;
        }
        // return <th key={index}>{item.toUpperCase()}</th>;
    });

    return (
        <tr>
            {ths}
        </tr>
    );
};

const Tds = ({ item, onDelete, count }) => {
    var allValues = Object.values(item).concat([
        <a href="/#" className="text-danger" id={count} onClick={
            (e) => {
                e.preventDefault();
                if (onDelete) {
                    if (window.confirm('Are you sure, you want to delete the record?')) {
                        onDelete(item.id, e);
                    }
                }
            }
        }>Delete</a>]);

    var tds = allValues.map((item, index) => {
        if(index === 1){
            return <td style={{wordBreak: "break-all", width: "200px"}} key={index}>{item}</td>;
        }else if(index === 2){
            return <td style={{wordBreak: "break-all", width: "400px"}} key={index}>{item}</td>;
        }else if(index === 3 || index === 4){
            return <td style={{wordBreak: "break-all", width: "100px"}} key={index}>{item}</td>;
        }else{
            return <td key={index}>{count}</td>;
        }
        // return <td key={index}>{item}</td>;
    });

    return (
        <tr>
            {tds}
        </tr>
    );
};

const DataTable = ({ items, children, onDelete }) => {
    if (items && items.length) {
        var [item] = items;
        var ths = <Ths item={item} />;
        var tds = items.map((item, index) => {
            return <Tds key={index} item={item} onDelete={onDelete} count={index+1} />
        })
    }
    return (
        <div className="mt-2">
            {children ? children : null}
            <table className="table table-hover">
                <thead>
                    {ths}
                </thead>
                <tbody>
                    {tds}
                </tbody>
            </table>
        </div>
    );
};

DataTable.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DataTable;