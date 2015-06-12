const React = require('react');

const DEFAULT_ASSIGN = function() {
    return {};
};

module.exports = function once(Component = null, assignPropsOnMount = DEFAULT_ASSIGN, cleanOnUnmount = DEFAULT_ASSIGN) {

    const ComponentDisplayName = Component && Component.displayName || 'null';

    const OnceContainer = React.createClass({

        displayName: ComponentDisplayName + '.OnceContainer',

        getInitialState() {
            return {
                cached: assignPropsOnMount.call(null, this.props) || {}
            };
        },

        componentWillUnmount() {
            cleanOnUnmount.call(null, this.state.cached);
        },

        render() {
            return (Component === null ? null : <Component {...this.props} {...this.state.cached} />);
        }
    });

    return OnceContainer;
};
