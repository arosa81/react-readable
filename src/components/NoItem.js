import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

function NoItem () {
  return (
    <div>
      <h4 className="alert alert-danger">
        <p>
          Hmmm, stale data is not good.
        </p>
        <Link className="alert-link" to={'/'}>
          Please click here to start the app with correct data
        </Link>
      </h4>
    </div>
  )
}

export default withRouter(NoItem);
