
import React, { Component } from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      lineTension: 0,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    
  ]
};
class Graph extends Component {

    render=()=>{

        return (
            <div className="App">
              <Line data={data} />
            </div>
          );
    }
}
export default Graph;