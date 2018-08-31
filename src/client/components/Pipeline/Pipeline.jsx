import React from 'react';
import PropTypes from 'prop-types';
import pipelines from '../../api/pipelines';
import Stage from '../Stage';
import { classes } from '../../utils/helpers';

import './style';

const REFRESH_RATE = 5000;

export default class Pipeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      status: 'unknown',
      stages: []
    };
  }

  refreshPipelineProgress() {
    pipelines.get(this.props.projectId, this.props.definitionId).then(data => {
      this.setState({
        name: data.name,
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
      <h1>{this.state.name}</h1>
      {this._renderStages(this.state.stages)}
    </div>;
  }
}

Pipeline.propTypes = {
  definitionId: PropTypes.string,
  projectId: PropTypes.string
};