import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Link from 'gatsby-link'
import SEO from '../../../../components/SEO/SEO'
import SiteHeader from '../../../../components/Layout/Header'
import SiteFooter from '../../../../components/Layout/Footer'
import ServerVerificationResources from '../../../../components/server/verification/ServerVerificationResources'
import ServerVerificationValueProp from '../../../../components/server/verification/ServerVerificationValueProp'
import config from '../../../../../data/SiteConfig'
import AutoLinkText from 'react-autolink-text2'

class ServerVerification extends React.Component {
  render () {
    const postEdges = this.props.data.allMarkdownRemark.edges
    return (
      <IndexContainer>
        <Helmet title={config.siteTitle} />
        <SEO postEdges={postEdges} />
        <main>
          <IndexHeadContainer>
            <SiteHeader
              activeCategory={''}
              location={this.props.location}
              categories={this.props.data.navCategories} />
          </IndexHeadContainer>
          <div className='cta-wrapper'>
            <div className='cta'>
              <h4>SERVER APPS</h4>
              <h1>Verification</h1>
              <p>
                A simple Credential Verification Solution for Your Server-side dApp
              </p>
              <Link to='/credentials/verification'>
                <div className='cta-button'>
                  GET STARTED
                </div>
              </Link>
            </div>
          </div>
          <BodyContainer className={`body-container`}>
            <ServerVerificationValueProp />
            <ServerVerificationResources />
          </BodyContainer>
          <FooterContainer>
            <SiteFooter />
          </FooterContainer>
        </main>
      </IndexContainer>
    );
  }
}

export default ServerVerification
const IndexContainer = styled.div`
a {
  text-decoration: none;
}
.cta {
  margin: 109px auto 90px; auto;
  height: 320px;
  width: 589px;
  text-align: center;
}
.cta-button {
  height: 60px;
  width: 260px;
  margin: 31px auto 0 auto;
  background: #4C9EA6;
  border: none;
  color: #FFFFFF;
  font-style: normal;
  font-weight: 800;
  line-height: 58px;
  font-size: 16px;
  text-align: center;
  border-radius: 4px;
}
h1 {
  color: #3E3C49;
  font-size: 48px;
  line-height: 72px;
  font-weight: 800;
  margin: unset;
  margin: initial;
}
h4 {
  font-style: normal;
  font-weight: 800;
  line-height: 24px;
  font-size: 18px;
  color: #4C9EA6;
  padding-bottom: 9px;
  margin: unset;
  margin: initial;
}
p {
  color: #504F5C;
  font-size: 24px;
  line-height: 36px;
  font-weight: normal;
  font-style: normal;
}
`

const IndexHeadContainer = styled.div`
background: ${props => props.theme.brand};
`

const BodyContainer = styled.div`
  background-color: #F9F9FA;
  margin: 0 auto;
`

const FooterContainer = styled.footer`
  background-color: #6c59cf;
  clear: all;
`

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query RequestVerificationQuery {
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { type: { ne: null }}}
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
          }
        }
      }
    }
    navCategories:
    allMarkdownRemark(
      filter: { frontmatter: { category: { ne: null }, index: { ne: null }}}
    ) {
      edges {
        node {
          fields {
            slug
          }
          headings {
            value
            depth
          }
          frontmatter {
            category
            index
          }
        }
      }
    }
    announcement: allMarkdownRemark(
      filter: { frontmatter: { announcement: { ne: null } } }) {
        totalCount
        edges {
          node {
            frontmatter {
              announcement
            }
          }
        }
      }
  }
`;
