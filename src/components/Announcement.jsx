import React, {Component} from 'react'
import AutoLinkText from 'react-autolink-text2'
import styled from 'styled-components'

import { medium } from '../layouts/grid';

class Announcement extends Component {
  constructor() {
    super()
    this.state = {
      expanded: false,
      visible: true
    }
  }
  componentDidMount() {
    if(this.container)
      this.init()
  }
  componentDidUpdate() {
    if(this.container && !this.containerHeight)
      this.init()
  }
  init = () => {
    // calculate and save height
    const bounds = this.container.getBoundingClientRect()
    this.containerHeight = bounds.bottom - bounds.top
    // slide down
    setTimeout(() => {
      this.setState({ expanded: true })
    }, 1000)
  }
  dismiss = () => {
    this.setState({ expanded: false })
    setTimeout(() => {
      this.setState({ visible: false })
    }, 200)
  }
  render () {
    const { data={}, type } = this.props
    const { visible, expanded } = this.state
    const { announcement } = data;
    const messages = []
    if (announcement) {
      announcement.edges.forEach((a, idx) => {
        messages.push({
          content: (<h3 key={idx}>
            <AutoLinkText
              text={`${a.node.frontmatter.announcement}`}
              linkProps={{target: '_blank'}} />
          </h3>),
          type: a.node.frontmatter.announcementType
        })
      })
    }
    return visible && messages.length ? <Container
        ref={r => this.container = r}
        expanded={expanded}
        type={messages[messages.length-1].type}
        _height={this.containerHeight}
      >
        <div>{messages[messages.length-1].content}</div>
        <Dismiss onClick={this.dismiss}>&times;</Dismiss>
      </Container> : null
  }
}

export default Announcement

const theme = {
  'positive': `
    background-color: #e1ebe7;
    border-color: #3cba7f;
    color: #3cba7f;
  `,
  'negative': `
    background-color: #fbedf0;
    border-color: #d63a59;
    color: #d63a59;
  `
}

const Container = styled.aside`
  align-self: start;
  display: grid;
  grid-template-columns: 1fr 50px;
  margin-top: -60px;
  overflow: hidden;
  position: static;
  text-align: center;
  transition: margin-top 0.2s, visibility 0.5s;
  visibility: hidden;
  width: 100vw;
  z-index: 1;

  ${props => props.expanded
    ? `
      margin-top: 0;
      visibility: visible;
    `
    : ''}
  ${props => props._height
    ? `
      ${medium(`
        margin-bottom: ${props._height}px;
      `)}
    ` : medium("margin-bottom: 60px;")}
  ${props => theme[props.type] || theme.positive}

  h3 {
    padding: 0 10px;
  }
`

const Dismiss = styled.button`
  background-color: transparent;
  font-size: 1.5em;
`
