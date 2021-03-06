import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { register } from "../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Aapni Paathshalas {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    // margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
    marginTop: "-5%",
    width: "30%",
    height: "10%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    height: "100%",
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));

class RegisterComponent extends Component {



  state = {
    name: "",
    standard: "",
    email: "",
    password: "",
  };
  submitHandler = (e) => {
    const { name, email, password ,standard} = this.state;

    e.preventDefault();

    // if (password !== confirm_password) {
    //   console.log("Password doesn't match");
    // } else {
    console.log("submit clicked");
    this.props.dispatch(register({ name,  email, password,standard }));
    // }
  };
  // onChangeHandler = (e) => {
  //   this.setState((prevState) => {
  //     return {
  //       ...prevState,
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  // };

  onChangeName = (e) => {
    const n = e.target.value;
    this.setState({ name: n });
  };
  onChangeStandard = (e) => {
    const n = e.target.value;
    this.setState({ standard: n });
  };
  onChangeEmail = (e) => {
    const n = e.target.value;
    this.setState({ email: n });
  };
  onChangePass = (e) => {
    const n = e.target.value;
    this.setState({ password: n });
  };
  render() {
    const { classes } = this.props;
    const { name, email, password, standard } = this.state;
    const {isAuthenticated}=this.props.auth;

    if(isAuthenticated){
      return <Redirect to="/admin/dashboard"/>
    }
    return (
      <MuiThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>

            {/* <img src={this.props.logo} className={classes.avatar}/> */}

            {/*<Typography component="h1" variant="h5">*/}
            {/*  Register*/}
            {/*</Typography>*/}
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e) => this.onChangeName(e)}
                    id="name"
                    label="name"
                    autoFocus
                    value={name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="standard"
                    label="Standard"
                    onChange={(e) => this.onChangeStandard(e)}
                    name="standard"
                    autoComplete="standard"
                    value={standard}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    onChange={(e) => this.onChangeEmail(e)}
                    name="email"
                    autoComplete="email"
                    value={email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    onChange={(e) => this.onChangePass(e)}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                  />
                </Grid>
                {/*<Grid item xs={12}>*/}
                {/*  <FormControlLabel*/}
                {/*    control={<Checkbox value="allowExtraEmails" color="primary" />}*/}
                {/*    label="I want to receive inspiration, marketing promotions and updates via email."*/}
                {/*  />*/}
                {/*</Grid>*/}
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e)=>this.submitHandler(e)}
              >
                Register
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </MuiThemeProvider>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default 
  withStyles(useStyles)(connect(mapStateToProps)(RegisterComponent)
);
