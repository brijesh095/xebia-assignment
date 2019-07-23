import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {
    logoutAction,
    filterPlanet
  } from '../actions';
import { connect } from 'react-redux';



class Search extends Component {

    state = {
        planet: '',
        name: '',
        diameter: '',
        climate: ''
    }

    filterHandler(e) {
        const { filterPlanet } = this.props;
        let planet = this.state.planet;
        planet = e.target.value;
        this.setState({planet}, 
            () => {
                filterPlanet(this.state.planet);
            }
        );

    }

    logoutEvent() {
        const { logoutAction } = this.props;
        logoutAction(this.props) 
    }

    showDetails(name, diameter, climate) {
        this.setState({
            name,
            diameter,
            climate    
        })
    }

    render() {
        const { filterPageData } = this.props;
        const {name, diameter, climate} = this.state;

        let loginUser = false;
        if(localStorage.getItem('loginUser') !== null) {
            loginUser = true;
        }
        if(loginUser === false) {
            return <Redirect to="/" />
        }
        return (
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <button style={{marginLeft:'600px'}} className="btn btn-danger btn-lg" type="button" onClick={this.logoutEvent.bind(this)}>
                        Logout
                    </button>
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Search</h5>
                            <input id="search" 
                            type="text" 
                            className="form-control input-lg" 
                            placeholder="Search" 
                            name="planet" 
                            onChange={this.filterHandler.bind(this)}
                            value={this.state.planet}
                            />
                            
                        </div>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Diameter</th>
                            <th>Climate</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            filterPageData.loginReducer.planetDetails && filterPageData.loginReducer.planetDetails.map((val, key) => 
                            <>
                            <tr 
                            key={key} 
                            onClick={this.showDetails.bind(this, val.name, val.diameter, val.climate)}
                            style={{cursor:'pointer'}}    
                            >
                                <td>{val.name}</td>
                                <td>{val.diameter}</td>
                                <td>{val.climate}</td>
                            </tr>
                            </>

                            )
                        }    
                        </tbody>
                    </table>
                    <div>
                        {
                            name ? 
                            <ul>
                                <li>{name}</li>
                                <li>{diameter}</li>
                                <li>{climate}</li>
                            </ul> : ''
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      filterPageData: state
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        logoutAction: dispatch(logoutAction),
        filterPlanet: dispatch(filterPlanet)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);