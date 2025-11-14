import React from "react";
import { Link, useNavigate } from "react-router-dom";

const container: React.CSSProperties = {
    maxWidth: 960,
    margin: "2rem auto",
    padding: "1rem",
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    color: "#222",
};

const header: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    marginBottom: "1.25rem",
};

const title: React.CSSProperties = { margin: 0, fontSize: "1.75rem" };

const subtitle: React.CSSProperties = { margin: 0, color: "#555", fontSize: "0.95rem" };

const grid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "0.75rem",
    marginTop: "1rem",
};

const cardBase: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    borderRadius: 8,
    background: "#f8fafc",
    textDecoration: "none",
    color: "#111",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    minHeight: 96,
    justifyContent: "center",
    alignItems: "flex-start",
};

const buttonStyle: React.CSSProperties = {
    ...cardBase,
    cursor: "pointer",
    border: "none",
    background: "#0366d6",
    color: "white",
    textAlign: "center",
};

const small: React.CSSProperties = { fontSize: "0.85rem", color: "#444" };

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <main style={container}>
            <header style={header}>
                <div>
                    <h1 style={title}>Malayalam Flash Cards</h1>
                    <p style={subtitle}>Practice vocabulary, review cards, and track your progress.</p>
                </div>
            </header>

            <section aria-label="Primary actions">
                <div style={grid}>
                    {/* <Link to="/cards" style={cardBase} aria-label="Browse flash cards">
                        <strong>Browse Cards</strong>
                        <span style={small}>View all cards and decks</span>
                    </Link>

                    <Link to="/create" style={cardBase} aria-label="Create new card">
                        <strong>Create Card</strong>
                        <span style={small}>Add new vocabulary or phrases</span>
                    </Link>

                    <Link to="/about" style={cardBase} aria-label="About this app">
                        <strong>About</strong>
                        <span style={small}>App info and credits</span>
                    </Link> */}
                </div>
            </section>
        </main>
    );
};

export default Home;