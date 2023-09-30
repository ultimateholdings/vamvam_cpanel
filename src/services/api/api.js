import axios from 'axios';



//Mettre en place la structure d'appel api avec axios ainsi que la gestion des erreurs
axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then(res => {
        const persons = res.data;
        this.setState({
            persons
        });
    })