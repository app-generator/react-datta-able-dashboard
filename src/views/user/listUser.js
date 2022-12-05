import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'


import {
    Button,
     Card, Table , Modal
} from 'react-bootstrap';
import axios from "axios";

const ListUser = () => {

  

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [users, setUsers] = useState([]);
  const requestOptions = {
    method: "GET",

    headers: { 
        //'Access-Control-Allow-Origin': '*',
        //"Content-Type": "application/json",
        //'Access-Control-Allow-Credentials':"true",
        //"Access-Control-Allow-Methods": "GET",
        //"Access-Control-Allow-Headers": "Content-Type",
        'Cookie': 'csrftoken=xH8Cu7TZjE4MOwiX8ZP1uQRlzn32s75Yg6daQTDiEpk1oGK4Ht2E4qdWih6OFmc7; sessionid=3u34xh5lpy7b5145faeub34uhv0m536v',
        
        },
        //mode: 'cors',
        //cache: 'default',
    
    };

  
      useEffect(()=>{
        const loadUsers=async()=>{
            const res=await fetch('http://localhost:8000/api/user/', requestOptions)
            const data=await res.json()
            setUsers(data)
            console.log(data)
            console.log(res)
        }
     
        loadUsers()
    },[]);


  return (
    <div>
    

      <Card>
                        <Card.Header>
                            <Card.Title as="h5">Lista de usuarios</Card.Title>
                        </Card.Header>
                        <div className="form-row"  >
                        <Link to="/add-user" >
                            <button className="btn btn-success" > 
                                       <i className="fa fa-plus"></i>  Agregar usuario
                            </button>
                        </Link>
            
                        </div>
                        <div className="form-row">
                            <button className="btn button-theme-color" ><i className="fas fa-search" ></i></button>

                                <input type="text" placeholder="Buscar por nombre" name="nombre" id="nombre" className="form-control col-3" />
                        </div>
                        


                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre de usuario</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Ultimo login</th>
                                        <th>Creado</th>
                                        <th>Actualizado</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>@mdo</td>
                                        <td>Mark</td>
                                        <td>Mark@mark.com</td>
                                        <td>12/09/2022</td>
                                        <td>11/08/2021</td>
                                        <td>11/09/2022</td>
                                        <td>

                                        <Link to="/detail-user" >
                                            <Button className="btn-icon " variant="outline-primary">
                                                <i className='fas fa-eye ' title="Detalle" />
                                            </Button>
                                        </Link>

                                        
                                        <Link to="/add-user" >
                                            <Button className="btn-icon " variant="outline-warning">
                                                <i className='far fa-edit' title="Editar" />
                                            </Button>
                                        </Link>

                                        
                                            <Button className="btn-icon " variant="outline-danger" onClick={handleShow}>
                                                <i className='fas fa-trash-alt' title="Eliminar" />
                                            </Button>
                                      
 
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>@fat</td>
                                        <td>Jacob</td>
                                        <td>jacob@jacob.com</td>
                                        <td>12/09/2022</td>
                                        <td>11/08/2021</td>
                                        <td>11/09/2022</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>@twitter</td>
                                        <td>Larry</td>
                                        <td>larry@larry.com</td>
                                        <td>12/09/2022</td>
                                        <td>11/08/2021</td>
                                        <td>11/09/2022</td>
                                    </tr>
                      
                                    
                                </tbody>
                               
                            </Table>
                            
                        </Card.Body>
                        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estas seguro que quiere eliminar este usuario?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
                    </Card>
                    
    </div>
  );
}
export default ListUser