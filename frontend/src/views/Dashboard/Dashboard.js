import React,{useEffect,useState} from "react";
import {Link} from "react-router-dom";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from "axios";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { connect } from "react-redux";
import JoinClass from "components/JoinClass";
import CreateClass from "components/CreateClass";

const useStyles = makeStyles(styles);

export function Dashboard(props) {

  const classes = useStyles();
  const [joinedClasses,setJoinedClasses]=useState([]);
  const [assignments, setAssignments]=useState([]) ;
  const [student,setStudent]=useState(false);

  const [student,setStudent] = useState(false) ;

  useEffect(()=>{
    setStudent(props.auth.isStudent);
    console.log("isStudent",props.auth.isStudent);
    const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.token,
        },
      }

    axios.get("http://localhost:5000/api/user/joinedClasses",config)
      .then(response=>{
        console.log(response.data);
        setJoinedClasses(response.data);
      })

    axios.get('http://localhost:5000/api/assignment' , config )
    .then(response=>{
      console.log(response.data) ;
      setAssignments(response.data) ;
    }).catch(err=>console.log(err));


  },[]);

  console.log('IsStudent ',props.auth.isStudent,' & state : ',student);

  return (
    <div>
      {student ? <JoinClass/> : <CreateClass/>}
      <br/>
      <GridContainer>
      {joinedClasses ? (
        joinedClasses.map(element=>{
          return (
            <React.Fragment key={element._id}>
              <GridItem xs={12} sm={6} md={4}>
                <Link
                  to={{
                    pathname: `/admin/classroom`,
                    state: {
                      sub: element.subject,
                      classid:element._id
                    },
                  }}
                >
                  <Card>
                    <CardHeader color='success' stats icon>
                      <CardIcon color='success'>
                        <Icon>
                          <Store />
                        </Icon>
                      </CardIcon>
                      <br />
                      <h3 className={classes.cardTitle}>{element.subject}</h3>
                      <h3 className={classes.cardCategory}>
                        80 <small>%</small>
                      </h3>
                    </CardHeader>
                    <CardFooter stats></CardFooter>
                  </Card>
                </Link>
              </GridItem>
            </React.Fragment>
          );
        })
      ) : null}
      </GridContainer>

      <GridContainer>

        {assignments.length > 0 ? <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color='danger'>
              <h4 className={classes.cardTitleWhite}>Assigned Assignments</h4>
              <p className={classes.cardCategoryWhite}>
                List of Due Assignments
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor='danger'
                tableHead={['ID', 'Name', 'Subject', 'Due Date']}
                tableData={assignments}
              />
            </CardBody>
          </Card>
        </GridItem> : null }
      </GridContainer>
    </div>
  );
}

function mapStateToProps(state){
  return {
    auth:state.auth
  }
}

export default connect(mapStateToProps)(Dashboard) ;

 {
   /* <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer> */
 }
