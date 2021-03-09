import React from "react";
import {CanvasJSChart} from 'canvasjs-react-charts'
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
Data=


export default function TypographyPage() {
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
        {  y: 71, label:'Monday' },
        { x: 20, y: 55, label:'Tuesday'},
        // { x: 30, y: 50, label: 'Wednesday' },
        { x: 40, y: 65, label: 'Wednesday' },
        // { x: 50, y: 71 },
        { x: 60, y: 68 , label:'Thursday'},
        // { x: 70, y: 38 },
        { x: 80, y: 92, label:"Friday" },
        // { x: 90, y: 54 },
        { x: 100, y: 60,  label:'Saturday'},
        // { x: 110, y: 21 },
        { x: 120, y: 49, label:'Sunday' },
        // { x: 'Sunday', y: 36 }
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
