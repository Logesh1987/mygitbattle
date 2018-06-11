var React = require('react');
var Popular = require('./Popular');
var Home = require('./Home');
var Battle = require('./Battle');
var Nav = require('./nav');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className='container'>
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/popular" component={Popular} />
                        <Route exact path="/battle" component={Battle} />
                        <Route render={function() {
                            return <p className="o4o4">PAGE NOT FOUND</p>
                        }} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

module.exports = App;