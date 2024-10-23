import DateTimeInfo from "../Component/Layout/HeaderSection/DateTimeInfo";
import Title from "../Component/Layout/HeaderSection/Title";
import "../Style/Main.css";

import { ToggleMode} from "../Component/Layout/HeaderSection/ToggleMode";

function HeaderSection() {
    return (
        <header>
            <DateTimeInfo />
            <Title />
            <ToggleMode darkLabel="Dark Mode" lightLabel="Light Mode" />
        </header>
    );
}

export default HeaderSection;