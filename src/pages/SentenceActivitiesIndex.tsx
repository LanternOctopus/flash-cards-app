import { Link, Route, Routes } from "react-router-dom";
import { ReadOutLoudModel } from "../activities/ReadOutLoudModel";
import { ReadOutLoud } from "../activities/ReadOutLoudView";
import { ParentScreen } from "../activities/ParentScreen";
import React from "react";
function DisabledLink({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <span
            aria-disabled="true"
            style={{
                cursor: "not-allowed",
                opacity: 0.5,
                textDecoration: "underline",
            }}
            onClick={(e) => e.preventDefault()}
        >
            {children}
        </span>
    );
}

export function SentenceActivitiesIndex() {
    return (
        <main className="container">
            <header>
                <h1>Sentence-Level Activities</h1>
            </header>

            <article
                style={{
                    display: "block",
                    textAlign: "left",
                }}
            >
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
                                Match Verbs to Pictures
                            </Link>
                        </li>
                        <li>
                            <Link to="/readoutloud/whatmybodycando">
                                What My Body Can Do
                            </Link>
                        </li>
                        <li>
                            <Link to="/readoutloud/learningcanchangeus">
                                Learning Can Change Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/readoutloud/thebusydayoflittlesteps">
                                The Busy Day of Little Steps
                            </Link>
                        </li>
                        <li>
                            <Link to="/readoutloud/wordsthattravel">
                                Words That Travel
                            </Link>
                        </li>
                        <li>
                            <Link to="/readoutloud/wordsyoucandoatyourdesk">
                                Words You Can Do at Your
                                Desk
                            </Link>
                        </li>
                        <li>
                            <DisabledLink>
                                Identify Nouns in a Sentence
                            </DisabledLink>
                        </li>
                        <li>
                            <DisabledLink>
                                Match Nouns to Pictures
                            </DisabledLink>
                        </li>
                        <li>
                            <DisabledLink>
                                Whimsical Nouns
                            </DisabledLink>
                        </li>
                        <li>
                            <DisabledLink>
                                Identify Adjectives in a
                                Sentence
                            </DisabledLink>
                        </li>
                        <li>
                            <DisabledLink>
                                Whimsical Adjectives
                            </DisabledLink>
                        </li>
                        <li>
                            <DisabledLink>
                                Identify Opposite Adjectives
                            </DisabledLink>
                        </li>
                        <li>
                            <DisabledLink>
                                Identify Adverbs in a
                                Sentence
                            </DisabledLink>
                        </li>
                        <li>
                            <DisabledLink>
                                Whimsical Adverbs
                            </DisabledLink>
                        </li>
                        <li>
                            <DisabledLink>
                                Identify Opposite Adverbs
                            </DisabledLink>
                        </li>
                        <li>
                            <DisabledLink>
                                Define Prepositions
                            </DisabledLink>
                        </li>
                        <li>
                            <DisabledLink>
                                Identify Prepositions in a
                                Sentence
                            </DisabledLink>
                        </li>
                    </ul>
                </section>

                <section>
                    <h3>Imperatives</h3>
                    <ul>
                        <li>
                            <Link to="/readoutloud/wordsyoucandoatyourdesk">
                                Words You Can Do at Your
                                Desk
                            </Link>
                        </li>
                    </ul>

                    <h3>Daily Conversation</h3>
                    <ul>
                        <li>
                            <Link to="/readoutloud/adognamedchai">
                                A Dog Named Chai
                            </Link>
                        </li>
                    </ul>

                    <h3>Correcting Sentences</h3>
                    <ul>
                        <li>
                            <Link to="/scrambler">
                                Unscramble Sentences
                            </Link>
                        </li>
                    </ul>
                </section>

                <section>
                    <h3>Contractions</h3>
                    <ul>
                        <li>
                            <Link to="/readoutloud/whimsicalcontractions">
                                Whimsical Contractions
                            </Link>
                        </li>
                    </ul>

                    <h3>Possessive Adjectives</h3>
                    <ul>
                        <li>
                            <DisabledLink>
                                Identify The Correct
                                Possessive
                            </DisabledLink>
                        </li>
                        <li>
                            <DisabledLink>
                                Whimsical Possessives
                            </DisabledLink>
                        </li>
                    </ul>

                    <h3>Commas</h3>
                    <h4>COMING SOON</h4>

                    <h3>Tenses</h3>
                    <ul>
                        <li>
                            <Link to="/sequences">
                                Test your knowledge of
                                tenses
                            </Link>
                        </li>
                        <li>
                            <Link to="/flashcards">
                                Subject, Tense, and Verb.
                                Malayalam to English
                                flashcards
                            </Link>
                        </li>
                        <li>
                            <DisabledLink>
                                Whimsical Tenses
                            </DisabledLink>
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
                            <DisabledLink>
                                Whimsical Figuratives
                            </DisabledLink>
                        </li>
                    </ul>
                </section>

                <small>
                    This site is independently developed.
                    References to textbooks are for
                    classroom alignment only.
                </small>
            </article>
        </main>
    );
}
