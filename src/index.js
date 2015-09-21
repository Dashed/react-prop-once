const React = require('react');
const Assign = require('lodash.assign');

const DEFAULT_ASSIGN = function() {
    return {};
};

module.exports = function once(Component = null, onceSpec) {

    const ComponentDisplayName = Component && Component.displayName || 'null';

    const assignPropsOnMount = onceSpec.assignPropsOnMount ||  DEFAULT_ASSIGN;
    const cleanOnUnmount = onceSpec.cleanOnUnmount || DEFAULT_ASSIGN;

    const Overrides = {

        displayName: ComponentDisplayName + '.OnceContainer',

        getInitialState() {
            return {
                cached: assignPropsOnMount.call(null, this.props, this.context) || {}
            };
        },

        componentWillUnmount() {
            cleanOnUnmount.call(null, this.state.cached, this.props, this.context);
        },

        render() {
            return (Component === null ? null : <Component {...this.props} {...this.state.cached} />);
        }
    };

    const OnceContainer = React.createClass(Assign({}, onceSpec, Overrides));
    return OnceContainer;
};
