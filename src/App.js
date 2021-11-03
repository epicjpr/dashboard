import logo from './logo.svg';
import './App.css';
import config from "./config";
import { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import Maps from "fusioncharts/fusioncharts.maps";
import USARegion from "fusionmaps/maps/es/fusioncharts.usaregion";
import "./chart-theme";
import userImage from "./assets/images/User_Icon.png";
import styled from "styled-components";
import Dropdown from "react-dropdown";


ReactFC.fcRoot(FusionCharts, Charts, Maps, USARegion);
const url = `https://sheets.googleapis.com/v4/spreadsheets/${ config.spreadsheetId }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${ config.apiKey }`;
const Container = styled.div``;
const Nav = styled.nav``;
class App extends Component {
  constructor() {
    super();
    this.state= {
      items: []
    };
  }

  getData = arg => {
    const arr = this.state.items;
    let amRevenue = 0,
        ebRevenue = 0,
        etRevenue = 0,
        totalRevenue = 0,
        purchaseRate = 0,
        productViews = 0,
        checkoutRate = 0,
        abandonedRate = 0,
        ordersTrendStore = [],
        ordersTrendRegion = [],
        ordersTrendnw = 0,
        ordersTrendsw = 0,
        ordersTrendc = 0,
        ordersTrendne = 0,
        ordersTrendse = 0;
    for (let a of arr) {
      if (arg === a["month"]) {
        let label = null;
        if (a["source"] === "AM") {
          amRevenue += parseInt(a["revenue"]);
          label = "Amazon";
        } else if (a["source"] === "EB") {
          ebRevenue += parseInt(a["revenue"]);
          label = "Ebay";
        } else  if (a["source"] === "ET") {
          etRevenue += parseInt(a["revenue"]);
          label = "Etsy";
        }
        if (label) {
          ordersTrendStore.push({
            label: label,
            value: a["orders"],
            displayValue: `${a.orders} orders`
          });
        }
        productViews += parseInt(a["product_views"]);
        purchaseRate += parseInt(a["purchase_rate"] / 3);
        checkoutRate += parseInt(a["checkout_rate"] / 3);
        abandonedRate += parseInt(a["abandoned_rate"] / 3);
        ordersTrendnw += parseInt(a["orders_nw"]);
        ordersTrendsw += parseInt(a["orders_sw"]);
        ordersTrendc += parseInt(a["orders_c"]);
        ordersTrendne += parseInt(a["orders_ne"]);
        ordersTrendse += parseInt(a["orders_se"]);
        ordersTrendRegion.push({
          id: "01",
          value: ordersTrendne
        }, {
          id: "02",
          value: ordersTrendnw
        }, {
          id: "03",
          value: ordersTrendse
        }, {
          id: "04",
          value: ordersTrendsw
        }, {
          id: "05",
          value: ordersTrendc
        });
      }
    }
    totalRevenue = amRevenue + ebRevenue + etRevenue;
    this.setState({
      amRevenue: amRevenue,
      ebRevenue: ebRevenue,
      etRevenue: etRevenue,
      productViews: productViews,
      totalRevenue: totalRevenue,
      purchaseRate: purchaseRate,
      checkoutRate: checkoutRate,
      abandonedRate: abandonedRate,
      ordersTrendStore: ordersTrendStore,
      ordersTrendRegion: ordersTrendRegion
    });
  };

  updateDashboard = e => {
    this.getData(e.value);
    this.setState({
      selectedValue: e.value
    });
  };

  componentDidMount() {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let batchRowValues = data.valueRanges[0].values;
        const rows = [];
        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        let dropdownOptions = [];
        for (let r of rows) {
          dropdownOptions.push(r.month);
        }
        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();

        this.setState({
            items: rows,
            dropdownOptions: dropdownOptions,
            selectedValue: "Jan 2019"
          },
          () => this.getData("Jan 2019")
        );
      });
      }

  render () {
    return (
      <Container>
    
        <Nav className="navbar navbar-dark bg-primary">
        {/* <Nav className="navbar navbar-light bg-light"> */}
        {/* <Nav className="navbar navbar-dark bg-dark"> */}
          <Container className="navbar-brand h1 mb-0 text-large font-medium" style={{ paddingLeft: "1rem" }}>
            Dashboard
          </Container>
          <Container className="navbar-nav ml-auto">
            <Container className="user-detail-section">
              <span className="pr-2 text-white" style={{ paddingRight: "1rem" }}>Welcome</span>
              <span className="img-container" style={{ paddingRight: "0.5rem" }}>
                <img src={userImage} className="rounded-circle" alt="user"/>
              </span>
            </Container>
          </Container>
        </Nav>

        {/* <Nav className="navbar nav-secondary navbar-dark bg-primary"> */}
        <Nav className="navbar nav-secondary navbar-light bg-light">
          <Container className="text-medium" style={{ paddingLeft: "1rem"}}>Summary</Container>
          <Container className="navbar-nav ml_auto" style={{ paddingRight: "1rem"}}>
            <Dropdown
              className="pr-2 custom-dropdown"
              options={this.state.dropdownOptions}
              value={this.state.selectedValue}
              onChange={this.updateDashboard}
              placeholder="Select a month"
            />
          </Container>
        </Nav>

        <Container className="container-fluid container-background pr-5 pl-5 pt-5 pb-5">

          <Container className="row">
            <Container className="col-lg-3 col-sm-6 mb-4">
              <Container className="card card-background grid-card">
                <Container className="card-heading">
                  <Container className="text-small text-white">Total revenue</Container>
                </Container>
                <Container className="card-value pt-4 text-x-large currency">
                  <span className="pr-1 text-large">$</span>
                  {this.state.totalRevenue}
                </Container>
              </Container>
            </Container>
          
          
            <Container className="col-lg-3 col-sm-6 mb-4">
              <Container className="card card-background grid-card">
                <Container className="card-heading">
                  <Container className="text-small text-white">Revenue from Amazon</Container>
                </Container>
                <Container className="card-value pt-4 text-x-large currency">
                  <span className="pr-1 text-large">$</span>
                  {this.state.amRevenue}
                </Container>
              </Container>
            </Container>
          

          
            <Container className="col-lg-3 col-sm-6 mb-4">
              <Container className="card card-background grid-card">
                <Container className="card-heading">
                  <Container className="text-small text-white">Revenue from eBay</Container>
                </Container>
                <Container className="card-value pt-4 text-x-large currency">
                  <span className="pr-1 text-large">$</span>
                  {this.state.ebRevenue}
                </Container>
              </Container>
            </Container>
        
            <Container className="col-lg-3 col-sm-6 mb-4">
              <Container className="card card-background grid-card">
                <Container className="card-heading">
                  <Container className="text-small text-white">Revenue from Etsy</Container>
                </Container>
                <Container className="card-value pt-4 text-x-large currency">
                  <span className="pr-1 text-large">$</span>
                  {this.state.etRevenue}
                </Container>
              </Container>
            </Container>
            
          </Container>

          <Container className="row">

            <Container className="col-lg-3 col-md-4 mb-4">
              <Container className="card grid-card card-background">
                <Container className="card-heading mb-3">
                  <Container className="text-small text-white">
                    Product views
                  </Container>
                </Container>
                <Container className="card-value pt-4 text-x-large text-white">
                  {this.state.productViews}
                  <span className="text-medium pl-2">views</span>
                </Container>
              </Container>
            </Container>

            <Container className="col-lg-9 col-md-8 mb-4">
              <Container className="card chart-card card-background">
                <Container className="row full-height">
                  <Container className="col-sm-4 full-height">
                    <Container className="chart-container  full-height">
                      <ReactFC 
                        {...{
                          type: "doughnut2d",
                          width: "100%",
                          height: "100%",
                          dataFormat: "json",
                          containerBackgroundOpacity: "0",
                          dataSource: {
                            chart: {
                              caption: "Purchase rate",
                              theme: "dashboard",
                              defaultCenterLabel: `${this.state.purchaseRate}%`,
                              paletteColors: "#3B70C4, #8c92ac"
                            },
                            data: [
                              {
                                label: "active",
                                value: `${this.state.purchaseRate}`
                              },
                              {
                                label: "inactive",
                                alpha: 5,
                                value: `${100 - this.state.purchaseRate}`
                              }
                            ]
                          }
                        }
                      }/>
                    </Container>
                  </Container>
                  <Container className="col-sm-4 full-height border-left border-right">
                    <Container className="chart-container full-height">
                      <ReactFC
                        {...{
                          type: "doughnut2d",
                          width: "100%",
                          height: "100%",
                          dataFormat: "json",
                          containerBackgroundOpacity: "0",
                          dataSource: {
                            chart: {
                              caption: "Checkout rate",
                              theme: "dashboard",
                              defaultCenterLabel: `${this.state.checkoutRate}%`,
                              paletteColors: "#41B6C4, #8c92ac"
                            },
                            data: [
                              {
                                label: "active",
                                value: `${this.state.checkoutRate}`
                              },
                              {
                                label: "inactive",
                                alpha: 5,
                                value: `${100 - this.state.checkoutRate}`
                              }
                            ]
                          }
                        }}
                      />
                    </Container>
                  </Container>
                  <Container className="col-sm-4 full-height">
                    <Container className="chart-container full-height">
                      <ReactFC
                        {...{
                          type: "doughnut2d",
                          width: "100%",
                          height: "100%",
                          dataFormat: "json",
                          containerBackgroundOpacity: "0",
                          dataSource: {
                            chart: {
                              caption: "Abandoned cart rate",
                              theme: "dashboard",
                              defaultCenterLabel: `${
                                this.state.abandonedRate
                              }%`,
                              paletteColors: "#EDF8B1, #8c92ac"
                            },
                            data: [
                              {
                                label: "active",
                                value: `${this.state.abandonedRate}`
                              },
                              {
                                label: "inactive",
                                alpha: 5,
                                value: `${100 - this.state.abandonedRate}`
                              }
                            ]
                          }
                        }}
                      />
                    </Container>
                  </Container>
                </Container>
              </Container>
            </Container>

          </Container>

          <Container className="row" style={{ minHeight: "400px" }}>

            <Container className="col-md-6 mb-4">
              <Container className="card chart-card card-background">
                <Container className="chart-container large full-height">
                  <ReactFC 
                  {...{
                    type: "bar2d",
                    width: "100%",
                    height: "100%",
                    dataFormat: "json",
                    containerBackgroundOpacity: "0",
                    dataEmptyMessage: "Loading...",
                    dataSource: {
                      chart: {
                        caption: "Orders trend",
                        subCaption: "By store",
                        theme: "dashboard"
                      },
                      data: this.state.ordersTrendStore
                    }
                  }
                  }/>
                </Container>
              </Container>
            </Container>
          
            <Container className="col-md-6 mb-4">
              <Container className="card chart-card card-background">
                <Container className="chart-container large full-height">
                  <ReactFC 
                  {...{
                    type: "usaregion",
                    width: "100%",
                    height: "100%",
                    dataFormat: "json",
                    containerBackgroundOpacity: "0",
                    dataEmptyMessage: "Loading...",
                    dataSource: {
                      chart: {
                        caption: "Orders trend",
                        subCaption: "By region",
                        theme: "dashboard"
                      },
                      data: this.state.ordersTrendRegion,
                      colorrange: {
                        code: "#F64F4B",
                        minvalue: "0",
                        gradient: "1",
                        color: [
                          {
                            minValue: "10",
                            maxvalue: "25",
                            code: "#EDF8B1"
                          },
                          {
                            minvalue: "25",
                            maxvalue: "50",
                            code: "#18D380"
                          }
                        ]
                      }
                    }
                  }
                  }/>
                </Container>
              </Container>
            </Container>

          </Container>

        </Container>

      </Container>
      
        
      
      
    );
  }
}

export default App;
