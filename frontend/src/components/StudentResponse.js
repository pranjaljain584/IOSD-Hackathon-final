import React from 'react';
import {createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#185ABC'
        }
    }
});

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        height : '8vh'

    },
    content: {
        display: "flex",
        flexDirection : "column",
        margin: "10px",

    },
    textField : {
        margin: "10px",
        // color: "#000"
    },
    submit : {
        with: "50%",
    },

    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        display : "flex",
        textTransform : 'none',
        justifyContent : 'center',
        alignItems : 'center',
        transform: 'translate(-3%, -10%)',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function StudentResponse(props) {
    
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const {name, subject, dueDate} = props;
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(props.id);
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.token,
            },
        }
        const body={
            id:props.id,
        }
        axios.post('http://localhost:5000/api/assignment/submit',body,config).then(res=>{
            console.log(res.data);
            setOpen(false) ;
        }).catch(err=>console.log("****", err))
    }

    return (
        <MuiThemeProvider theme={theme}>
            <Button variant="outlined" color="primary" size={'small'} className={classes.margin}

                 onClick={handleClickOpen}
            >

                Respond
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Submit Your Response
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent >
                    <form className={classes.content} noValidate>
                    <TextField id="Name" label="Name"  name={name} value={name} disabled={true} className={classes.textField}/>

                    <TextField id="Subject" label="Subject"  name={subject} value={subject} disabled={true} className={classes.textField}/>

                    <TextField id="Due Date" label="Due Date"  name={dueDate} value={dueDate} disabled={true} className={classes.textField}/>

                    <TextField
                        style={{margin: "10px", marginTop: "30px"}}
                        id="outlined-multiline-static"
                        label="Multiline"
                        multiline
                        rows={4}
                        defaultValue="Default Value"
                        variant="outlined"
                    />

                    </form>

                    <Button
                        type='submit'
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submitHandler}
                    >
                        Submit
                    </Button>

                </DialogContent>



            </Dialog>
        </MuiThemeProvider>
    );
}