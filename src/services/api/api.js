import axios from 'axios';
import { getBearerAccessToken } from '../auth/Auth';



//Mettre en place la structure d'appel api avec axios ainsi que la gestion des erreurs
axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then(res => {
        const persons = res.data;
        this.setState({
            persons
        });
    })


const token = getBearerAccessToken();

const POST = axios.post(url, data)
fetch(url, {
    "method": "POST",
    "headers": {
        "content-type": "application/json",
        "accept": "application/json"
    },
    "body": JSON.stringify(data)
}).then((response) => {
    if (response.ok) {
        return response.json();
    }
    if (response.status === 401) {
        //return JSON.stringify("You must log in")
    } else {
        console.log(response);
        console.log('Erreur: Impossible d\'accéder au serveur!');
        //return JSON.stringify("Error: Enabled to accessthe server")
    }

}).catch(err => {
    console.log(err)
});



const GET = axios.get(url)
fetch(url, {
    "method": "GET",
    "headers": {
        "content-type": "application/json",
        "accept": "application/json"
    }
}).then((response) => {
    if (response.ok) {
        return response.json();
    }
    if (response.status === 401) {
        //return JSON.stringify("You must log in")
    } else {
        console.log(response);
        console.log('Erreur: Impossible d\'accéder au serveur!');
        //return JSON.stringify("Error: Enabled to accessthe server")
    }

}).catch(err => {
    console.log(err)
});



const PUT = axios.put(url,data)
fetch(url, {
    "method": "PUT",
    "headers": {
        "content-type": "application/json",
        "accept": "application/json"
    },
    "body": JSON.stringify(data)
}).then((response) => {
    if (response.ok) {
        return response.json();
    }
    if (response.status === 401) {
        //return JSON.stringify("You must log in")
    } else {
        console.log(response);
        console.log('Erreur: Impossible d\'accéder au serveur!');
        //return JSON.stringify("Error: Enabled to accessthe server")
    }

}).catch(err => {
    console.log(err)
});



const PATCH = axios.patch(url,data)
fetch(url, {
    "method": "PATCH",
    "headers": {
        "content-type": "application/json",
        "accept": "application/json"
    },
    "body": JSON.stringify(data)
}).then((response) => {
    if (response.ok) {
        return response.json();
    }
    if (response.status === 401) {
        //return JSON.stringify("You must log in")
    } else {
        console.log(response);
        console.log('Erreur: Impossible d\'accéder au serveur!');
        //return JSON.stringify("Error: Enabled to accessthe server")
    }

}).catch(err => {
    console.log(err)
});


const DELETE = axios.delete(url)
fetch(url, {
    "method": "DELETE",
    "headers": {
        "content-type": "application/json",
        "accept": "application/json"
    }
}).then((response) => {
    if (response.ok) {
        return response.json();
    }
    if (response.status === 401) {
        //return JSON.stringify("You must log in")
    } else {
        console.log(response);
        console.log('Erreur: Impossible d\'accéder au serveur!');
        //return JSON.stringify("Error: Enabled to accessthe server")
    }

}).catch(err => {
    console.log(err)
});



// const downloadFile = axios.post(url)
//     fetch(url, {
//         "method": "POST",
//         "headers": {
//             "content-type": "application/json"
//         },
//         "body": JSON.stringify(data)
//     }).then((response) => {
//         if (response.ok) {
//             return response.json();
//         }
//         if (response.status === 401) {
//             //return JSON.stringify("You must log in")
//         } else {
//             console.log(response);
//             console.log('Erreur: Impossible d\'accéder au serveur!');
//             //return JSON.stringify("Error: Enabled to accessthe server")
//         }

//     }).catch(err => {
//         console.log(err)
//     });


const sPOST = axios.post(url)
fetch(url, {
    "method": "POST",
    "headers": {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": "Bearer " + token
    }
}).then((response) => {
    if (response.ok) {
        return response.json();
    }
    if (response.status === 401) {
        //return JSON.stringify("You must log in")
    } else {
        console.log(response);
        console.log('Erreur: Impossible d\'accéder au serveur!');
        //return JSON.stringify("Error: Enabled to accessthe server")
    }

}).catch(err => {
    console.log(err)
});


const sPUT = axios.put(url,data)
fetch(url, {
    "method": "PUT",
    "headers": {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": "Bearer " + token
    },
    "body": JSON.stringify(data)
}).then((response) => {
    if (response.ok) {
        return response.json();
    }
    if (response.status === 401) {
        //return JSON.stringify("You must log in")
    } else {
        console.log(response);
        console.log('Erreur: Impossible d\'accéder au serveur!');
        //return JSON.stringify("Error: Enabled to accessthe server")
    }
}).catch(err => {
    console.log(err)
});


const sGET = axios.get(url)
fetch(url, {
    "method": "GET",
    "headers": {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": "Bearer " + token
    }
}).then((response) => {
    if (response.ok) {
        return response.json();
    }
    if (response.status === 401) {
        //return JSON.stringify("You must log in")
    } else {
        console.log(response);
        console.log('Erreur: Impossible d\'accéder au serveur!');
        //return JSON.stringify("Error: Enabled to accessthe server")
    }

}).catch(err => {
    console.log(err)
});


const sPATCH = axios.patch(url,data)
fetch(url, {
    "method": "PATCH",
    "headers": {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": "Bearer " + token
    },
    "body": JSON.stringify(data)
}).then((response) => {
    if (response.ok) {
        return response.json();
    }
    if (response.status === 401) {
        //return JSON.stringify("You must log in")
    } else {
        console.log(response);
        console.log('Erreur: Impossible d\'accéder au serveur!');
        //return JSON.stringify("Error: Enabled to accessthe server")
    }

}).catch(err => {
    console.log(err)
});


const sDELETE = axios.delete(url)
fetch(url, {
    "method": "DELETE",
    "headers": {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": "Bearer " + token
    }
}).then((response) => {
    if (response.ok) {
        return response.json();
    }
    if (response.status === 401) {
        //return JSON.stringify("You must log in")
    } else {
        console.log(response);
        console.log('Erreur: Impossible d\'accéder au serveur!');
        //return JSON.stringify("Error: Enabled to accessthe server")
    }

}).catch(err => {
    console.log(err)
});


export {
    POST,
    PATCH,
    GET,
    PUT,
    DELETE,
    sPOST,
    sGET,
    sPATCH,
    sPUT,
    sDELETE
};