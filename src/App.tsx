import { Provider } from 'react-redux';
import Cart from './components/Cart';
import Catalog from './components/Catalog';

import store from './store';

function App() {

  return (
    <Provider store={store}>
      <h1>
        <Catalog />
        <Cart />
      </h1>
    </Provider>
  );
}

export default App;
