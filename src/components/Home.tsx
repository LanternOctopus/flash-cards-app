import React from "react";
import { Link } from "react-router-dom";
import { Track } from "../components/Track";
const cardStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem",
    margin: "1rem",
    borderRadius: "12px",
    background: "white",
    color: "#333",
    textDecoration: "none",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    minWidth: "180px",
    minHeight: "120px",
    textAlign: "center" as const,
};

const cardHoverStyle = {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 12px rgba(0,0,0,0.2)",
    background: "#f0f8ff",
};

const Home: React.FC = () => {
    return (
        <>
            <main
                style={{
                    padding: "3rem",
                    fontFamily: "sans-serif",
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "2rem",
                    }}
                >
                    Welcome to Ananda English! 🎉
                </h1>
                <section style={{ marginBottom: "2rem" }}>
                    <h2>Dalit History Month ✊📖</h2>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        <Card
                            to="/dalit-history-month/gabbilamu"
                            icon="🪶"
                        >
                            Gabbilam Reading Comprehension
                        </Card>
                        <Card
                            to="/dalit-history-month/leather"
                            icon="👢"
                        >
                            Leather Visual Novel
                        </Card>
                    </div>
                </section>
                <section style={{ marginBottom: "2rem" }}>
                    <h2>
                        Sentence & Grammar Activities 📚
                    </h2>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        <Card
                            to="/sentenceactivities"
                            icon="📝"
                        >
                            Sentence Activities
                        </Card>
                        <Card to="/partsofspeech" icon="📖">
                            Parts Of Speech
                        </Card>
                    </div>
                </section>

                <section style={{ marginBottom: "2rem" }}>
                    <h2>Games & Interactive Fun 🎮</h2>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        <Card to="/scrambler" icon="🕹️">
                            Scrambler
                        </Card>
                        <Card
                            to="/picturematchinggame"
                            icon="🖼️"
                        >
                            Picture Matching
                        </Card>
                        <Card to="/flashcards" icon="📇">
                            Flash Cards
                        </Card>
                    </div>
                </section>

                <section style={{ marginBottom: "2rem" }}>
                    <h2>Reading & Pronunciation 📖</h2>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        <Card
                            to="/readoutloud/whimsicalcontractions"
                            icon="🎤"
                        >
                            Whimsical Contractions
                        </Card>
                        <Card
                            to="/readoutloud/adognamedchai"
                            icon="🎤"
                        >
                            A Dog Named Chai
                        </Card>
                        <Card
                            to="/readoutloud/learningcanchangeus"
                            icon="🎤"
                        >
                            Learning Can Change Us
                        </Card>
                        <Card
                            to="/readoutloud/thebusydayoflittlesteps"
                            icon="🎤"
                        >
                            Busy Day of Little Steps
                        </Card>
                        <Card
                            to="/readoutloud/wordsthattravel"
                            icon="🎤"
                        >
                            Words That Travel
                        </Card>
                        <Card
                            to="/readoutloud/wordsyoucandoatyourdesk"
                            icon="🎤"
                        >
                            Words You Can Do at Desk
                        </Card>
                        <Card
                            to="/readoutloud/whatmybodycando"
                            icon="🎤"
                        >
                            What My Body Can Do
                        </Card>
                    </div>
                </section>

                <section>
                    <h2>Alphabet Games 🌏</h2>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        <Card
                            to="/letter/alphabet"
                            icon="🔤"
                        >
                            Learn the Alphabet
                        </Card>
                        <Card to="/handwriting" icon="✍️">
                            Handwriting
                        </Card>
                    </div>
                </section>
            </main>
        </>
    );
};

interface CardProps {
    to: string;
    icon: string;
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
    to,
    icon,
    children,
}) => {
    const [hover, setHover] = React.useState(false);
    return (
        <Link
            to={to}
            style={{
                ...cardStyle,
                ...(hover ? cardHoverStyle : {}),
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <span style={{ fontSize: "2rem" }}>{icon}</span>
            <span
                style={{
                    marginTop: "0.5rem",
                    fontWeight: "bold",
                }}
            >
                {children}
            </span>
        </Link>
    );
};

export default Home;
