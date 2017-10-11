import React from 'react';
import PropTypes from 'prop-types';
import { classes } from '../../utils/helpers';

import './style';

const Stage = ({
  name,
  status
}) => <div className={classes('stage', `status-${status}`)}>
  {name}
</div>;

Stage.propTypes = {
  name: PropTypes.string,
  status: PropTypes.oneOf(['success', 'failure', 'pending', 'cancelled', 'unknown'])
};

export default Stage;