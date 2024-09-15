import HomePage from '../../features/home/HomePage';
import './index.css';
import NavBar from './navbar';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
    const location = useLocation();

    return location.pathname === "/" ?
            <HomePage></HomePage> :
            <>
                <NavBar />
                <Outlet />
            </>;
}

export default App;
