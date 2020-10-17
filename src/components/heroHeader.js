import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
export default () => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            home {
              title
              description
            }
          }
        }
      }
    `}
    render={data => (
      <div className="hero-header">
        <div className="headline">{data.site.siteMetadata.home.title}</div>
        <div 
          className="primary-content" 
        >
          I'm from Lagos, Nigeria. There, I work as a Full-Stack .NET Developer at VerticaDev (software firm).  <br/>
          I've {new Date().getFullYear() - 2016} years of experience as a Software Developer, with a focus on developing Web & Mobile Apps.   <br/>  <br/>
          Currently, I'm part of the team that develops <a href="https://learnflo.co.uk">LearnFlo</a>, a Learning Management System that helps training providers deliver their courses effectively to their students.  <br/>
        </div>
        <Link to='/contact' className="button -primary">Get in touch &rarr;</Link>
      </div>
    )}
  />
)