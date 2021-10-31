import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/createquestion.css'
import { Redirect } from 'react-router-dom'
import { handleSaveQuestion } from '../actions/questions'

class CreateQuestion extends Component {

  state = {
    option1: '',
    option2: '',
    toHome: false,
   }

   handleChange = (e) => {
    const text = e.target.value
    const stateName = e.target.name
    this.setState(() => ({
      [stateName]: text
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { option1, option2 } = this.state
    const { dispatch, authedUser } = this.props

    if(option1.length > 0 && option2.length > 0){
      dispatch(handleSaveQuestion({option1,option2,authedUser}))
      .then(() => 
        this.setState(() => ({
          toHome: true
        }))
      )
    } else {
      alert("In order to submit you must fill in both options")
    }
    
  }

   

  render() {

    const {option1,option2,toHome} = this.state

    if(toHome){
      return <Redirect to='/home' />
    }

    return (
      <div className={'createQuestionContainer'}>
        <h3>Create New Would You Rather:</h3>
        <form onSubmit={this.handleSubmit}>
          <p style={{margin: '2px'}}>Would you rather...</p>
          <input
            style={{width: '300px'}}
            placeholder="Option One"
            onChange={this.handleChange}
            value={option1}
            name="option1"
          />
          <br />
          <p style={{margin: '0px'}}>or</p>
          <input
            style={{width: '300px'}}
            placeholder="Option Two"
            onChange={this.handleChange}
            value={option2}
            name="option2"
          />
          <br />
          <button className={'submitBtn'} type="submit">
            Submit question
          </button>
        </form>
      </div>
    )
  }
}



function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(CreateQuestion)