import { GetStaticPaths, NextPage, GetStaticProps } from "next";
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { ParsedUrlQuery } from "querystring";
import { post, posts, blocks } from './api/notion';
import { useRouter } from "next/router";
import ReactMarkdown from 'react-markdown';
import CodeBlockRenderer from "@components/CodeBlockRenderer";


interface IParams extends ParsedUrlQuery {
    id: string;
}

interface Props {
    id: string,
    post: any,
    blocks: [any];
}

const renderBlock = (block: any) => {
    switch (block.type) {
        case 'heading_1':
            // For a heading
            return <h1>{block['heading_1'].rich_text[0].plain_text} </h1>;
        case 'heading_2':
            // For a heading
            return <h2>{block['heading_2'].rich_text[0].plain_text} </h2>;
        case 'heading_3':
            // For a heading
            return <h3>{block['heading_3'].rich_text[0].plain_text} </h3>;
        case 'image':
            return <Image src={block['image'].file.url} width={650} height={400} alt="" />;
        case 'code':
            return <CodeBlockRenderer code={block.code.rich_text[0].text.content} language={block['code'].language} />;
        case 'bulleted_list_item':
            // For an unordered list
            return <ul><li>{block['bulleted_list_item'].rich_text[0].plain_text} </li></ul >;
        case 'paragraph':
            // For a paragraph
            return <p>{block['paragraph'].rich_text[0]?.text?.content} </p>;
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
        <div>
            <Head>
                <title>
                    {post.properties.Name.title[0].plain_text}
                </title>
            </Head>
            {
                blocks.map((block, index) => {
                    return (
                        <div key={index}>


                            {
                                renderBlock(block)
                            }
                        </div>
                    );
                })
            }
        </div>
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
        revalidate: 26400,
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
;;
