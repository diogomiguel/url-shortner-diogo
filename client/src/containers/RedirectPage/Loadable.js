/**
  * Asynchronously loads the component for RedirectPage
  */
import Loadable from '../../routing/Loadable';

export default Loadable({
  loader: () => import('./index'),
});
