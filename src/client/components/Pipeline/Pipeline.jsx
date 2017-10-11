import React from 'react';
import pipelines from '../../api/pipelines';
import Stage from '../Stage';
import { classes } from '../../utils/helpers';

import './style';

export default class Pipeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'unknown',
      stages: []
    };
  }

  componentDidMount() {
    pipelines.getAll().then(data => {
      this.setState({
        status: data.status,
        stages: data.stages
      });
    });
  }

  _renderStages(stages) {
    return stages.map((stage, i) => <Stage
      name={stage.name}
      status={stage.status}
      key={i}
    />);
  }

  render() {
    return <div className={classes('pipeline', `status-${this.state.status}`)}>
      {this._renderStages(this.state.stages)}
    </div>;
  }
}