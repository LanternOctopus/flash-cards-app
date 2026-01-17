import { Link } from "react-router-dom";

export default function SentenceActivitiesIndex() {
    return (
        <main className="container">
            <h1>Sentence-Level Activities</h1>

            <section>
                <h3>Parts of Speech</h3>
                <ul>
                    <li>
                        <Link to="/partsofspeech">
                            Identify Verbs in a Sentence
                        </Link>
                    </li>
                    <li>
                        <Link to="/picturematchinggame">
                            Define Verbs
                        </Link>
                    </li>
                    <li>
                        {/* must add a story with lots of verbs. */}
                        <Link to="/readoutloud">
                            Whimsical Verbs
                        </Link>
                    </li>
                    <li>
                        <Link to="/partsofspeech">
                            Identify Nouns in a Sentence
                        </Link>
                    </li>
                    <li>
                        <Link to="/picturematchinggame">
                            Match Nouns to Pictures
                        </Link>
                    </li>
                    <li>
                        {/* must add a story with lots of Nouns. */}
                        <Link to="/readoutloud">
                            Whimsical Nouns
                        </Link>
                    </li>
                    <li>
                        <Link to="/partsofspeech">
                            Identify Adjectives in a
                            Sentence
                        </Link>
                    </li>
                    <li>
                        {/* must add a story with lots of adjectives. */}
                        <Link to="/readoutloud">
                            Whimsical Adjectives
                        </Link>
                    </li>
                    <li>
                        <Link to="/flashcards">
                            Identify Opposite Adjectives
                        </Link>
                    </li>
                    <li>
                        <Link to="/partsofspeech">
                            Identify Adverbs in a Sentence
                        </Link>
                    </li>
                    <li>
                        {/* must add a story with lots of adverbs. */}
                        <Link to="/readoutloud">
                            Whimsical Adverbs
                        </Link>
                    </li>
                    <li>
                        <Link to="/flashcards">
                            Identify Opposite Adverbs
                        </Link>
                    </li>
                    <li>
                        <Link to="/picturematchinggame">
                            Define Prepositions
                        </Link>
                    </li>
                    <li>
                        <Link to="/partsofspeech">
                            Identify Prepositions in a
                            Sentence
                        </Link>
                    </li>
                </ul>
            </section>

            <section>
                <h3>Imperatives</h3>
                <h4>COMING SOON</h4>

                <h3>Daily Conversation</h3>
                <ul>
                    <li>
                        {/* must add a story about ordering from a menu. */}
                        <Link to="/readoutloud">
                            Read Out Loud
                        </Link>
                    </li>
                    <li>
                        {/* must add a story about telling directions */}
                        <Link to="/readoutloud">
                            Read Out Loud
                        </Link>
                    </li>
                </ul>
                <h3>Correcting Sentences</h3>
                <ul>
                    <li>
                        <Link to="/scrambler">
                            Scrambler
                        </Link>
                    </li>
                </ul>
            </section>

            <section>
                <h3>Contractions</h3>
                <ul>
                    <li>
                        {/* must add a story with lots of Contractions. */}
                        <Link to="/readoutloud">
                            Whimsical Contractions
                        </Link>
                    </li>
                </ul>
                <h3>Possessive Adjectives</h3>
                <ul>
                    <li>
                        <Link to="/flashcards">
                            Identify The Correct Possessive
                        </Link>
                    </li>
                    <li>
                        {/* must add a story with lots of Possessives. */}
                        <Link to="/readoutloud">
                            Whimsical Possessives
                        </Link>
                    </li>
                </ul>
                <h3>Commas</h3>
                <h4>COMING SOON</h4>

                <h3>Tenses</h3>
                <ul>
                    <li>
                        <Link to="/sequences">
                            Sequences
                        </Link>
                    </li>
                    <li>
                        <Link to="/flashcards">
                            Flash Cards
                        </Link>
                    </li>
                    <li>
                        {/* must add a story with lots of Tenses. */}
                        <Link to="/readoutloud">
                            Whimsical Tenses
                        </Link>
                    </li>
                </ul>
            </section>

            <section>
                <h3>Feelings</h3>
                <h4>COMING SOON</h4>

                <h3>Units</h3>
                <h4>COMING SOON</h4>

                <h3>Figurative Language</h3>
                <ul>
                    <li>
                        {/* must add a story with lots of Figurative language. */}
                        <Link to="/readoutloud">
                            Whimsical Figuratives
                        </Link>
                    </li>
                </ul>
            </section>
            <small>
                This site is independently developed.
                References to textbooks are for classroom
                alignment only.
            </small>
        </main>
    );
}
