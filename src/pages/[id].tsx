import { GetStaticPaths, NextPage } from "next";
import Image from 'next/legacy/image';
import { post, posts, blocks } from './api/notion';
import { useRouter } from "next/router";
import CodeBlockRenderer from "@components/CodeBlockRenderer";
import styled from "styled-components";
import { BulletedTag, Divider, Header1, Header2, Header3, ImageDom, NumberedItem, PTag } from "../styles/BlockComponent";
import { GiDiamonds } from 'react-icons/gi';

interface Props {
    id: string,
    post: any,
    blocks: [any];
}

const renderBlock = (block: any) => {
    switch (block.type) {
        case 'heading_1':
            // For a heading
            return <Header1>{block['heading_1'].rich_text[0].plain_text} </Header1>;
        case 'heading_2':
            // For a heading
            return <Header2>{block['heading_2'].rich_text[0].plain_text} </Header2>;
        case 'heading_3':
            // For a heading
            return <Header3>{block['heading_3'].rich_text[0].plain_text} </Header3>;
        case 'image':
            return <ImageDom><Image src={block['image'].file.url} layout="fill" alt="" objectFit="contain"
                objectPosition="center" /></ImageDom>;
        case 'code':
            return <CodeBlockRenderer code={block.code.rich_text[0].text.content} language={block['code'].language} />;
        case 'bulleted_list_item':
            // For an unordered list
            return <BulletedTag><GiDiamonds />{block['bulleted_list_item'].rich_text[0].plain_text}</BulletedTag>;
        case 'paragraph':
            if (block['paragraph'].rich_text.length == 0) {
                return <br />;
            }
            return <PTag>{block['paragraph'].rich_text[0]?.text?.content} </PTag>;

        case 'divider':
            return <Divider />;

        case 'numbered_list_item':
            return <NumberedItem>
                <li>
                    {
                        block['numbered_list_item'].rich_text[0]?.plain_text
                    }
                </li>
            </NumberedItem>;
        default:
            // For an extra type
            return <p></p>;
    }
};



const Post: NextPage<Props> = ({ post, blocks }) => {
    const router = useRouter();
    if (router.isFallback) {
        return (
            <>
                <div>로딩중</div>
            </>
        );
    }
    return (
        <Wrapper>
            <Header>
                <BigTitle>
                    {post.properties.Name.title[0].plain_text}
                </BigTitle>
                <DateText>
                    {post.properties.date.date.start}
                </DateText>
            </Header>
            {
                blocks.map((block, index) => {
                    return (
                        <Line key={index}>
                            {
                                renderBlock(block)
                            }
                        </Line>
                    );
                })
            }
        </Wrapper>
    );
};


export default Post;

export const getStaticProps = async ({ params }: { params: { id: string; }; }) => {
    let page_result = await post(params.id);
    let data = await blocks(params.id);
    let blockdata: any = [...data.results];

    while (data.has_more) {
        if (data.next_cursor) {
            data = await blocks(params.id, data.next_cursor);
            blockdata.push(...data.results);
        }
    }

    return {
        props: {
            post: page_result,
            blocks: blockdata
        },
        revalidate: 20,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    let { results } = await posts();

    return {
        paths: results.map((post) => {
            return {
                params: {
                    id: post.id
                }
            };
        }),
        fallback: true
    };
};


const Wrapper = styled.div`
  padding: 2rem 4rem;
  width: 100%;
  @media(max-width: 900px){
    padding: 1rem;
  }
`;

const Header = styled.div`
    display: flex;
    gap: 25px;
    padding: 0 1rem 2rem 1rem;
    justify-content: space-between;
    width: 90%;
    border-bottom: 2px solid lightgray;
    margin-bottom: 2rem;
    @media (max-width: 900px) {
        flex-direction: column;
        padding: 1rem 0;
        width: 100%;
    }
`;

const BigTitle = styled.div`
    font-size: 40px;
    font-weight: 700;
`;

const DateText = styled.div`
    font-size: 13px;
    font-weight: 400;
    display: flex;
    align-items: center;
    color: gray;
    @media (max-width: 900px){
        width: 100%;
        justify-content: flex-end;
        padding: 0 0.5rem;
    }
`;

const Line = styled.div`
    margin: 0;
    padding: 0;
`;