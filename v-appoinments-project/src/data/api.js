const axios = require('axios');

// TODO read the following constants from the environment
const apiUrl = 'http://127.0.0.1:3000/api/v1/';

async function getRecords(entity) {
    try {
        const resp = await axios.get(`${apiUrl}${entity}`);
        return buildResponse(resp);
    } catch(error) {
        return buildResponse(error.response);
    }
}

async function getRecordById(entity, _id) {
    try {
        const resp = await axios.get(`${apiUrl}${entity}/${_id}`);
        return buildResponse(resp);
    } catch(error) {
        return buildResponse(error.response);
    }
}

async function saveRecord(entity, recordData) {
    let resp;
    try {
        if (!recordData['_id']) {
            resp = await axios.post(`${apiUrl}${entity}`, recordData);
        } else {
            let recordId = recordData['_id'];
            delete recordData['_id'];
            resp = await axios.patch(`${apiUrl}${entity}/${recordId}`, recordData);
        }
        return buildResponse(resp);
    } catch(error) {
        return buildResponse(error.response);
    }
}

function buildResponse(response) {
    let message = '---';
    let showSucess = false;
    let data = null;

    if (response.status === 200 || response.status === 201) {
        message = 'Everything is ok :)';
        showSucess = true;
        data = response.data;
    } else if (response.status === 404) {
        message = 'Resource not found!';
    } else if (response.status === 400) {
        message = 'Invalid data!';
        data = response.data.errors;
    } else {  // status 500 or not connecting
        message = 'Oops we had a problem solving your request!';
    }

    return {
        succes: showSucess,
        message: message,
        data: data
    };
}

module.exports = {
    getRecords: getRecords,
    getRecordById: getRecordById,
    saveRecord: saveRecord
}


/*
https://zetcode.com/javascript/axios/
*/
