import TinyFooter from "../TinyFooter";
import "@picocss/pico/css/pico.lime.min.css";
import "./regularsite.scss";

export default function RegularSite({ children }: any) {
    return (
        <div className="regularsite">
            {children}
            <TinyFooter />
        </div>
    );
}
