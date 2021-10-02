var jwt = require('jsonwebtoken');
const url = "http://localhost:8000/userData";

const authenticator = {
    isAuthenticated: false,
    msg: '',

    register: function (usrData) {
        var promise = new Promise((resolve, reject) => {
            let fData = {
                method: "POST",
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify(usrData)
            };

            fetch(url, fData).then((response) => {
                response.json().then((data) => {
                    this.msg = "Registered Successfully";
                    resolve();
                }).catch((err) => {
                    reject("Something Went Wrong");
                })
            }).catch((err) => {
                reject("Communication Error");
            });
        });

        return promise;
    },

    login: function (uname, pwd) {
        var promise = new Promise((resolve, reject) => {
            var data = `username=${uname}&password=${pwd}`;
            const loginUrl = `http://localhost:8000/userData?${data}`;
            let fData = {
                method: "GET",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
            };

            fetch(loginUrl, fData).then((response) => {
                response.json().then((data) => {
                    console.log('555555555555', data);
                    if (data.length > 0) {
                        var token = jwt.sign({username: data.username, password: data.password}, "123456", {
                            expiresIn: 1440
                        });
                        window.sessionStorage.setItem('em_user', token);
                        window.sessionStorage.setItem('user_data', JSON.stringify(data[0]));
                        window.sessionStorage.setItem('cart_count', JSON.stringify(data[0].cartItem.games.length+data[0].cartItem.fangear.length));
                        this.isAuthenticated = response.ok;
                        resolve(data);
                    }
                    else{
                        this.msg = "Authentication failed, User not Found";
                        reject(this.msg);
                    }
                }).catch((err) => {
                    reject("Parsing Error");
                })
            }).catch((err) => {
                reject("Communication Error");
            });
        });

        return promise;
    },

    logout: function () {
        this.isAuthenticated = false;
        window.sessionStorage.removeItem('em_user');
        window.sessionStorage.removeItem('user_data');
        window.sessionStorage.removeItem('cart_count');
        this.msg = "Successfully Logged Out";
    },

    getToken: function () {
        return window.sessionStorage.getItem('em_user');
    }
};

export default authenticator;