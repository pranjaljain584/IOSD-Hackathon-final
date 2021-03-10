import React, { useEffect, useState } from 'react';
import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import swal from 'sweetalert';
import { connect } from 'react-redux';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#185ABC',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    height: '8vh',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
  },
  textField: {
    margin: '10px',
    // color: "#000"
  },
  submit: {
    with: '50%',
  },

  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    display: 'flex',
    textTransform: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'translate(-3%, -10%)',
  },
    card : {
      width: 500,
      display: 'flex',
      flexDirection: 'column',
    },

}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function StudentResponse(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const { name, subject, dueDate } = props;
  const [student, setStudent] = useState(false);

  useEffect(() => {
    setStudent(props.auth.isStudent);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen2= () => {
    setOpen(true);
  };
  const handleClose2 = () => {
    setOpen(false);
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(props.id);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token,
      },
    };
    const body = {
      id: props.id,
    };
    axios
      .post('http://localhost:5000/api/assignment/submit', body, config)
      .then((res) => {
        console.log(res.data);
        setOpen(false);
        swal('Response Submitted').then(
          () => (window.location.href = '/admin/dashboard')
        );
      })
      .catch((err) => console.log('****', err));
  };

  return (
    <MuiThemeProvider theme={theme}>
      {student && (
        <Button
          variant='outlined'
          color='primary'
          size={'small'}
          className={classes.margin}
          onClick={handleClickOpen}
        >
          Respond
        </Button>
      )}

      {!student && (
        <Button
          variant='outlined'
          color='primary'
          size={'small'}
          className={classes.margin}
          onClick={handleClickOpen2}
        >
          Response
        </Button>
      )}

      {student ? (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge='start'
                color='inherit'
                onClick={handleClose}
                aria-label='close'
              >
                <CloseIcon />
              </IconButton>
              <Typography variant='h6' className={classes.title}>
                Submit Your Response
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <form className={classes.content} noValidate>
              <TextField
                id='Name'
                label='Name'
                name={name}
                value={name}
                disabled={true}
                className={classes.textField}
              />

              <TextField
                id='Subject'
                label='Subject'
                name={subject}
                value={subject}
                disabled={true}
                className={classes.textField}
              />

              <TextField
                id='Due Date'
                label='Due Date'
                name={dueDate}
                value={dueDate}
                disabled={true}
                className={classes.textField}
              />

              <TextField
                style={{ margin: '10px', marginTop: '30px' }}
                id='outlined-multiline-static'
                label='Multiline'
                multiline
                rows={4}
                defaultValue='Default Value'
                variant='outlined'
              />
            </form>

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={submitHandler}
            >

            </Button>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose2}
          TransitionComponent={Transition}
        >
          <Card elevation={0}>
            <CardContent className={classes.card}>
              <h1>Students Response</h1>
          <TextField
              id="standard-textarea"
              label="name"
              defaultValue={name}
              style={{margin: '20px 0 30px 0'}}
              variant='outlined'
              fullWidth
              disabled
          />
          <TextField
                  id="standard-textarea"
                  label="Subject"
                  defaultValue={subject}
                  variant='outlined'
                  style={{margin: '0px 0 30px 0'}}
                  fullWidth
                  disabled
          />

          <TextField
                  id="standard-textarea"
                  label="Response"
                  defaultValue={subject}
                  style={{margin: '0px 0 30px 0'}}
                  variant='outlined'
                  multiline
                  rows={3}
                  fullWidth
                  disabled
          />
            </CardContent>
          </Card>
        </Dialog>
      )}
    </MuiThemeProvider>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(StudentResponse);
