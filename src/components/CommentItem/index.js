// Write your code here
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails, onDeleteComment, toggleIsLiked} = props
  const {
    nameInput,
    commentInput,
    id,
    isLiked,
    date,
    initialClassName,
  } = commentDetails

  const deleteComment = () => {
    onDeleteComment(id)
  }

  const onLiked = () => {
    toggleIsLiked(id)
  }

  const likeUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeClassName = isLiked ? 'liked' : ''
  return (
    <li>
      <div className="comment-item-name-container">
        <div>
          <p className={initialClassName}>{nameInput[0]}</p>
        </div>

        <p className="comment-item-name">{nameInput}</p>
        <p className="comment-item-date">{formatDistanceToNow(date)}</p>
      </div>
      <p className="comment-item-comment">{commentInput}</p>

      <div className="buttons-container">
        <div className="like-container">
          <img className="images" src={likeUrl} alt="like" />
          <button
            onClick={onLiked}
            type="button"
            className={`like-button ${likeClassName}`}
          >
            Like
          </button>
        </div>
        <button
          data-testid="delete"
          className="del-button"
          type="button"
          onClick={deleteComment}
        >
          <img
            className="images"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <div>
        <hr />
      </div>
    </li>
  )
}
export default CommentItem
