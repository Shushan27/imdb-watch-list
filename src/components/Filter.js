import { Button, Card, Col, Input, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const Filter = ({ isLoading, title, setTitle, onSearch }) => {
  return (
    <Card style={{ width: '100%' }}>
      <Row>
        <Col lg={4} md={6} sm={10}>
          <Input
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                onSearch();
              }
            }}
            placeholder="Search by title"
            value={title}
            disabled={isLoading}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Col>
        <Col>
          <Button
            type="primary"
            style={{ marginLeft: 5 }}
            icon={<SearchOutlined />}
            disabled={!title.trim()}
            loading={isLoading}
            onClick={onSearch}
          >
            Search
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

Filter.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Filter;
