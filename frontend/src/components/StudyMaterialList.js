import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth:850,
    borderRadius: 10,
    minHeight:130,
    marginBottom:20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardContent: {
    paddingTop: 0,
  },
}));

export default function StudyMaterialList(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const {text ,teacher , fileUrl,material} = props ;


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

//   console.log("List Materal" , material) ;

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}
    >
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label='recipe' className={classes.avatar}>
              R
            </Avatar>
          }
          title={teacher ? teacher : 'Teacher Name'}
          //   title={teacher}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant='body2' color='textSecondary' component='p'>
            {text}
          </Typography>
          <img src={material} alt="img" />
          {/* {!fileUrl ? <a href={fileUrl} download={fileUrl}>pdf</a> : null} */}
        </CardContent>
      </Card>
    </div>
  );
}
