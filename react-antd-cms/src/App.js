import './App.css';

import { HkLayout } from '@/components';
import { HashRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '@/store'

function App() {
  return (
    <HashRouter>
    {/* redux这里属性名好像只能写store，报错信息里面useEffect的中括号里面是store */}
      <Provider store = {store}>
        <div className="App">
          <HkLayout/>
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
