import React, { Component } from 'react';
import logo from './noria_logo.jpeg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/react-bootstrap/'
import { LineChart, YAxis, ChartContainer, ChartRow, Resizable, Charts, Baseline }
    from 'react-timeseries-charts';
import { TimeSeries } from 'pondjs';
import { ButtonGroup, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Grid, Row, Col } from 'react-bootstrap';
import rq from 'request-promise';

// import data from "./noria_data.json";

import data from "./noria_data.json";

const points = data.widget[0].data.reverse();

const series = new TimeSeries({
    name: "USD_vs_EURO",
    columns: ["time", "value"],
    points
});

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

function getToken() {

}



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            setTemp: 0,
            ambientTemp: 0,
            onOff: false,
            currentSetTemp: 0,
            currentAmbientTemp: 0
        }
    }

    handleGetToken() {
        let options = {
            method: 'POST',
            uri: 'https://dx-api.thingpark.com/admin/v121/api/oauth/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            json: true
        };
        let req = rq(options).then((res) => {
            console.log(res)
        }, (err) => {
            console.log(err);
        });
    }

    handleUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    {/*<h2>Noria Demo</h2>*/}
                </div>
                <div className="App-body">
                    <Resizable>
                        <ChartContainer timeRange={series.range()} format="%b '%y">
                            <ChartRow height="150">
                                <YAxis id="temperature" label="Temperature (F)" min={series.min()} max={series.max()}
                                       width="60" format=",.2f" />
                                <Charts>
                                    <LineChart axis="temperature" series={series} />
                                    <Baseline axis="temperature" value={series.max()} label="Max" position="right" />
                                    <Baseline axis="temperature" value={series.min()} label="Min" position="right" />
                                </Charts>
                            </ChartRow>
                        </ChartContainer>
                    </Resizable>
                    <Grid>
                        <Row>
                            <Col xsOffset={1} xs={10} md={8}>
                                <ButtonGroup>
                                    <Button>On</Button>
                                    <Button>Off</Button>
                                </ButtonGroup>
                            </Col>
                            <Col xsOffset={1} xs={10} md={8}>
                                <FieldGroup
                                    id="formControlsText"
                                    type="number"
                                    label="Set Temp"
                                    placeholder="Current Set Temperature"
                                    // value={this.state.setTemp}
                                />
                            </Col>
                            <Col xsOffset={1} xs={10} md={3}>
                                <FieldGroup
                                    id="formUsername"
                                    type="email"
                                    label="Username"
                                    placeholder="Enter Username"
                                    // value={this.state.username}
                                    onChange={this.handleUsernameChange.bind(this)}
                                />
                            </Col>
                            <Col xsOffset={1} xs={10} md={3}>
                                <FieldGroup
                                    id="formPassword"
                                    type="password"
                                    label="Password"
                                    placeholder="Enter Password"
                                    // value={this.state.password}
                                    onChange={this.handlePasswordChange.bind(this)}
                                />
                            </Col>
                            <Col md={3}>
                                <Button style={{marginTop: '10px'}} onClick={this.handleGetToken.bind(this)}>Get Token</Button>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
    )};
}

export default App;
