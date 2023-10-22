import React from 'react'
import QuizTestModal from '../QuizTestModal';
export default function EnglishQuiz(props) {
  return (
    <div>
      <h1>{props.lesson} Lesson Quiz</h1>
      <div style={{margin: 50, marginLeft:200, textAlign:'left', fontSize:'18px'}}>
        <p>1. Total score is 100.</p>
        <p>2. There are 5 questions.</p>
        <p>3. Each question has 4 choices.</p>
        <p>4. For single choice question, only one answer out of the possible choices is correct.</p>
        <p>5. For multiple choice question, more than one answer out of the possible choices is correct. All correct options should be selected to be evaluated as correct.</p>
        <p>6. 20 points for each question.</p>
        <p>7. Questions are randomly selected from questions pool.</p>
        <p>8. You only have one chance for each question.</p>
        <p>9. You can only submit the quiz once.</p>
        <p>10. You need to finish all the questions, otherwise the quiz cannot be submitted.</p>
      </div>
      <QuizTestModal title={props.lesson}/>
    </div>
  )
}
