import axios from 'axios';

// ajout d’un intercepteur de requête
axios.interceptors.request.use(function (config) {
    // faire quelque chose avant que la requête ne soit envoyée
    return config;
}, function (error) {
    // faire quelque chose en cas d’erreur
    return Promise.reject(error);
});

// ajout d’un intercepteur de réponse
axios.interceptors.response.use(function (response) {
    // n’importe quel code de réponse HTTP dans la plage 2xx activera cette
    // fonction
    // faire quelque chose avec les données de la réponse
    return response;
}, function (error) {
    // n’importe quel code de réponse HTTP hors de la plage 2xx activera cette
    // fonction
    // faire quelque chose avec les données de l’erreur
    return Promise.reject(error);
});