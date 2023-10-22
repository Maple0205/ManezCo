import React, { useState } from 'react';
import { Modal, Radio, Checkbox, Space } from 'antd';
import baseUrl from '../../config';
const apiPath = 'quiz/attempt';
const apiUrl = `${baseUrl}${apiPath}`;
const QuizModal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const token = sessionStorage.getItem('token');

  const options = [
  { label: `A: ${props.quiz.SelectA}`, value: props.quiz.SelectA },
  { label: `B: ${props.quiz.SelectB}`, value: props.quiz.SelectB },
  { label: `C: ${props.quiz.SelectC}`, value: props.quiz.SelectC },
  { label: `D: ${props.quiz.SelectD}`, value: props.quiz.SelectD },
];
  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  }

  const handleCheckboxChange = (checkedValues) => {
    const orderedOptions = [
      props.quiz.SelectA,
      props.quiz.SelectB,
      props.quiz.SelectC,
      props.quiz.SelectD,
    ];
  
    const selectedOptionsInOrder = orderedOptions.filter(option => checkedValues.includes(option));
  
    setSelectedOption(selectedOptionsInOrder);
  };
  
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    submit_attempt();
  };

  const submit_attempt = async () => {
    const res = Array.isArray(selectedOption) ? selectedOption.join(",") : selectedOption;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        quiz: props.quiz.id,
        attempt: res,
      })
    });
    const data = await response.json();
    if (data.status !== 200) {
      console.log(data);
      const msg = data.result.result? "You are right!": "You are wrong!";
      alert(msg);
      setIsModalOpen(false);
      setSelectedOption(null);
      props.get_quizes();
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {/* eslint-disable-next-line */}
      <a onClick={showModal}>
        Attempt
      </a>
      <Modal title={`# ${props.quiz.id} ${props.quiz.type === 0 ? (
          'Single Choice'
        ) : props.quiz.type === 1 ? (
          'Multiple Choice'
        ) : null}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText='Submit'>
        <p>Quiz: {props.quiz.description}</p>
        {props.quiz.type === 0 ? (
          <>
            <Radio.Group onChange={handleRadioChange} value={selectedOption}>
              <Space direction="vertical">
                <Radio value={props.quiz.SelectA}>A: {props.quiz.SelectA}</Radio>
                <Radio value={props.quiz.SelectB}>B: {props.quiz.SelectB}</Radio>
                <Radio value={props.quiz.SelectC}>C: {props.quiz.SelectC}</Radio>
                <Radio value={props.quiz.SelectD}>D: {props.quiz.SelectD}</Radio>
              </Space>
            </Radio.Group>
          </>
        ) : props.quiz.type === 1 ? (
          <>
            <Checkbox.Group onChange={handleCheckboxChange} value={selectedOption}>
              <Space direction="vertical">
                {options.map(option => (
                  <Checkbox key={option.value} value={option.value}>
                    {option.label}
                  </Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          </>
        ) : null}
      </Modal>
    </>
  );
};
export default QuizModal;