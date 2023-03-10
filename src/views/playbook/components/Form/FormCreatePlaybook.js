import React, { useState, useEffect } from 'react';
import {Button, Card, CloseButton, Col, Row, Form, Modal} from 'react-bootstrap';
import CrudButton from '../../../../components/Button/CrudButton';
import { validateSpace, validateAlphanumeric, validateSpaces } from '../../../../components/Validator/validators'; 
import Alert from '../../../../components/Alert/Alert';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const animatedComponents = makeAnimated();


const FormCreateNetwork = (props) => { 
    // props: ifConfirm name setName taxonomy setTaxonomy taxonomiesOption setTaxonomyCreated
    
    const [error, setError] = useState(null)

    //Create Taxonomy
    const [modalCreate, setModalCreate] = useState(false)

    //Create Taxonomy
    const createTaxonomy = () => { 
  
    };

    return (
        <React.Fragment>
            {/*<Alert/>*/}
            <Form>
                <Row>
                    <Col sm={12} lg={12}>
                        <Form.Group controlId="Form.Playbook.Name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control 
                                type="name" 
                                placeholder="Ingrese nombre" 
                                maxlength="100"
                                value={props.name} 
                                isValid={ validateAlphanumeric(props.name) && validateSpaces(props.name) }
                                isInvalid={ !validateSpaces(props.name) || !validateAlphanumeric(props.name) }
                                onChange={(e) => props.setCidr(e.target.value)}
                                />
                            {!props.name || validateAlphanumeric(props.cidr) ? "" : <div className="invalid-feedback">Ingrese un cidr valido</div>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={12}>
                        <Form.Group controlId="Form.Playbook.Taxonomy.Multiselect">
                            <Form.Label>Taxonomias</Form.Label>
                            <Select
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                onChange={ (e) => console.log(e) }
                                options={props.taxonomiesOption}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={9}>
                        <CrudButton type='create' name='Taxonomia' onClick={() => setModalCreate(true)}/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={9} />
                    <Col>
                        <Form.Group>
                            { validateAlphanumeric(props.name) && (props.taxonomy.length > 0) ? // 
                                <><Button variant="primary" onClick={props.ifConfirm}>Guardar</Button></>
                                : 
                                <><Button variant="primary" disabled>Guardar</Button></> 
                            }
                            <Button variant="primary" href="/network/tables">Cancelar</Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>

            <Form>
                <Row>
                    <Col sm={12} lg={12}>
                        <Form.Group controlId="Form.Playbook.Taxonomy">
                            <Form.Label>Taxonomias</Form.Label>
                            <Form.Control
                                multiple 
                                name="taxonomy"
                                type="choice"
                                as="select"
                                value={props.taxonomy}
                                >
                                {props.taxonomiesOption.map((tax, index) => {                
                                    return (
                                        <option key={index} value={tax.url}>{tax.name}</option>
                                    );
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            
            <Modal size='lg' show={modalCreate} onHide={() => setModalCreate(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                        <Row>    
                            <Col>                 
                                <Card>
                                <Card.Header> 
                                    <Row>
                                        <Col>
                                            <Card.Title as="h5">Taxonomias</Card.Title>
                                            <span className="d-block m-t-5">Crear taxonomia</span>
                                        </Col>
                                        <Col sm={12} lg={2}>                       
                                            <CloseButton aria-label='Cerrar' onClick={() => setModalCreate(false)} />
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    CREAR TAXONOMIA
                                </Card.Body>
                            </Card>
                        </Col> 
                    </Row>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};
            
export default FormCreateNetwork;
