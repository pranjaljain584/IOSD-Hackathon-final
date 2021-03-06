import React from "react";
// @material-ui/core components

// core components
import { Button } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';


import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { logout } from "actions/auth";
import { connect } from "react-redux";

// const useStyles = makeStyles(styles);

export function AdminNavbarLinks(props) {
  
  const handleClick=()=>{
    // handle logout
    props.dispatch(logout());

  }

  return (
    <div>
      {/* <ProgressBar variant='success' now={20} style={{display:"inlineBlock"}} /> */}
      <Button variant='info' className='d-inline-block' onClick={handleClick}>
        Log Out
      </Button>{' '}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(AdminNavbarLinks) ;
