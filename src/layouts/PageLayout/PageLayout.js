import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

let linkToName = [
  { link: "/", name: "Начальная страница" }, //HOME
  { link: "/counter", name: "Counter" },
  { link: "/about", name: "About" },
  { link: "/test", name: "Test" },
  { link: "/counter", name: "Counter" },
  { link: "/about", name: "About" },
]

export const PageLayout = ({ children }) => (
  <div className='container text-center'>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
      { linkToName.map((el, i) => TemplateNavigation(el, i)) }
      </ol>
    </nav>
    {/* <div className='page-layout__viewport'> */}
    <div className=''>
      {children}
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

const TemplateNavigation = (arr, i) => (
  <li key={i} className="breadcrumb-item">
    <Link to={arr.link} activeClassName='page-layout__nav-item--active'>{arr.name}</Link>
  </li>
)
TemplateNavigation.propTypes = {
  arr: PropTypes.object,
  i: PropTypes.number,
}

export default PageLayout
