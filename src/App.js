import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodoFeature from './features/Todo';
import AlbumFeature from './features/Album';
import { useEffect } from 'react';
import productApi from './api/productApi';
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
            Home Page
            <Route path='/todos'
                component={TodoFeature}
            />
            <Route path='/album'
                component={AlbumFeature}
            />
            Footer
        </Router>
    );
}

export default App;
