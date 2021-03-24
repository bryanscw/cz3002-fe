// import React, {Component} from "react";
// import {Bar} from "react-chartjs-2";
// import PropTypes from "prop-types";
// import {connect} from "react-redux";
//
// import {
//   fetchAccuracy,
//   fetchTime,
//   selectGraph,
//   selectGraphFailed,
//   selectGraphLoading
// } from '../../../redux/ducks/graph.js'
//
// class Graph extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//
//       number_of_bins: 10
//
//     };
//   }
//
//   componentDidMount() {
//
//     this.props.fetchAccuracy(this.state)
//     this.props.fetchTime(this.state)
//     //this.props.fetchMe(this.state)
//
//   }
//
//   render = () => {
//     if (!this.props.graphLoading && !this.props.graphFailed) {
//       console.log(this.props.graph)
//
//       const data = {
//         labels: this.props.graph.labels,
//         datasets: [
//           {
//             label: "dataset",
//             data: this.props.graph.data,
//             fill: true,
//             lineTension: 0,
//             backgroundColor: "#115293",
//             borderColor: "rgba(75,192,192,1)"
//           },
//
//         ]
//       };
//       return (
//           <div className="App">
//             <Bar data={data}/>
//           </div>
//       );
//     } else {
//       return (
//           <loader></loader>
//       )
//     }
//   }
// }
//
// Graph.propTypes = {
//
//   fetchAccuracy: PropTypes.func.isRequired,
//   fetchTime: PropTypes.func.isRequired,
//   graphLoading: PropTypes.bool.isRequired,
//   graphFailed: PropTypes.bool,
//   graph: PropTypes.object.isRequired,
//
// };
//
// const mapStateToProps = (state) => ({
//   graphLoading: selectGraphLoading(state),
//   graphFailed: selectGraphFailed(state),
//   graph: selectGraph(state),
//
// });
//
// const dispatchers = {
//   fetchAccuracy,
//   fetchTime,
//
// };
//
// export default connect(mapStateToProps, dispatchers)(Graph);