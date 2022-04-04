// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import './index.css'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    IntialAppointments: [],
    titleInput: '',
    dateInput: '',
    filterActive: false,
  }

  isStartBtnClick = id => {
    this.setState(prevState => ({
      IntialAppointments: prevState.IntialAppointments.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  onStarBtnClicked = () => {
    const {filterActive} = this.state
    this.setState({filterActive: !filterActive})
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formateDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formateDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      IntialAppointments: [...prevState.IntialAppointments, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointments = () => {
    const {IntialAppointments, filterActive} = this.state
    if (filterActive) {
      return IntialAppointments.filter(eachItem => eachItem.isStarred === true)
    }
    return IntialAppointments
  }

  render() {
    const {titleInput, dateInput, filterActive} = this.state
    const filterData = this.getFilteredAppointments()
    const filterClassName = filterActive ? 'filter-filled' : 'filter-empty'
    return (
      <div className="bg-container">
        <div className="container">
          <div className="box1">
            <div className="add-app-card">
              <h1 className="heading">Add Appointment</h1>
              <form onSubmit={this.onAddAppointment} className="form">
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  placeholder="Title"
                  onChange={this.onChangeTitle}
                  className="input-cls"
                />
                <label className="label" htmlFor="date">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDate}
                  className="input-cls"
                />
                <button className="button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="main-img"
            />
          </div>
          <hr className="hr" />
          <div className="box2">
            <div className="item-container">
              <div className="app-star-container">
                <h1 className="heading">Appointments</h1>
                <button
                  className={`star-btn ${filterClassName}`}
                  type="button"
                  onClick={this.onStarBtnClicked}
                >
                  Starred
                </button>
              </div>

              <ul className="itemList">
                {filterData.map(eachItem => (
                  <AppointmentItem
                    AppointmentDetails={eachItem}
                    key={eachItem.id}
                    isStartBtnClick={this.isStartBtnClick}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
