import React from 'react';
import { Card, Space } from 'antd';
import QuizModal from '../QuizModal';
const QuizCard = (props) => (

  <Space direction="vertical" size={16}>
    <Card
      title={`# ${props.quiz.id}`}
      extra={<QuizModal quiz={props.quiz} get_quizes={props.get_quizes}/>}
      style={{
        textAlign: 'left',
        width: 300,
        height: 280,
      }}
    >
      <div style={{width:'90%', textAlign:'left', height:'100%' }}>
      <p><b>Type: </b>{props.quiz.type === 0 ? (
        'Single Choice'
      ) : props.quiz.type === 1 ? (
        'Multiple Choice'
      ) : null}</p>
      <p><b>Lesson: </b>{props.quiz.lesson}</p>
      <p><b>Quiz: </b>{props.quiz.description}</p>
      <p><b>Attempts: </b>{props.quiz.attempts}</p>
      <p>
      <b>Correct rate: </b>
      {props.quiz.correct / props.quiz.attempts?((props.quiz.correct / props.quiz.attempts) * 100).toFixed(2):0}%
      </p>
        </div>
    </Card>
  </Space>
);
export default QuizCard;