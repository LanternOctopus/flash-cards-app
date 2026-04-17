import { Link } from "react-router-dom";

export default function TinyFooter() {
    return (
        <footer
            className="footer floating"
            style={{
                backgroundColor:
                    "rgba(255, 255, 255, 0.68)",
                color: "#000",
                position: "absolute",
                bottom: ".5em",
                left: "1em",
                padding: "0.5em",
                borderRadius: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                border: " 1px solid #ccc",
            }}
        >
            <Link to="/" className="">
                <img
                    style={{ height: "2em", width: "2em" }}
                    src={`${process.env.PUBLIC_URL}/images/homebutton.svg`}
                    alt="HomePage"
                />
            </Link>
        </footer>
    );
}
