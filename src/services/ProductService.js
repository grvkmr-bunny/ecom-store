export default class ProductService {

    getProducts(name) {
        var promise = new Promise((resolve, reject) => {
            const url = `http://localhost:8000/${name}`;
            let fData = {
                method: "GET",
                headers: {
                    "accept": "application/json",
                }
            };

            fetch(url, fData).then((response) => {
                response.json().then((data) => {
                    if (data)
                        resolve(data);
                    else
                        reject('No Data');
                }).catch((err) => {
                    reject("Parsing Error");
                })
            }).catch((err) => {
                reject("Communication Error");
            });
        });

        return promise;
    }

    getProductsById(name, id) {
        var promise = new Promise((resolve, reject) => {
            const url = `http://localhost:8000/${name}/${id}`;
            let fData = {
                method: "GET",
                headers: {
                    "accept": "application/json",
                }
            };

            fetch(url, fData).then((response) => {
                response.json().then((data) => {
                    // console.log('999999999999999999', data);
                    if (data)
                        resolve(data);
                    else
                        reject('No Data');
                }).catch((err) => {
                    reject("Parsing Error");
                })
            }).catch((err) => {
                reject("Communication Error");
            });
        });

        return promise;
    }

    updateIntoCart(name, pdetails) {
        var userData = JSON.parse(window.sessionStorage.getItem('user_data'));
        const url = "http://localhost:8000/userData/"+userData.id;
        var data = {};
        if(name==="games"){
            data = {
                cartItem: {
                    games: [...userData.cartItem.games, {id: pdetails.id, name: pdetails.name, description: pdetails.description, price: pdetails.price}],
                    fangear: [...userData.cartItem.fangear]
                }
            }
        }else{
            data = {
                cartItem: {
                    games: [...userData.cartItem.games],
                    fangear: [...userData.cartItem.fangear, {id: pdetails.id, name: pdetails.name, description: pdetails.description, price: pdetails.price}]
                }
            }
        }
        const request = new Request(url, {
            method: 'PATCH',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        });

        var promise = new Promise((resolve, reject) => {
            return fetch(request).then(res => {
                res.json().then((jResult) => {
                    window.sessionStorage.setItem('user_data', JSON.stringify(jResult));
                    window.sessionStorage.setItem('cart_count', JSON.stringify(jResult.cartItem.games.length+jResult.cartItem.fangear.length));
                    resolve("Product Added to Cart Successfully");
                }, (err) => {
                    reject("JSON Parse Error");
                })
            }).catch(error => {
                reject("Error connecting to the API");
            });
        });

        return promise;
    }

    deleteFromCart(name, id) {
        var userData = JSON.parse(window.sessionStorage.getItem('user_data'));
        const url = "http://localhost:8000/userData/"+userData.id;
        var data = {};
        var remData = userData.cartItem[name].filter((item) => {
            return (item.id === id) ? false : true
        })
        if(name==="games"){
            data = {
                cartItem: {
                    games: [...remData],
                    fangear: [...userData.cartItem.fangear]
                }
            }
        }else{
            data = {
                cartItem: {
                    games: [...userData.cartItem.games],
                    fangear: [...remData]
                }
            }
        }
        const request = new Request(url, {
            method: 'PATCH',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        });

        var promise = new Promise((resolve, reject) => {
            return fetch(request).then(res => {
                res.json().then((jResult) => {
                    window.sessionStorage.setItem('user_data', JSON.stringify(jResult));
                    window.sessionStorage.setItem('cart_count', JSON.stringify(jResult.cartItem.games.length+jResult.cartItem.fangear.length));
                    resolve("Product removed from cart successfully");
                }, (err) => {
                    reject("JSON Parse Error");
                })
            }).catch(error => {
                reject("Error connecting to the API");
            });
        });

        return promise;
    }

    updateUserProfile(udetails) {
        var userData = JSON.parse(window.sessionStorage.getItem('user_data'));
        const url = "http://localhost:8000/userData/"+userData.id;
        var data = {...udetails};
        
        const request = new Request(url, {
            method: 'PATCH',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        });

        var promise = new Promise((resolve, reject) => {
            return fetch(request).then(res => {
                res.json().then((jResult) => {
                    window.sessionStorage.setItem('user_data', JSON.stringify(jResult));
                    resolve("Details Updated Successfully");
                }, (err) => {
                    reject("JSON Parse Error");
                })
            }).catch(error => {
                reject("Error connecting to the API");
            });
        });

        return promise;
    }

    doPayment(data){
        // var promise = new Promise((resolve, reject) => {
            const url = "https://test.payu.in/_payment";
            let fData = {
                method: "POST",
                mode: 'CORS',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            return fetch(url, fData).then((response) => {
                return response;
                // response.json().then((data) => {
                //     console.log('***************', data);
                //     if (data)
                //         resolve(data);
                //     else
                //         reject('No Order Data Found');
                // }).catch((err) => {
                //     reject("Parsing Error");
                // })
            }).catch((err) => {
                // reject("Communication Error");
                return err;
            });
        // });

        // return promise;
    }

    getOrdersById(userId){
        var promise = new Promise((resolve, reject) => {
            const url = `http://localhost:8000/orderData/${userId}`;
            let fData = {
                method: "GET",
                headers: {
                    "accept": "application/json",
                }
            };

            fetch(url, fData).then((response) => {
                response.json().then((data) => {
                    console.log('***************', data);
                    if (data)
                        resolve(data);
                    else
                        reject('No Order Data Found');
                }).catch((err) => {
                    reject("Parsing Error");
                })
            }).catch((err) => {
                reject("Communication Error");
            });
        });

        return promise;
    }

    updateOrders(userId, odetails) {
        const url = "http://localhost:8000/orderData/"+userId;
        var data = {};
        var request = '';
        this.getOrdersById(userId).then((res) => {
            if(res === "No Order Data Found"){
                data = {
                    id: userId,
                    orders: [{...odetails}]
                }
                request = new Request(url, {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify(data)
                });
            }else{
                data = {
                    orders: [...res.orders, {...odetails}]
                }
                request = new Request(url, {
                    method: 'PATCH',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify(data)
                });
            }
            var promise = new Promise((resolve, reject) => {
                return fetch(request).then(res => {
                    res.json().then((jResult) => {
                        console.log("++++++++++++++++++", jResult);
                        // resolve("Product Added to Cart Successfully");
                    }, (err) => {
                        reject("JSON Parse Error");
                    })
                }).catch(error => {
                    reject("Error connecting to the API");
                });
            });
    
            return promise;
        }).catch(eMsg => {
            return eMsg;
        });

        
    }
}