import React from 'react';
import pipelines from '../../api/pipelines';
import Stage from '../Stage';
import { classes } from '../../utils/helpers';

import './style';

const REFRESH_RATE = 5000;

export default class Pipeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'unknown',
      stages: []
    };
  }

  refreshPipelineProgress() {
    pipelines.getAll().then(data => {
      this.setState({
        status: data.status,
        stages: data.stages
      });
    });
  }

  runRefreshTimer() {
    this.refreshPipelineProgress();
    setTimeout(() => {
      this.runRefreshTimer();
    }, REFRESH_RATE);
  }

  componentDidMount() {
    this.runRefreshTimer();
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