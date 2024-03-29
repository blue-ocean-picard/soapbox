import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

export default class TwitterBarChart extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const xkey = this.props.entity;

    return (
      <ResponsiveContainer width='100%' height={300}>
        <BarChart
          width={100}
          height={100}
          data={this.props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xkey} />
          <YAxis dataKey="retweetAvg" />
          <YAxis dataKey="likesAvg" />
          <YAxis dataKey="replyAvg" />
          <Tooltip />
          <Legend />
          <Bar dataKey="retweetAvg" fill="#8884d8" />
          <Bar dataKey="likesAvg" fill="#82ca9d" />
          <Bar dataKey="replyAvg" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

TwitterBarChart.propTypes = {
  data: PropTypes.array,
  entity: PropTypes.string,
};