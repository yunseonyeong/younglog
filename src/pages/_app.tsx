import '@styles/globals.css';
import Head from "next/head";
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from "recoil";
import type { AppProps } from 'next/app';
import React from 'react';
import Link from 'next/link';
import Image from 'next/legacy/image';
import styled from 'styled-components';
import SideBar from '../components/SideBar';

function YoungBlog({ Component, pageProps }: AppProps) {

    const queryClient = new QueryClient();


    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <Head>
                    <title>Young Blog</title>
                    <meta name="description" content="Seonyeong's Devlog" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                    <meta property="og:site_name" content="YoungLog" />
                    <meta property="og:url" content={"https://younglog.vercel.app"} />
                    <meta property="og:type" content="website" />
                    <meta property="og:description" content="Seonyeong's Devlog" />
                    <meta property="og:image" content={'/image/postThumbnail.png'} />
                    <meta property="twitter:card" content="YoungLog" />
                    <meta property="twitter:title" content="YoungLog" />
                    <meta property="twitter:description" content="Seonyeong's Devlog" />
                    <meta property="twitter:image" content={'/image/postThumbnail.png'} />
                    <meta property="twitter:url" content={"https://younglog.vercel.app"} />
                    <meta name="twitter:creator" content="YoungLog" />
                </Head>
                <>
                    <Layout>
                        <StyledHeader>
                            <Link href="/">
                                <Logo>
                                    <Image className='logo' src="/image/logo.png" alt="logo" width={120} height={30} />
                                </Logo>
                            </Link>
                        </StyledHeader>
                        <StyledLayout>
                            <SideBar menu={[{ to: '1', name: '카테고리1' }, { to: '2', name: '카테고리2' }, { to: '2', name: '카테고리3' }]} />
                            <Component {...pageProps} />
                        </StyledLayout>
                    </Layout>
                </>
            </QueryClientProvider>
        </RecoilRoot >
    );
}

export default YoungBlog;





const Logo = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  & > logo {
    cursor: pointer;
  }
`;


export const Layout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
`;

const StyledLayout = styled(Layout)`
    display: flex;
    flex-direction: row;
    @media(max-width: 900px) {
        width: 100%;
    }
`;



const StyledHeader = styled.div`
    @media (max-width: 900px){
        justify-content: center;
    }
    background-color: #D6BBEC;
    display: flex;
    align-items: center;
    padding: 1.5rem;

`;