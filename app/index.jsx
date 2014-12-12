/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var log = require('bows')('App');
var ReactStyle = require('react-style');
var App = React.createClass({
  render() {
    return (
      <div className="App">
        <h1>TEH NEW APP</h1>
        <Router.Link to="someview">GO TO SOMEVIEW</Router.Link>
        <br />
        <Router.Link to="/">GO TO HOME</Router.Link>
        <Router.RouteHandler {...this.props}/>
      </div>
    );
  }
});

var SomeView = React.createClass({
  render() {
    return (
      <div>
        Some view
      </div>
    );
  }
});

var Button = require('./components/button');

var DefaultView = React.createClass({
  render() {
    return (
      <div>
        Default View
        <Button variety={Button.variety.PRIMARY}>LOL</Button>
      </div>
    );
  }
});

var routes = (
  <Router.Route name="app" path="/" handler={App}>
    <Router.DefaultRoute handler={DefaultView}/>
    <Router.Route name="someview" path="/something" handler={SomeView}/>

  </Router.Route>
);

ReactStyle.inject();

Router.run(routes, (Handler, state) => {
  log('route change', state);

  // store logic here if required

  React.render(<Handler/>, document.body);
});
