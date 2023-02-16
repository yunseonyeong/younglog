import { NextPage } from 'next';
import { posts } from './api/notion';
import Link from 'next/link';
import React from 'react';
import { Layout, theme } from 'antd';
import Image from 'next/image';
import styled from 'styled-components';

const { Content } = Layout;

interface Props {
  posts: [any];
}

const Home: NextPage<Props> = (props) => {
  return (
    <>
      <Layout style={{ padding: '0 24px 24px' }}>
        <PostCount>
          {props.posts.length} 개의 글
        </PostCount>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            gap: '20px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {
            props.posts.map((result, i) => (
              <Link key={i} href={`/${result.id}`}>
                <CardRow key={i}>
                  <TitleText>
                    {result.properties.Name.title[0].plain_text}
                  </TitleText>
                  <Center>
                    <DateText>{result.properties.date.date.start}</DateText>
                  </Center>
                  <ImageDom>
                    <Image src={result.properties.thumbnail.files[0] ? result.properties.thumbnail.files[0].file.url : '/image/postThumbnail.png'} alt="thumbnail" width="300" height="200"></Image>
                  </ImageDom>
                </CardRow>
              </Link>
            ))
          }
        </Content>
      </Layout>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  let { results } = await posts();
  return {
    props: {
      posts: results
    },
    revalidate: 26400,
  };
};



const PostCount = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: gray;
  margin: 20px 10px;
`;

const TitleText = styled.div`
  font-size: 25px;
  flex-basis: 60%;
  
`;

const CardRow = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  width: 100%;
  height: 100%;
  max-height: 250px;
  padding: 20px 50px;
  justify-content: space-between;
  gap: 20px;
  background-color: white;
  border-radius: 20px;
`;
const DateText = styled.div`
  display: flex;
  font-size: 12px;
  color: gray;
`;

const Center = styled.div`
  height: 200px;
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

const ImageDom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 300px;
`;

