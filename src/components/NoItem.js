import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

function NoItem () {
  return (
    <div>
      <h1> Page Not Found </h1>
      <h3> 404 ERROR </h3>
      <p>Invalid page</p>
      <p className="alert alert-info">
        <Link className="alert-link"to='/'>Please click here to start the app with correct data</Link>
      </p>
    </div>
  )
}

export default withRouter(NoItem);
