import '@styles/global.css';
import Head from "next/head";
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from "recoil";
import type { AppProps } from 'next/app';
import React from 'react';

function YoungBlog({ Component, pageProps }: AppProps) {

    const queryClient = new QueryClient();


    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <Head>
                    <title>YoungBlog</title>
                </Head>
                <Component {...pageProps} />
            </QueryClientProvider>
        </RecoilRoot >
    );
}

export default YoungBlog;