import React, { useEffect, useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import QuizComplete from '../QuizComplete';

import baseUrl from '../../config';
const apiPath = 'quiz/attempt_by_user/';
const apiUrl = `${baseUrl}${apiPath}`;

const QuizStatistic = () => {
  const token = sessionStorage.getItem('token');
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [correct_amount, setCorrectAmount] = useState(0);
  const [incorrect_amount, setIncorrectAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);
  const get_attempt_by_user = async () => {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    const data = await response.json();
    if (response.status !== 200) {
      alert(response.msg);
    } else {
      calculate(data.results);
    }
  }

  useEffect(() => {
    get_attempt_by_user();
  });

  const calculate = (quizes) => {
    const correct = quizes.filter(quiz => quiz.result === true);
    setCorrectAmount(correct.length);
    const total = quizes.length;
    setIncorrectAmount(total-correct.length);
    setTotal(total);
    const correct_percentage = (correct.length/total*100).toFixed(2);
    setCorrect(correct_percentage);
    setIncorrect(100-correct_percentage);

    const arr = quizes.map(quiz => quiz.quiz);
    const set = new Set(arr);
    const completed = set.size;
    setCompleted(completed);
  }

  return (
    <div >  
      <h3>Complete</h3>
      <div style={{border: '1px solid #eee',padding:20}}>
        <QuizComplete total={total} completed={completed} correct={correct_amount} incorrect={incorrect_amount}/>
      </div>

      <h3 style={{marginTop:"30px"}}>Correct Percentage</h3>
  <Row gutter={16}>
    <Col span={12}>
      <Card bordered={true}>
        <Statistic
          title="Correct"
          value={correct}
          precision={2}
          valueStyle={{
            color: '#3f8600',
          }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col span={12}>
      <Card bordered={true}>
        <Statistic
          title="Incorrect"
          value={incorrect}
          precision={2}
          valueStyle={{
            color: '#cf1322',
          }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
  </Row>
</div>
);}
export default QuizStatistic;