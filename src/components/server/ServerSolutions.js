import React, {Component} from 'react'
import styled from 'styled-components'
import blob from '../../images/Blob.svg'
import track from '../../utilities/track'

class ServerSolutions extends Component {
  track = (name) => () => {
    track(name, {
      source: 'Server Landing'
    })
  }
  render () {
    return (
      <Container>
        <div className={'grid'}>
          <div className='server-solutions-header'>
            <a id='server-solutions'>
              <h2>Solutions for Server Applications</h2>
            </a>
          </div>
          <a href='/server/login' onClick={this.track('Server Login Clicked')}>
            <div className='left block-item'>
              <div className='block-content'>
                <h4>Login</h4>
                <p>uPort provides a simple solution for your users to log in to your app and share private credentials, such as identity information and contact details.</p>
              </div>
              <h3>LEARN MORE</h3>
            </div>
          </a>
          <a href='/credentials/createverification' onClick={this.track('Verifications Part 1 Clicked')}>
            <div className='right block-item'>

              <div className='block-content'>
                <h4>Verifications</h4>
                <h5>Part 1</h5>
                <p>Create and issue verifications to your users.  They can store these verifications on their mobile device and use them with applications that request them.</p>
              </div>
              <h3>LEARN MORE</h3>
            </div>
          </a>
          <a href='/credentials/requestverification' onClick={this.track('Verifications Part 2 Clicked')}>
            <div className='left block-item'>
              <div className='block-content'>
                <h4>Verifications</h4>
                <h5>Part 2</h5>
                <p>Request and verify claims about your users to interact with their digital identity and add value to your application</p>
              </div>
              <h3>LEARN MORE</h3>
            </div>
          </a>
        </div>
      </Container>
    )
  }
}

export default ServerSolutions

const Container = styled.section`
  margin-top: 150px;
  margin-bottom: -150px;
  .grid {
    justify-content: center;
    margin: 0 20px;
  }
  .blob {
    display: none;
  }
  h2 {
    font-size: 32px;
    font-weight: bold;
    line-height: 40px;
  }
  h3 {
    color: #4C9EA6;
    text-align: right;
    margin: 0 40px 0 0;
  }
  h4 {
    font-size: 24px;
    line-height: 32px;
    margin: 0 0 25px;
    padding: 20px 0 0 0;
    a {
      text-decoration: none;
    }
  }
  h4, p {
    color: #3E3C49;
  }
  p {
    max-width: 93%;
  }
  .block-item {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(139, 139, 139, 0.25);
    display: grid;
    grid-template-rows: 1fr 80px;
    margin-bottom: 30px;
    position: relative;
  }
  .block-content  {
    padding: 20px;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  .nudge-right {
    padding-left: 13px;
  }

  @media screen and (min-width: 768px) {
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 30px 30px;
      margin: 0 10vw;
    }
    .server-solutions-header {
      grid-area: 1 / 1 / 2 / 3;
    }
    .block-item {
      margin: 0;
    }
    .block-item {
      height: 100%;
    }
    .blob {
      display: block;
      // position: absolute;
      padding: 40px 0 0 40px;
    }
    .block-content  {
      background: url(${blob}) 40px 40px no-repeat;
      padding: 0 40px 0 60px;
      top: 65px;
      z-index: 10;
    }
    h4 {
      padding: 75px 0 0 0;
    }
  }
`
