import { NextPage } from 'next';
import { posts } from './api/notion';
import Link from 'next/link';
import React from 'react';
import Image from 'next/legacy/image';
import styled from 'styled-components';
import { Layout } from './_app';

interface Props {
  posts: [any];
}

const Home: NextPage<Props> = (props) => {
  return (
    <>
      <HomeLayout>
        <PostCount>
          {props.posts.length} 개의 글
        </PostCount>
        <StyledContent
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
                  <TextRow>
                    <TitleText>
                      {result.properties.Name.title[0].plain_text}
                    </TitleText>
                    <Center>
                      <DateText>{result.properties.date.date.start}</DateText>
                    </Center>
                  </TextRow>
                  <ImageDom>
                    <Image
                      className='card'
                      src={
                        result.properties.thumbnail.files[0] ?
                          result.properties.thumbnail.files[0].file.url :
                          '/image/postThumbnail.png'}
                      alt="thumbnail"
                      layout="fill"
                      objectFit='contain'
                    />
                  </ImageDom>
                </CardRow>
              </Link>
            ))
          }
        </StyledContent>
      </HomeLayout>
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
    revalidate: 20,
  };
};

const HomeLayout = styled(Layout)`
  padding: 20px;
  
`;


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
  @media(max-width: 900px) {
    font-size: 15px;
  }
`;

const CardRow = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  width: 100%;
  height: 100%;
  max-height: 250px;
  padding: 20px 50px;
  @media(max-width: 900px) {
    padding: 5px 10px;
  }
  justify-content: space-between;
  gap: 20px;
  background-color: white;
  border-radius: 20px;
`;
const DateText = styled.div`
  display: flex;
  font-size: 12px;
  color: gray;
  @media(max-width: 900px) {
    font-size: 10px;
    padding-left: 3px;
  }
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
  width: 300px;
  height: 200px;
  position: relative;

  @media(max-width: 1200px){
    min-width: 100px;
    width: 250px;
    height: 150px;
    overflow: hidden;
  }
  @media(max-width: 900px){
    min-width: 100px;
    width: 150px;
    height: 130px;
    overflow: hidden;
  }
`;



const StyledContent = styled.div`
@media(max-width: 900px) {
   padding: 10px 0 !important;
  }
`;

const TextRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-basis: 100%;
  @media(max-width: 900px) {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 5px;
  }
`;