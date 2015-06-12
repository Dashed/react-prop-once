# react-prop-once

> Higher-order component to cache props once on initial mount, and propagate them on every other render

Useful for resolving values (e.g. `props`) once after initial mount and re-using them as props on every render, rather than resolving them on every `render()` call. These resolved props are merged with every `nextProps`.

Internally, props are cached in `getInitialState()`. This practice is [considered an anti-Pattern](https://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html), but through this higher-order component, this is the intended behaviour.

## Usage

```
$ npm install --save react-prop-once
```

```js
const once = require('react-prop-once');

function assignPropsOnMount(props) {

    // called once on every mount
    // ...

    return {
        answer: 42
    };
}

function cleanOnUnmount(cached) {

    // called once on every unmount
    // optional clean up step
    // cached is object returned by assignPropsOnMount(...)
}

const WrappedComponent = once(Component, assignPropsOnMount, cleanOnUnmount);
```


## License

MIT
