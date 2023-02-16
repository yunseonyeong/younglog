import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula, materialLight, materialOceanic, vsDark, nightOwl, duotoneSea, duotoneForest, vs, synthwave84, pojoaque, xonokai, funky, ghcolors, vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";


const CodeBlockRenderer = ({ code, language }: { code: any; language: any; }) => {
    return (
        <Wrapper>
            <SyntaxHighlighter
                style={vscDarkPlus}
                language={language}
                PreTag="div">
                {code.replace(/\n$/, "")}
            </SyntaxHighlighter>
        </Wrapper>
    );
};

export default CodeBlockRenderer;

const Wrapper = styled.div`
    @media (max-width: 900px){
        max-width: 100%;
    }
    max-width: 90%;
   border-radius: 4%;
   overflow-x: scroll;

`;