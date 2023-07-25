import './App.css';
import Users from './components/Users';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Users />
      </Provider>
    </div>
  );
}

export default App;
