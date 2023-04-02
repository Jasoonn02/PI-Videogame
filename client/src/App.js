import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import CreateVideogame from './components/CreateVideogame/CreateVideogame';
import Detail from './components/Detail/Detail';
import PageNotFound from './components/PageNotFound/PageNotFound';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/creategame" component={CreateVideogame} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
