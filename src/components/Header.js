import logo from '../assets/Logo.svg';
import { Link } from 'react-router-dom';
const Header = () => {
    return(
        <div className='header row'>
            <Link to='/'>
                <div className='logoWrap bgBlue'>
                    <img src={ logo } alt='Logo' className='logo'/>
                </div>
            </Link>
            <span className='logoText'>Reel Cinema</span>
        </div>
    );
}

export default Header;