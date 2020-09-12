import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
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

const CustomToolTip = ({active, payload, label}) => {
if (active) {
  return(
    <div className="custom-tooltip">
    <p className="desc">This is as far as I could get.<br></br>
    The intent was to click each avatar button and show the chart info here.<br></br>
    I got stuck trying to filter data and set the 30 minute interval.</p>
  </div>
  )
}
return null;
}

export default (props) => {
  
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <LineChart
        width={600}
        height={400}
        data={props.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="at" />
        <YAxis unit={props.data[0].unit} type="number" domain={['auto','auto']} />
        <Tooltip content={CustomToolTip}/>
        <Legend />
        <Line name={props.data[0].metric} unit={props.data[0].unit} type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </Card>
  );
};
