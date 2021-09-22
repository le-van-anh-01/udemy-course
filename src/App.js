import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TodoFeature from './features/Todo';
import AlbumFeature from './features/Album';
import { useEffect } from 'react';
import productApi from './api/productApi';
import CounterFeature from './features/Counter';
import Header from './components/Header';
import ProductFeature from 'features/Products/index';
import CartFeature from 'features/Cart';
// import moduleName from 'react-rou'

function App() {
    useEffect(() => {
        const fetchProducts = async () => {
            const productList = await productApi.getAll({});
            console.log(productList);
        }

        fetchProducts();
        return;
    }, [])




    return (
        <Router>
            <Header />
            <Switch>
                <Route path='/' exact component={CounterFeature} />
                <Route path='/todos' component={TodoFeature} />
                <Route path='/album' component={AlbumFeature} />
                <Route path='/products' component={ProductFeature} />
                <Route path='/cart' component={CartFeature} />
            </Switch>
        </Router>
    );
}

export default App;
