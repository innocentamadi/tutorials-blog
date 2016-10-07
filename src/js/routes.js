import React from 'react'; // eslint-disable-line no-unused-vars
import { Router, Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/Index';
import AboutPage from './components/about/Index';
import ProfilePage from './components/profile/Index';
import Tutorials from './components/tutorials/list/Index';
import Tutorial from './components/tutorials/tutorial/Index';
import Chapters from './components/chapters/list/Index';
import Chapter from './components/chapters/chapter/Index';
import Pages from './components/pages/list/Index';
import Page from './components/pages/page/Index';
import LoginPage from './components/login/Index';
import FacebookLogin from './components/login/Facebook';
import PhoneLogin from './components/login/PhoneNumber';
import EmailLogin from './components/login/Email';

export default (
  <Route>
    <Route path="/login" component={LoginPage}>
      <Route path="login/facebook" component={FacebookLogin} />
      <Route path="login/phone-number" component={PhoneLogin} />
      <Route path="login/email" component={EmailLogin} />
    </Route>

    <Route path="/" component={App} >
      <IndexRoute component={HomePage} />

      <Route path="/tutorials">
        <IndexRoute component={Tutorials} />

        <Route path="/tutorials/new" component={Tutorial} />

        <Route path="/tutorials/:tutorialId" component={Tutorial} >

          <Route path="/tutorials/:tutorialId/chapters" >
            <IndexRoute component={Chapters} />

            <Route
              path="/tutorials/:tutorialId/chapters/:chapterId" 
              component={Chapter} >

              <Route path="/tutorials/:tutorialId/chapters/:chapterId/pages" >
                <IndexRoute component={Pages} />

                <Route
                  path="/tutorials/:tutorialId/chapters/:chapterId/pages/:pageId" 
                  component={Page} />
              </Route>

            </Route>
          </Route>

        </Route>
      </Route>

      <Route path="about" component={AboutPage} />
      <Route path="profile" component={ProfilePage} />
    </Route>
  </Route>
);
