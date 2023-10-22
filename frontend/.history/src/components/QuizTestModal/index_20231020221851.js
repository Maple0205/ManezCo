import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import TestBlock from '../TestBlock';
import baseUrl from '../../config';
const apiPath = 'quiz/';
const apiUrl = `${baseUrl}${apiPath}`;
const token = sessionStorage.getItem('token');

const QuizTestModal = (props) => {
  const [quizzes, setQuizzes] = useState({});
  const [quizData, setQuizData] = useState([]);
  const get_quizzes = async () => {
    const response = await fetch(apiUrl+props.title, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    const data = await response.json();
    if (response.status !== 200) {
      alert(response.msg);
    }
    else{
      setQuizData(data.results);
      let temp_quizzes = {};
      for (let i of data.results) {
        temp_quizzes[i.id] = null;
      }
      setQuizzes(temp_quizzes);
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    get_quizzes();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    submit_quizzes();
  };

  const handleCancel = () => {
    const userConfirmed = window.confirm("Are you sure you want to exit the quiz?");
    if (userConfirmed) {
      setQuizzes({});
      setQuizData([]);
      setIsModalOpen(false);
    }
  };
  

  const submit_quizzes = async()=>{
    for (let i in quizzes) {
      if(quizzes[i]===null){
        alert("Please finish all the questions!");
        return;
      }
    }
    for (let i in quizzes) {
      if(Array.isArray(quizzes[i])){
        quizzes[i] = quizzes[i].join(",");
      }
    }
    const response = await fetch(baseUrl+"quiz/attempts_quizzes_lesson/", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        quizzes:quizzes,
      })
    });
    const data = await response.json();
    if (response.status !== 200) {
      alert(response.msg);
      return;
    }
    if(data.results.correct===0 || data.results.correct===1){
      alert(`You have finished the quiz! You get ${data.results.mark} points! ${data.results.correct} question is correct!`);
    }else{
      alert(`You have finished the quiz! You get ${data.results.mark} points! ${data.results.correct} questions are correct!`);
    }
    setIsModalOpen(false);
  }

  return (
    <>
      <Button type="primary" size="large" onClick={showModal}>
        Start
      </Button>
      <Modal key={isModalOpen} title={props.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800} maskClosable={false} closeIcon={false}
      okText='Submit' cancelText='Exit'>
        <TestBlock setQuizzes={setQuizzes} quizzes={quizzes} quizData={quizData}/>
      </Modal>
    </>
  );
};

export default QuizTestModal;
