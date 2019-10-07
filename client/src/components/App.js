//view layer
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// connect function gives certain components to call action creators
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;


class App extends Component {
    //lifecycles method used to fetch the current user
    //the instance is component is rendered on the screen fetch current user
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return(
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path = "/" component={Landing} />
                        <Route exact path = "/surveys" component={Dashboard} />
                        <Route path =  "/surveys/new" component={SurveyNew}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
//once the connect function passes in all the actions
//they will be assigned to the app component as props
export default connect(null, actions)(App);