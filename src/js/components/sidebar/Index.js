import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper left-sidebar">
        <div className="left-sidebar-content">
          <div className="author-wrapper">
            By:
            <span className="author-name">Aliko Dangote</span>
          </div>
          <ul className="sidebar-elements">
            <li className="divider">Content</li>
            <li className="tutorial">
              <Link to="/tutorials/1" activeClassName="active">
                Getting to know ReactJS
              </Link>
              <ul className="chapters">
                <li>
                  <Link 
                    to="/tutorials/1/chapters/2"
                    activeClassName="active">
                    What is ReactJs?
                  </Link>
                  <ul className="pages">
                    <li>
                      <Link
                        to="/tutorials/1/chapters/2/pages/1"
                        activeClassName="active">
                        Introductory Vocabulary
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/tutorials/1/chapters/2">
                    How does it affect RelayJs?
                  </Link>
                </li>
                <li>
                  <Link to="/tutorials/1/chapters/2">
                    Who Relay epp?
                  </Link>
                </li>
                <li>
                  <Link to="/tutorials/1/chapters/2">
                    Wetin Relay epp do?
                  </Link>
                </li>
              </ul>
            </li>
            <li className="tutorial">
              <Link to="/tutorials/2" activeClassName="active">
                Props and State
              </Link>
              <ul className="chapters">
                <li>
                  <Link to="/tutorials/2/chapters/2">
                    What is ReactJs?
                  </Link>
                </li>
                <li>
                  <Link to="/tutorials/2/chapters/2">
                    How does it affect RelayJs?
                  </Link>
                </li>
                <li>
                  <Link to="/tutorials/2/chapters/2">
                    Who Relay epp?
                  </Link>
                </li>
                <li>
                  <Link to="/tutorials/2/chapters/2">
                    Wetin Relay epp do?
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
};

export default Sidebar;
