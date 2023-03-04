import React from 'react';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getNetwork } from '../../../../api/services/networks';

const FormCidr = (props) => {
    const [network, setNetwork] = useState('');

    useEffect(() => {

        showParentCidr(props.url)
        
    }, []);
    
    const showParentCidr = (url) => {
        getNetwork(url)
        .then((response) => {
            console.log(response)
            setNetwork(response.data)
        })
        .catch();
    }
return (
        network && 
        <React.Fragment>
            <Form.Control plaintext readOnly defaultValue={network.cidr} />
        </React.Fragment>
    );
};

export default FormCidr; 
