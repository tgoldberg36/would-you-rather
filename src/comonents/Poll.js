import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/shared";
import '../css/poll.css'

class Poll extends Component {
  state = {
    answer: '',
  }

  handleVote = (vote) => {
    this.setState(() => ({
      answer: vote
    }))
  }


  handleSubmit = (e, answer) => {
    e.preventDefault()

    const { dispatch, id, authedUser } = this.props
    
    if(answer){
      dispatch(handleAnswerQuestion({ authedUser, qid: id, answer }))
    }else{
      alert("Please select an option")
    }
    
  }

  render() {
    const {
        question,
        users,
        id,
        authedUser,
    } = this.props

    if (!question) {
      return <Redirect to="/Error" />;
    }

    const author = question ? users[question.author] : null
    const usersAnswer = question ? users[authedUser].answers[id] : null
    const questionAnswered = question ? question.optionOne.votes.includes(authedUser) 
      || question.optionTwo.votes.includes(authedUser)
      : false

    const questionOneVotes = question.optionOne.votes.length
    const questionTwoVotes = question.optionTwo.votes.length
    const questionTotalVotes = questionOneVotes + questionTwoVotes
    const questionOnePercent = Math.floor(questionOneVotes/questionTotalVotes*100)
    const questionTwoPercent = Math.floor(questionTwoVotes/questionTotalVotes*100)
    
    return (
      <div className="pollContainer">
        <h4>{author.name} asks ...</h4>
        <img 
          alt={`Avatar of ${author.avatarURL}`} 
          src={`${author.avatarURL}`}
          className={'pollPic'}
        />
        
        {questionAnswered ? (
          <>
            <h3>Poll Results:</h3>
            <h4>A: {question.optionOne.text}</h4>
            <div>
              <p>{questionOneVotes} out of {questionTotalVotes} votes ( {questionOnePercent}% ) {usersAnswer === 'optionOne' ? '-- Your answer' : ''}</p>
            </div>
            
            <h4>B: {question.optionTwo.text}</h4>
            <div>
              <p>{questionTwoVotes} out of {questionTotalVotes} votes ( {questionTwoPercent}% ) {usersAnswer === 'optionTwo' ? '-- Your answer' : ''}</p>
            </div>
          </>
        ) : (
          <>
            <h3>Would you rather..?</h3>
              <div>
                <input
                  type="radio"
                  onClick={(e) => this.handleSubmit(e, "optionOne")}
                />
                <label> A : {question.optionOne.text}</label>
              </div>
              <br />
              <div>
                <input
                  type="radio"
                  onClick={(e) => this.handleSubmit(e, "optionTwo")}
                />
                <label> B : {question.optionTwo.text}</label>
              </div>
          </>
        )}
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, { match }) {
  const { id } = match.params
  const question = questions[id]

  return {
    question,
    users,
    id,
    authedUser,
  };
}
export default connect(mapStateToProps)(Poll);