//This component could not get working, see the ChartPlaceHolder component.


import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "./CardHeader";
import { useSelector } from "react-redux";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import ChartSelectBox from "./ChartSelectBox"
import {
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
} from 'recharts';


const useStyles = makeStyles({
  card: {
    margin: "flex"
  }
});

const getData = (state) => {
  const {data} = state.data;
  return data.map(measurement => {
    return{
      ...measurement,
      at: (new Date(measurement.at))
      .toTimeString()
      .match(/^\d\d:\d\d/)[0],
    };
  });
};

const CustomToolTip = ({active, payload, label}) => {
if (active) {
  return(
    <div className="custom-tooltip">
    <p className="label">{`${label} : ${payload[0].value}`}</p>
  </div>
  );
};
return null;
};

const Chart = () => {
  
  const classes = useStyles();
  const data = useSelector(
    getData
  );
  if( !data ) return <div></div>;
  if ( data.length === 0 ) return <div></div>;
  return (
    <Card className={classes.card}>
      <CardHeader title="Graph Visualization" />
      <ChartSelectBox/>
      <CardContent>
      <LineChart
        width={1800}
        height={400}
        data={data}
        margin={{
          top: 5, right: 30, left: 100, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="at" />
        <YAxis unit={data[0].unit} type="number" domain={['auto','auto']} />
        <Tooltip content={CustomToolTip}/>
        <Legend />
        <Line name={data[0].metric} unit={data[0].unit} type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
      </CardContent>
    </Card>
  );
};

export default Chart;