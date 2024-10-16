import '../../App/Style/Main.css';
import Clock from '../Components/Clock';
import ToggleMode from '../Components/ToggleMode';

function Header() { 
    return (
        <header>
            <Clock />
            <h1>Konversi Suhu</h1>
            <ToggleMode />
        </header>
    );
}

export default Header;