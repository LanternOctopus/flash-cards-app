import { Link } from "react-router-dom";

export function SentenceSessions() {
    return (
        <main className="container">
            <article
                style={{
                    display: "block",
                    textAlign: "left",
                }}
            >
                <header>
                    <h1>Session 1</h1>
                </header>
                <section>
                    <h3>Adjectives</h3>
                    <ul>
                        <li>
                            <Link to="/sentence/session1/adjectives/mcq">
                                Adjectives Multiple Choice
                                Questions
                            </Link>
                        </li>
                        <li>
                            <Link to="/sentence/session1/adjectives/mcq-opposites">
                                Adjectives Multiple Choice
                                Questions - Opposites
                            </Link>
                        </li>
                        <li>
                            <Link to="/sentence/session1/adjectives/partsofspeech">
                                Identify Adjectives in a
                                sentence
                            </Link>
                        </li>
                        <li>
                            <Link to="/sentence/session1/adjectives/reading">
                                Pratice reading Adjectives
                                aloud
                            </Link>
                        </li>
                    </ul>
                </section>
                <section>
                    <h3>Adverbs</h3>
                    <ul>
                        <li>
                            <Link to="/sentence/session1/adverbs/mcq">
                                Adverbs Multiple Choice
                                Questions
                            </Link>
                        </li>
                        <li>
                            <Link to="/sentence/session1/adverbs/mcq-opposites">
                                Adverbs Multiple Choice
                                Questions - Opposites
                            </Link>
                        </li>
                        <li>
                            <Link to="/sentence/session1/adverbs/partsofspeech">
                                Identify Adverbs in a
                                sentence
                            </Link>
                        </li>
                        <li>
                            <Link to="/sentence/session1/adverbs/reading">
                                Pratice reading Adverbs
                                aloud
                            </Link>
                        </li>
                    </ul>
                </section>
                <section>
                    <h3>Nouns</h3>
                    <ul>
                        <li>
                            <Link to="/sentence/session1/nouns/mcq">
                                Nouns Multiple Choice
                                Questions
                            </Link>
                        </li>
                        <li>
                            <Link to="/sentence/session1/nouns/partsofspeech">
                                Identify Nouns in a sentence
                            </Link>
                        </li>
                        <li>
                            <Link to="/sentence/session1/nouns/reading">
                                Pratice reading Nouns aloud
                            </Link>
                        </li>
                    </ul>
                </section>
                <section>
                    <h3>Prepositions</h3>
                    <ul>
                        <li>
                            <Link to="/sentence/session1/prepositions/partsofspeech">
                                Identify Prepositions in a
                                sentence
                            </Link>
                        </li>
                        <li>
                            <Link to="/sentence/session1/prepositions/picturematching">
                                Match Prepositions to
                                Pictures
                            </Link>
                        </li>
                    </ul>
                </section>
                <section>
                    <h3>Pronouns</h3>
                    <ul>
                        <li>
                            <Link to="/sentence/session1/pronouns/partsofspeech">
                                Identify Pronouns in a
                                sentence
                            </Link>
                        </li>
                        <li>
                            <Link to="/sentence/session1/pronouns/reading">
                                Pratice reading Pronouns
                                aloud
                            </Link>
                        </li>
                    </ul>
                </section>
                <section>
                    <h3>Verbs</h3>
                    <ul>
                        <li>
                            <Link to="/sentence/session1/verbs/partsofspeech">
                                Identify Verbs in a sentence
                            </Link>
                        </li>
                        <li>
                            <Link to="/sentence/session1/verbs/reading">
                                Pratice reading Verbs aloud
                            </Link>
                        </li>
                        <li>
                            <Link to="/sentence/session1/verbs/mcq">
                                Verbs Multiple Choice
                                Questions
                            </Link>
                        </li>
                        <li>
                            <Link to="/sentence/session1/verbs/mcq-subject-verbagreement">
                                Verbs Multiple Choice
                                Questions - Subject Verb
                                Agreement
                            </Link>
                        </li>
                    </ul>
                </section>
            </article>
        </main>
    );
}
