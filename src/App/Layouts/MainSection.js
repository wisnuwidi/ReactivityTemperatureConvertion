import Calculation from "../Components/Calculation";
import Convertions from "../Components/Convertions";
import ActionButtons from "../Components/ActionButtons";

function MainSection() {
    return (
        <main>
            <Calculation />
            <Convertions />
            <ActionButtons />
        </main>
    );
}

export default MainSection;