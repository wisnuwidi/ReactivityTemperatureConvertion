import Info from "../Component/Layout/FooterSection/Info";
import Notification from "../Component/Layout/FooterSection/Notification";
import { BootstrapScripts } from "../Script/Main";

function FooterSection() {
    return (
        <>
            <footer>
                <Info />
            </footer>

            <BootstrapScripts />
        </>
    );
}

export default FooterSection;