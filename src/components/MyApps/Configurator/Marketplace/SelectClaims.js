import React, { Component } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import CancelModal from '../CancelModal'
import Footer from '../Footer'
import { Container, Grid, Col, Spacer, medium } from '../../../../layouts/grid'

const requiredClaimTypeOptions = [
  { value: 'firstName', label: 'First Name' },
  { value: 'lastName', label: 'Last Name' },
  { value: 'dateOfBirth', label: 'Date of Birth' },
  { value: 'emailAddress', label: 'Email Address' },
  { value: 'phoneNumber', label: 'Phone Number' },
  { value: 'address', label: 'Address' }
]

const requiredIssuerOptions = [
  { value: 'any', label: 'Any Issuer' }
]

const issuedClaimTypeOptions = [
  { value: 'any', label: 'Any Issuer' }
]

function AddedRequiredClaims (props) {
  const requiredClaims = props.addedClaims
  const addedClaims = requiredClaims.map((requiredClaim, index) =>
    <Grid key={index}>
      <Col span={6}>
        <label htmlFor='claimType'>Claim Type</label>
        <Select
          id='claimType'
          className='networkDropdown'
          classNamePrefix='networkDropdown'
          value={requiredClaimTypeOptions.find(n => n.value === requiredClaim.claimType)}
          onChange={(e) => props.handleAddedRequiredClaimTypeUpdate(index, e)}
          options={requiredClaimTypeOptions}
          isSearchable={false}
          blurInputOnSelect
        />
        <Checkbox>
          <input
            type='checkbox'
            className='claimOptional'
            id={'claimOptional_' + index}
            value={``}
          />
          <label htmlFor={'claimOptional_' + index} />
          <span>This claim is optional</span>
        </Checkbox>
      </Col>
      <Col span={6}>
        <label htmlFor='issuedBy'>Issued By</label>
        <Select
          id='issuedBy'
          className='networkDropdown'
          classNamePrefix='networkDropdown'
          value={requiredIssuerOptions.find(n => n.value === requiredClaim.issuer)}
          onChange={props.handleAddedRequiredClaimIssuerUpdate}
          options={requiredIssuerOptions}
          isSearchable={false}
          blurInputOnSelect
        />
      </Col>
      <Spacer span={1} />
    </Grid>
  )
  return (
    <div>{addedClaims}</div>
  )
}

class SelectClaims extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cancelModal: false,
      requiredClaimType: null,
      requiredIssuer: null,
      optional: false,
      requiredClaims: [],
      issuedClaimType: null,
      selectedClaimTypeObj: null,
      selectedIssuerObj: null,
      selectedIssuedClaimTypeObj: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRequiredClaimTypeChange = this.handleRequiredClaimTypeChange.bind(this)
    this.handleRequiredIssuerChange = this.handleRequiredIssuerChange.bind(this)
    this.handleAddRequiredClaim = this.handleAddRequiredClaim.bind(this)
    this.handleAddedRequiredClaimUpdate = this.handleAddedRequiredClaimUpdate.bind(this)
    this.handleAddedRequiredClaimIssuerUpdate = this.handleAddedRequiredClaimIssuerUpdate.bind(this)
  }
  handleRequiredClaimTypeChange (selectedOption) {
    this.setState({
      requiredClaimType: selectedOption.value,
      selectedRequiredClaimTypeObj: selectedOption
    })
  }
  handleRequiredIssuerChange (selectedOption) {
    this.setState({
      requiredIssuer: selectedOption.value,
      selectedRequiredIssuerObj: selectedOption
    })
  }
  handleAddRequiredClaim (e) {
    if (e) e.preventDefault()
    let requiredClaims = this.state.requiredClaims
    requiredClaims.push({
      claimType: this.state.requiredClaimType,
      issuer: this.state.requiredIssuer,
      optional: this.state.optional
    })
    this.setState({requiredClaims: requiredClaims})
  }
  handleAddedRequiredClaimTypeUpdate (selectedOption, index) {
    console.log('handleAddedRequiredClaimTypeUpdate')
    console.log(selectedOption)
    console.log(index)
  }
  handleAddedRequiredClaimIssuerUpdate (index, selectedOption) {
    console.log(requiredClaims[index])
  }
  handleAddedRequiredClaimUpdate (selectedOption) {
    console.log('handleAddedRequiredClaimUpdate')
  }
  handleSubmit (e) {
    this.props.getChildState('claims', {thing: 'thingName'})
  }
  render () {
    const { cancelModal, requiredClaims } = this.state
    return (
      <Wrapper>
        <section className={`${cancelModal ? 'blurred' : ''}`}>
          <Container>
            <Grid>
              <Spacer span={1} />
              <Col span={10}>
                <header>
                  <Grid>
                    <Col span={8}>
                      <h2>Select Claims</h2>
                    </Col>
                    <Col span={4}>
                      <button className='btn-cancel' onClick={this.showCancelModal}>Cancel</button>
                    </Col>
                  </Grid>
                </header>
                <div className='module'>
                  <Grid>
                    <Spacer span={1} />
                    <Col span={10}>
                      <h2>Claims your service requires</h2>
                      <p>Information that you want to request from users in order to let them use your service. Select Issuer to specify who this information should be verified by.</p>
                      <form>
                        <AddedRequiredClaims
                          addedClaims={requiredClaims}
                          handleAddedRequiredClaimTypeUpdate={this.handleAddedRequiredClaimTypeUpdate}
                          handleAddedRequiredClaimIssuerUpdate={this.handleAddedRequiredClaimIssuerUpdate}
                        />
                        <Grid>
                          <Col span={6}>
                            <label htmlFor='claimType'>Claim Type</label>
                            <Select
                              id='claimType'
                              className='networkDropdown'
                              classNamePrefix='networkDropdown'
                              value={this.state.selectedRequiredClaimTypeObj}
                              onChange={this.handleRequiredClaimTypeChange}
                              options={requiredClaimTypeOptions}
                              isSearchable={false}
                              blurInputOnSelect
                            />
                            <Checkbox>
                              <input
                                type='checkbox'
                                className='claimOptional'
                                id='global'
                                value={``}
                                ref={r => this.txtServiceName=r}
                              />
                              <label htmlFor='claimOptional' />
                              <span>This claim is optional</span>
                            </Checkbox>
                          </Col>
                          <Col span={6}>
                            <label htmlFor='issuedBy'>Issued By</label>
                            <Select
                              id='issuedBy'
                              className='networkDropdown'
                              classNamePrefix='networkDropdown'
                              value={this.state.selectedRequiredIssuerObj}
                              onChange={this.handleRequiredIssuerChange}
                              options={requiredIssuerOptions}
                              isSearchable={false}
                              blurInputOnSelect
                            />
                          </Col>
                          <Col span={12}>
                            <AddClaim onClick={this.handleAddRequiredClaim}>+ Add Claim</AddClaim>
                          </Col>
                        </Grid>
                        <h2>Claims your service issues</h2>
                        <p>Verified information about your users they receive while using your services</p>
                        <Grid>
                          <Col span={6}>
                            <label htmlFor='issuedClaimType'>ClaimType</label>
                            <Select
                              id='issuedClaimType'
                              className='networkDropdown'
                              classNamePrefix='networkDropdown'
                              value={this.state.selectedIssuedClaimTypeObj}
                              onChange={this.handleIssuerChange}
                              options={issuedClaimTypeOptions}
                              isSearchable={false}
                              blurInputOnSelect
                            />
                          </Col>
                        </Grid>
                        <Grid>
                          <Col span={12}>
                            <AddClaim>+ Add Claim</AddClaim>
                          </Col>
                        </Grid>
                      </form>
                    </Col>
                  </Grid>
                </div>
              </Col>
            </Grid>
          </Container>
        </section>
        <CancelModal show={cancelModal} onClose={this.hideCancelModal} />
        <Footer
          Prev={() => (<div>
          SERVICE DETAILS
            <p>
              stuff
            </p>
          </div>)}
          Next={() => <span>SELECT CLAIMS</span>}
          nextEnabled={true}
          onNext={this.handleSubmit}
          onPrev={this.props.previousStep} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  section {
    padding-bottom: 80px;
  }
`
const Checkbox = styled.div`
  label {
    display: inline;
  }
  .claimOptional {
    display: none;
  }
  .claimOptional + label {
    background-color: #fafafa;
    border: 1px solid #cacece;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
    padding: 15px;
    border-radius: 3px;
    display: inline-block;
    position: relative;
  }
  .claimOptional + label:active, .claimOptional:checked + label:active {
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1);
  }
  .claimOptional:checked + label {
    background-color: #e9ecee;
    border: 1px solid #adb8c0;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);
    color: #99a1a7;
  }
  .claimOptional:checked + label:after {
    content: 'x';
    font-size: 16px;
    position: absolute;
    top: 6px;
    left: 10px;
    color: #99a1a7;
  }
  span {
    position:absolute;
    margin-top: 7px;
    margin-left: 10px;
    font-size: 16px;
    color: #3f3d4b;
  }
`

const AddClaim = styled.button`
  background-color: #fff;
  border: solid 2px #5c50ca;
  border-radius: 4px;
  display: block;
  padding: 20px;
  margin: 0 0 10px 0;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
  font-weight: bold;
  color: #5c50ca;
  ${medium(`
    display: inline-block;
  `)}
`

export default SelectClaims
