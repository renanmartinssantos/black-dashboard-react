/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import { useEffect } from "react";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  CardFooter,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";

function Dashboard(props) {
  
  const [bigChartData, setbigChartData] = React.useState("data1");
  const [cameras, setCameras] = React.useState([]);
  const [divCameras, setDivCameras] = React.useState([]);
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/v1/cameras/")
      .then(response => divCamerass(JSON.parse(response.data.cameras)))
      .catch(error => console.error(error));
  }, []);

  const divCamerass = (cameras) => {
    setCameras(cameras);
    const arrayResult = [];
    let i = 0;
    let arrayTemp = []
    cameras.map((camera, index) => {
        arrayTemp.push(camera);
        i++
      if(cameras.length - 1 === index ){
        arrayResult.push(arrayTemp);
      }
      if(i === 5){
        arrayResult.push(arrayTemp);
        arrayTemp = [];
        i = 0;  
      }
    })
    setDivCameras(arrayResult)
  }

  let urlCameras = 'http://127.0.0.1:5000/cameras/';
  
  

  return (
    <>
      <div className="content">
        {divCameras.map((divCamera, index) => (
          <Row>
          {divCamera.map((camera, index) => (
            <Col lg="2">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h3">
                  <h2><i className="tim-icons icon-camera-18 text-info" /> {camera.id}</h2>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="">
                {camera.id != null && <img src={urlCameras + camera.id + ".jpg"} />} 
                </div>
                {camera.rua != null && <div>{camera.rua}</div>}
                <br></br>
                <h5>Quantidades de Objetos</h5>
                {camera.count.person > 0 && <div>Pessoas: {camera.count.person} </div>}
                {camera.count.car > 0 && <div>Carros: {camera.count.car}</div>}
                {camera.count.bike > 0 && <div>Bicicletas: {camera.count.bike}</div>}
                {camera.count.truck > 0 && <div>Caminhão: {camera.count.truck}</div>}
                {camera.count.train > 0 && <div>Trem: {camera.count.train}</div>}
                </CardBody>
              <CardFooter>
              <h5 className="card-category">Ultima Atualização: <br></br> {new Date(camera.lastUpdate.$date).toLocaleDateString()} - {new Date(camera.lastUpdate.$date).toLocaleTimeString()}: </h5>
              </CardFooter>
            </Card>
          </Col>
          ))}
          </Row>  
        ))}
      </div>
    </>
  );
}

export default Dashboard;
