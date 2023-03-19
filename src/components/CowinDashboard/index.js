// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class CowinDashboard extends Component {
  state = {
    lastSevenDaysData: [],
    vaccinationByAgeList: [],
    vaccinationByGenderList: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const UpdatedData = data.last_7_days_vaccination.map(eachItem => ({
        vaccineDate: eachItem.vaccine_date,
        dose1: eachItem.dose_1,
        dose2: eachItem.dose_2,
      }))
      this.setState({
        lastSevenDaysData: UpdatedData,
        vaccinationByAgeList: data.vaccination_by_age,
        vaccinationByGenderList: data.vaccination_by_gender,

        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  SuccessView = () => {
    const {
      lastSevenDaysData,
      vaccinationByGenderList,
      vaccinationByAgeList,
    } = this.state
    console.log(vaccinationByGenderList)
    console.log(vaccinationByAgeList)
    return (
      <>
        <div className="success-container1">
          <h1 className="vaccination-heading1">Vaccination Coverage</h1>
          <VaccinationCoverage
            lastSevenDaysVaccinationData={lastSevenDaysData}
          />
        </div>
        <div className="success-container1">
          <h1 className="vaccination-heading1">Vaccination by gender</h1>
          <VaccinationByGender
            VaccinationByGenderData={vaccinationByGenderList}
          />
        </div>
        <div className="success-container1">
          <h1 className="vaccination-heading1">Vaccination by age</h1>
          <VaccinationByAge vaccinationByAgeListData={vaccinationByAgeList} />
        </div>
      </>
    )
  }

  FailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  LoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderingViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.SuccessView()
      case apiConstants.failure:
        return this.FailureView()
      case apiConstants.inProgress:
        return this.LoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="over-all-container">
        <div className="cowin-container1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <p className="cowin-title">Co-WIN</p>
        </div>
        <h1 className="cowin-description">CoWin Vaccination in India</h1>
        {this.renderingViews()}
      </div>
    )
  }
}

export default CowinDashboard
