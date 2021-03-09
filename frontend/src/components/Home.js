import React, { Component } from 'react';
import '../assets/css/Home.css'
import backgroundImg from '../assets/img/background.svg';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

class Home extends Component {
  render() {
    // const { isAuthenticated } = this.props.auth;

    // Redirect if logged in

    // if (isAuthenticated) {
    //   return <Redirect to='/dashboard' />;
    // }

    return (
        <section style={{ minHeight: '100vh' }}>
          <div className='Home'>
            <div className='Home-svg'>
              <img src={backgroundImg} alt='' />
            </div>
            <div className='Home-desc'>
              <h1 className='Home-title'>
                {' '}
                <span className='student'>Apni</span> <br />
                Paathshala
              </h1>
              <p className='Home-info'>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
              <div className="button-container">
                <Button component={Link} to='/Register' variant="contained"  size='large'
                        style={{textTransform: 'none', textDecoration: 'none', color:'white', backgroundColor:'#185ABC'}}
                >
                  Register
                </Button>
                <Button component={Link} to='/Login' variant="outlined"  size='large'
                        style={{textTransform: 'none', textDecoration: 'none', color:'white', backgroundColor:'#185ABC'}}

                >
                  Login
                </Button>
              </div>
            </div>

          </div>

        </section>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     auth: state.auth,
//   };
// }

// export default connect(mapStateToProps)(Home);
export default Home;
