import React, { useEffect } from "react";
import {CanvasJSChart} from 'canvasjs-react-charts'
import axios from "axios";
// @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// core components
// import Quote from "components/Typography/Quote.js";
// import Muted from "components/Typography/Muted.js";
// import Primary from "components/Typography/Primary.js";
// import Info from "components/Typography/Info.js";
// import Success from "components/Typography/Success.js";
// import Warning from "components/Typography/Warning.js";
// import Danger from "components/Typography/Danger.js";
// import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardBody from "components/Card/CardBody.js";
var Component = React.Component;
var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// const data=[];
// data.push();

export default function TypographyPage() {
  useEffect(()=>{
    const config={headers:{
      'Content-Type':'application/json',
      'x-auth-token':localStorage.token,

    }
  }
  axios.get('http://localhost:5000/api/screentime/timeline',config)
  .then(res=>{console.log("*******",res.data)})
  .catch(err=>{console.log(err)})
  }
  
  )
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    title:{
      text: "Your Activity over the Past week"
    },
    axisX:{
      title:"Days",
    },
    axisY: {
      includeZero: true,
      title:"Minutes"
    },
    data: [{
      type: "column", //change type to bar, line, area, pie, etc
      //indexLabel: "{y}", //Shows y value on all Data Points
      indexLabelFontColor: "#5A5757",
      indexLabelPlacement: "outside",
      dataPoints: [
        { x:10, y: 71, label:'Monday' },
        { x:20, y: 55, label:'Tuesday'},
        { x:40,  y: 65, label: 'Wednesday' },
        {  y: 68 , label:'Thursday'},
        {  y: 92, label:"Friday" },
        {  y: 60,  label:'Saturday'},
        {  y: 49, label:'Sunday' },
      ]
    }]
  }
  
  return (
    <div>
      <CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
    
  );
}
