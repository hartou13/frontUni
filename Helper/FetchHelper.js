
class FetchHelper {

    static loading = false;
    
    static getData = async (url) => {


        console.log("------token-------------" + localStorage.getItem("token"));
        console.log(url);
        FetchHelper.loading = true;
        const response = await fetch(url,
            {
                crossDomain: true,
                method: 'GET',
                headers: { "token": localStorage.getItem("token") }
            })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // console.log(data);
        FetchHelper.loading = false;
        return data;
    }


    static getDataPost = async (url, info) => {
        console.log("------token-------------" + localStorage.getItem("token"));
        // main.js

        // POST request using fetch()
        const response = await fetch(url, {

            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify(info),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "token": localStorage.getItem("token")
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    static getDataDelete = async (url, info) => {
        console.log("------token-------------" + localStorage.getItem("token"));
        // main.js

        // POST request using fetch()
        const response = await fetch(url, {

            // Adding method type
            method: "DELETE",

            // Adding body or contents to send
            body: JSON.stringify(info),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "token": localStorage.getItem("token")
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    static getDataPut = async (url, info) => {
        console.log(url);
        // main.js

        // POST request using fetch()
        const response = await fetch(url, {

            // Adding method type
            method: "PUT",

            // Adding body or contents to send
            body: JSON.stringify(info),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "token": localStorage.getItem("token")
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
}

export default FetchHelper;