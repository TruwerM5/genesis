const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const URL = 'https://test.gnzs.ru/oauth/get-token.php';
let headers = {
    'Content-Type': 'application/json'
}
const app = express();
const port = process.env.port || 3000;
let token = '';
let base_domain = '';
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('static'));

let lead = [
    {
        "name": "Reagan #1",
        "price": 10000,
        "_embedded": {
            "tags": [
                {"id": 5699}
            ]
        }
    }
];

const contact = [{
    "name": "Reagan",
    "first_name": "ilsur",
    "last_name": "khalimov"

    
}]

const company =  [{
    "name": "АО Reagan Company",
    "custom_fields_values": [
        {
            "field_code": "PHONE",
            "values": [
                {
                    "value": "+7912322222",
                    "enum_code": "WORK"
                }
            ]
        }
    ]
}]

app.get('/', async (req, res) => {
    
    await getToken();

    return res.json(data);
});

app.use(async (req,res,next) => {
    if(!base_domain || !token) {
        await getToken();
    }
    next();
})

app.post('/createlead', async (req, res) => {
    
    const data = await axios.post(`https://${base_domain}/api/v4/leads`, lead, 
    {
        headers
    }).then(response => response)
    .catch(error =>  error);    
    
    res.json( {id: data.data._embedded.leads[0].id, mode: 'leads'})
    
} )


app.post('/createcontact', async (req, res) => {
    const data = await axios.post(`https://${base_domain}/api/v4/contacts`, contact, {headers})
    .then(response => response)
    .catch(error => error);
    
    res.json({id: data.data._embedded.contacts[0].id, mode: 'contacts'});
})

app.post('/createcompany', async (req, res) => {
    const data = await axios.post(`https://${base_domain}/api/v4/companies`, company, {headers})
    .then(response => response)
    .catch(error => error);

    
    res.json({id: data.data._embedded.companies[0].id, mode: 'companies'});
});


async function getToken() {
    return await axios.get(URL, {
        headers: {
            'Content-Type': 'application/json',
            'X-Client-Id': 31550986
        }
    })
    .then(response => {
        token = response.data.access_token;
        base_domain = response.data.base_domain;
        headers.Authorization = `Bearer ${token}`;
    })
    .catch(e => {
        console.log(e.response.data);
    });
}


app.listen(port, () => {
    console.log(`Server is working on port ${port}...`);
});