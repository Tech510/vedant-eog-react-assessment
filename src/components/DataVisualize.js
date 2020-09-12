import React from "react";
import { Provider, createClient, useQuery } from "urql";
import ChartPlaceHolder from "./ChartPlaceHolder"
import LinearProgress from "@material-ui/core/LinearProgress";

const client = createClient({
  url: "https://react.eogresources.com/graphql"
});

const timeStampquery = `
query {
  heartBeat
}
`;

export default (props) => {
  return (
    <Provider value={client}>
      <DataVisualize {...props} />
    </Provider>
  );
}

const DataVisualize = (props) => {
  const [result] = useQuery({
    query: timeStampquery,
  });

  const { fetching, data, error } = result;

  if (fetching || error || !data) return <LinearProgress />;

  return (
    <ChartPlaceHolder {...props} loadTimestamp={data.heartBeat} />
  );
};