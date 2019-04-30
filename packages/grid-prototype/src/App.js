import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from "./Grid/Grid";
import { dataByID } from "./data.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      gridState: {
        currentPageIds: [1, 2, 3, 4],
        dataById: dataByID
      }
    }
  };

  onClickHandler = () => {
    var newVal = this.state.gridState.dataById[1].name + "+";
    this.setState(() => ({
      gridState: {
        currentPageIds: [1, 2, 3, 4],
        dataById: {
          1: {
            id: 1,
            name: newVal,
            color: "blue",
            age: 47,
            male: true
          },
          2: {
            id: 2,
            name: "name test",
            color: "blue",
            age: 47,
            male: true
          },
          3: {
            id: 3,
            name: "name test",
            color: "blue",
            age: 47,
            male: true
          },
          4: {
            id: 4,
            name: "name test",
            color: "blue",
            age: 47,
            male: true
          }
        }
      }
    }
    ))
  }

  handleTextChange = (e) => {
    var newVal = e.target.value;
    this.setState(() => ({
      gridState: {
        currentPageIds: [1, 2, 3, 4],
        dataById: {
          1: {
            id: 1,
            name: "name test",
            color: newVal,
            age: newVal,
            male: true
          },
          2: {
            id: 2,
            name: "name test",
            color: "blue",
            age: 47,
            male: true
          },
          3: {
            id: 3,
            name: "name test",
            color: "blue",
            age: 47,
            male: true
          },
          4: {
            id: 4,
            name: "name test",
            color: "blue",
            age: 47,
            male: true
          }
        }
      }
    }
    ))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={this.onClickHandler}> toggle data </button>

          <Grid id="grid-prototype" gridState={this.state.gridState}>
            {
              ({ GridWrapper, HeaderRow, Header, GridBody, DataRow, DataCell }) =>
                <GridWrapper>
                  <HeaderRow>
                    <Header displayText="Name" />
                    <Header displayText="Color" />
                    <Header displayText="Age" />
                    <Header displayText="Male" />
                  </HeaderRow>
                  <GridBody render=
                    {pageData =>
                      pageData.map(item => (
                        <DataRow key={`dataRow_${item.id}`}>
                          <DataCell>
                            {item.name}
                          </DataCell>
                          <DataCell>
                            <input type="text" onChange={this.handleTextChange} value={item.color} />
                          </DataCell>
                          <DataCell>
                            {item.age}
                          </DataCell>
                          <DataCell>
                            {item.male ? 'true' : 'false'}
                          </DataCell>
                        </DataRow>
                      ))
                    }
                  >
                  </GridBody>
                </GridWrapper>
            }
          </Grid>
        </header>
      </div>
    );
  }
}

export default App;
