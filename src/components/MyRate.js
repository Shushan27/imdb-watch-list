import { Input } from 'antd';
import PropTypes from 'prop-types';

const MyRate = ({ rate, updateRate }) => {
  return (
    <Input
      style={{ marginTop: 15 }}
      placeholder="My rate"
      value={rate}
      type="number"
      step=".1"
      min="0"
      max="10"
      onChange={({ target }) => updateRate(target.value)}
    />
  );
};

MyRate.propTypes = {
  rate: PropTypes.string,
  updateRate: PropTypes.func.isRequired,
};

export default MyRate;
