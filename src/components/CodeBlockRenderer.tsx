import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";


const CodeBlockRenderer = ({ code, language }: { code: any; language: any; }) => {
    return (
        <SyntaxHighlighter
            style={atomDark}
            language={language}
            PreTag="div">
            {code.replace(/\n$/, "")}
        </SyntaxHighlighter>
    );
};

export default CodeBlockRenderer;