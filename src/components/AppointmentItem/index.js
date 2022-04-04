// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {AppointmentDetails, isStartBtnClick} = props
  const {id, title, date, isStarred} = AppointmentDetails
  const isStarredImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onStarBtnClick = () => {
    isStartBtnClick(id)
  }

  return (
    <li className="list-item">
      <div className="name-star-container">
        <p className="title-name">{title}</p>
        <button
          type="button"
          testid="star"
          className="star-btn-bg"
          onClick={onStarBtnClick}
        >
          <img className="star-cls" src={isStarredImgUrl} alt="star" />
        </button>
      </div>
      <p className="date-cls">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
