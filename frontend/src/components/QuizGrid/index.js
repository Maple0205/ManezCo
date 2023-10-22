import React from 'react';
import { Row, Col } from 'antd';
import QuizCard from '../QuizCard';
const QuizGrid = (props) => {
  return (
    <div style={{marginBottom: 50}}>
      <Row gutter={[16,16]}>
        {props.quizes.map((quiz, index) => (
          <Col span={8} key={index}>
            <QuizCard quiz={quiz}  get_quizes={props.get_quizes}/>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default QuizGrid;
