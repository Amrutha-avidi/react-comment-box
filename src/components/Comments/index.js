import {Component} from 'react'

import {v4 as uudiv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    nameInput: '',
    commentInput: '',
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uudiv4(),
      nameInput,
      commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onDeleteComment = id => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== id),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  addingNewComment = () => {
    const {commentsList} = this.state
    return commentsList.map(eachComment => (
      <CommentItem
        onDeleteComment={this.onDeleteComment}
        toggleIsLiked={this.toggleIsLiked}
        key={eachComment.id}
        commentDetails={eachComment}
      />
    ))
  }

  enterComment = event => {
    this.setState({commentInput: event.target.value})
  }

  enterName = event => {
    this.setState({nameInput: event.target.value})
  }

  render() {
    const {commentInput, nameInput, commentsList} = this.state
    return (
      <div className="main">
        <div className="card">
          <div className="comment-card">
            <form
              className="comment-card-description"
              onSubmit={this.onAddComment}
            >
              <h1>Comments</h1>
              <p>Say Something about 4.0 Technologies</p>
              <input
                onChange={this.enterName}
                value={nameInput}
                className="inputs"
                placeholder="Your Name"
                type="text"
              />
              <textarea
                onChange={this.enterComment}
                value={commentInput}
                className="inputs"
                rows="8"
                cols="30"
                placeholder="Your Comment"
              >
                .
              </textarea>
              <div>
                <button className="button" type="submit">
                  Add Comment
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comment-image"
            />
          </div>

          <div>
            <hr className="line" />
          </div>

          <div className="added-comment-container">
            <div className="added-comment-container-top">
              <p className="count-container">{commentsList.length}</p>
              <p className="count-container-head">Comments</p>
            </div>

            <ul className="adding-comments-container">
              {this.addingNewComment()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Comments
// Write your code here
