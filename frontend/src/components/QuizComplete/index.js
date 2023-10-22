import React from 'react';
import { Descriptions } from 'antd';

const QuizComplete = (props) => {
  const items = [
    {
      key: '1',
      label: 'Total Attempts',
      children: props.total,
    },
    {
      key: '2',
      label: 'Correct',
      children: props.correct,
    },
    {
      key: '3',
      label: 'Incorrect',
      children: props.incorrect,
    },
    {
      key: '4',
      label: 'Completed Quizzes',
      children: props.completed,
    },
  ];
  console.log(items);
  return(
  <Descriptions items={items} />)
}
export default QuizComplete;