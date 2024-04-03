import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import CrudButton from '../../components/Button/CrudButton'; 
import TableEntity from './components/TableEntity'; 
import { getEntities } from '../../api/services/entities';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import Search from '../../components/Search/Search';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import Alert from '../../components/Alert/Alert';


const ListEntity = () => {
    const [entities, setEntities] = useState([]);
    const [isModify, setIsModify] = useState(null);
    
    const [loading, setLoading] = useState(true);

    
    //Alert
    const [showAlert, setShowAlert] = useState(false);

    //AdvancedPagination
    const [currentPage, setCurrentPage] = useState(1);
    const [countItems, setCountItems] = useState(0);
    const [updatePagination, setUpdatePagination] = useState(false)
    const [disabledPagination, setDisabledPagination] = useState(true)

    const [wordToSearch, setWordToSearch]= useState('')
    const [order, setOrder] = useState("");

    function updatePage(chosenPage){
        setCurrentPage(chosenPage);
    }

    useEffect( ()=> {

        

        getEntities(currentPage, wordToSearch, order) 
            .then((response) => {
                setEntities(response.data.results);
                // Pagination
                setCountItems(response.data.count);
                if(currentPage === 1){
                    setUpdatePagination(true)  
                }
                setDisabledPagination(false)
            })
            .catch((error) => {
                // Show alert
            })
            .finally(() => {
                setShowAlert(true)
                setLoading(false)
            })
        
    }, [currentPage, isModify, wordToSearch])

return (
    <React.Fragment>
        <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)} component="entity"/>
        <Row>
            <Navigation actualPosition={'Entidades'}/>  
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col sm={12} lg={9}>
                             <Search type="por nombre de entidad" setWordToSearch={setWordToSearch} wordToSearch={wordToSearch} setLoading={setLoading} />
                            </Col>
                            <Col sm={12} lg={3}>
                                <Link to={{pathname:'/entities/create'}} >
                                    <CrudButton type='create' name='Entidad' />
                                </Link>
                            </Col> 
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <TableEntity setIsModify={setIsModify} list={entities} loading={loading} currentPage={currentPage} />
                    </Card.Body>
                    <Card.Footer >
                        <Row className="justify-content-md-center">
                            <Col md="auto"> 
                                <AdvancedPagination countItems={countItems} updatePage={updatePage} updatePagination={updatePagination} setUpdatePagination={setUpdatePagination} setLoading={setLoading} setDisabledPagination={setDisabledPagination} disabledPagination={disabledPagination}/> 
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
                </Col>
        </Row>
    </React.Fragment>
    );
};

export default ListEntity; 
