var ReactStyle = require('react-style');

var Branding = require('./branding');

var baseStyles = ReactStyle({
  display: 'inline-block',
  border: 0,
  borderRadius: 3,
  marginBottom: 0,
  padding: '0 1.5em',
  height: '3em',
  lineHeight: '3em',
  fontSize: '.3em',
  textAlign: 'center',
  color: 'white',
  backgroundColor: 'grey',
  whiteSpace: 'nowrap',
  userSelect: 'none',
});

var keyMirror = require('react/lib/keyMirror');

var varieties = keyMirror({
  NORMAL: null,
  PRIMARY: null,
  CANCEL: null,
});

var colors = {};

colors[varieties.NORMAL] = 'blue';
colors[varieties.PRIMARY] = 'green';
colors[varieties.CANCEL] = 'red';

var React = require('react');

var Button = React.createClass({

  propTypes: {
    variety: React.PropTypes.oneOf(Object.keys(varieties))
  },

  statics: {
    variety: varieties
  },

  getDefaultProps() {
    return {
      variety: varieties.NORMAL
    };
  },

  getColor() {
    return colors[this.props.variety];
  },

  render() {
    var varietyStyles = ReactStyle({
      backgroundColor: this.getColor()
    });

    return <button styles={[baseStyles, varietyStyles]} {... this.props}>{this.props.children}</button>;
  },
});

module.exports = Button;
