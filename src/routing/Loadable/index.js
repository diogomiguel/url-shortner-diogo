import React from 'react';
import ReactLoadable from 'react-loadable';
import PropTypes from 'prop-types';

import { getAsyncInjectors } from '../../utils/asyncInjectors';

const Loadable = ({ loader, loading: CustomLoadingComponent, ...rest }) =>
  class InnerLoadable extends React.Component {
    static contextTypes = {
      store: PropTypes.object,
      defaultLoadingComponent: PropTypes.any,
    };

    loaderWithAsyncInjectors = () => {
      if (loader) {
        return loader(getAsyncInjectors(this.context.store))
          .then((component) => component.default ? component.default : component);
      }
      return Promise.resolve(null);
    };

    emptyLoadingComponent = () => null;

    loadableComponent = ReactLoadable({
      ...rest,
      loader: this.loaderWithAsyncInjectors,
      loading: CustomLoadingComponent || this.context.defaultLoadingComponent || this.emptyLoadingComponent,
    });

    render() {
      return <this.loadableComponent {...this.props} />;
    }
  };

export default Loadable;
