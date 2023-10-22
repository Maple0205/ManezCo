import Carousel from 'react-bootstrap/Carousel';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Radio, Space, Checkbox } from 'antd';

function TestBlock(props) {

  const handleRadioChange = (e, id) => {
    let temp_quizzes = { ...props.quizzes }; // Create a copy
    temp_quizzes[id] = e.target.value; // Modify the copy
    props.setQuizzes(temp_quizzes); // Update the state with the copy
  }
  

const handleCheckboxChange = (checkedValues, quiz) => {
  const orderedOptions = [
    quiz.SelectA,
    quiz.SelectB,
    quiz.SelectC,
    quiz.SelectD,
  ];

  const selectedOptionsInOrder = orderedOptions.filter(option => checkedValues.includes(option));
  
  let temp_quizzes = { ...props.quizzes }; // Create a copy
  temp_quizzes[quiz.id] = selectedOptionsInOrder; // Modify the copy
  props.setQuizzes(temp_quizzes); // Update the state with the copy
};

  return (
    <Carousel data-bs-theme="dark" indicators={false} slide={false} interval={null} wrap={false}>
      {
        props.quizData.map((quiz,index)=>(
          
          <Carousel.Item key={index}>
            <div style={{ 
              margin: '0 auto',  // 居中
              width: '70%',       // 宽度为上一级容器的80%
              fontSize: '1.5em'   // 字体扩大
            }}>
              <p style={{textAlign: 'left'}}>#{index+1} {(quiz.type?'(Multiple)':'(Single)')} {quiz.description}</p> {/* 题目左对齐 */}
              {quiz.type===0?(
                <Radio.Group onChange={(e)=>handleRadioChange(e, quiz.id)} value={props.quizzes[quiz.id]}>
                <Space direction="vertical">
                <Radio value={quiz.SelectA}>A: {quiz.SelectA}</Radio>
                <Radio value={quiz.SelectB}>B: {quiz.SelectB}</Radio>
                <Radio value={quiz.SelectC}>C: {quiz.SelectC}</Radio>
                <Radio value={quiz.SelectD}>D: {quiz.SelectD}</Radio>
                </Space>
              </Radio.Group>
              ):(
                <Checkbox.Group onChange={(checkedValues) => handleCheckboxChange(checkedValues, quiz)} value={props.quizzes[quiz.id]}>
                  <Space direction="vertical">
                    {[
                      { label: `A: ${quiz.SelectA}`, value: quiz.SelectA },
                      { label: `B: ${quiz.SelectB}`, value: quiz.SelectB },
                      { label: `C: ${quiz.SelectC}`, value: quiz.SelectC },
                      { label: `D: ${quiz.SelectD}`, value: quiz.SelectD },
                    ].map(option => (
                      <Checkbox key={option.value} value={option.value}>
                        {option.label}
                      </Checkbox>
                    ))}
                  </Space>
                </Checkbox.Group>)}

            </div>
          </Carousel.Item>
        ))
      }
    </Carousel>
  );
}

export default TestBlock;
