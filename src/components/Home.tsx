import React from "react";

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






const Home: React.FC = () => {

    return (
        <main style={container}>
            <header style={header}>
                <div>
                    <h1 style={title}>Malayalam Flash Cards</h1>
                    <p style={subtitle}>Practice vocabulary, review cards, and track your progress.</p>
                </div>
            </header>

            
        </main>
    );
};

export default Home;