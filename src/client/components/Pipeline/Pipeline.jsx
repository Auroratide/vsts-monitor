import React from 'react';
import pipelines from '../../api/pipelines';
import { classes } from '../../utils/helpers';

import './style';

export default class Pipeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'unknown'
    };
  }

  componentDidMount() {
    pipelines.getAll().then(data => {
      this.setState({
        status: data.status
      });
    });
  }

  render() {
    return <div className={classes('pipeline', `status-${this.state.status}`)}>
      Pipeline
    </div>;
  }
}