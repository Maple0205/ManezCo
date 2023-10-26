import React, {useEffect, useState} from 'react';
import { Pagination } from 'antd';
import QuizGrid from '../QuizGrid';
import baseUrl from '../../config';
const apiPath = 'quiz/';
const apiUrl = `${baseUrl}${apiPath}?page=`;
const QuizDashboard = () => {
  const [current, setCurrent] = useState(1);
  const [quizes, setQuizes] = useState([]);
  const token = sessionStorage.getItem('token');
  const [total, setTotal] = useState(0);

  const get_quizes = async () => {
    const response = await fetch(apiUrl+current, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    const data = await response.json();
    if (response.status !== 200) {
      alert(response.msg);
    } else {
      setQuizes(data.results);
      setTotal(data.count);
    }
  }


  useEffect(() => {
    get_quizes();
  },[current]);

  const onChange = (page) => {
    setCurrent(page);
  };


  return(
  <>
    <QuizGrid quizes={quizes} get_quizes={get_quizes}/>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end'}}>
      <div style={{ position:'fixed', bottom:'10%'}}>
        <Pagination current={current} onChange={onChange} pageSize={6} total={total} />
      </div>
    </div>



  </>)


};
export default QuizDashboard;