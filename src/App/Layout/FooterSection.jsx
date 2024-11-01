import Info from "../Component/Layout/FooterSection/Info";
import Notification from "../Component/Layout/FooterSection/Notification";
import { BootstrapScripts, JSPDFScript } from "../Script/Main";

function FooterSection() {
    return (
        <>
            <footer>
                <Info />
            </footer>

            <BootstrapScripts />
            <JSPDFScript />
        </>
    );
}

export default FooterSection;