import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component{
    renderContent(){
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li><a class="waves-effect waves-light btn-small" href={'/auth/google'}>Login with Google</a></li>

                );
            default:
                return <li><a href={'/api/logout'}>Logout</a></li>;
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper light-blue accent-4">
                    <Link
                        to = {this.props.auth ? '/surveys' : '/'}
                        className="left brand-logo"
                    >
                        Provider
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

//get called with the entire state object out of the redux store
//will return object that will be passed to the header as props
// using es6 allows to destructure the auth property off of the state object
//since keys and values are the same in the return object it can be condensed down to
//just "auth"
function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);

