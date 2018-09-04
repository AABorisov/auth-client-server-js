import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './HeaderStyle.css';

class Header extends Component {
    renderLinks() {
        if (this.props.authenticated) {
            return (
                <div>
                    <Link className="signout" to="/signout">Sign out</Link>
                    <Link className="feature" to="/feature">Feature</Link>
                </div>
            );
        } else {
            return (
                <div>
                    <Link className="signup" to="/signup">Sign up</Link>
                    <Link className="signin" to="/signin">Sign in</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="header">
                <Link to="/">Redux Auth</Link>
                {this.renderLinks()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(Header);