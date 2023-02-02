import { GetStaticPaths, NextPage, GetStaticProps } from "next";
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { ParsedUrlQuery } from "querystring";
import { post, posts, blocks } from './api/notion';

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
        case 'image':
            // For an image
            return <Image src={block['image'].external.url} width={650} height={400} alt="" />;
        case 'bulleted_list_item':
            // For an unordered list
            return <ul><li>{block['bulleted_list_item'].rich_text[0].plain_text} </li></ul >;
        case 'paragraph':
            // For a paragraph
            return <p>{block['paragraph'].rich_text[0]?.text?.content} </p>;
        default:
            // For an extra type
            return <p>Undefined type </p>;
    }
};


const Post: NextPage<Props> = ({ id, post, blocks }) => {
    return (
        <div>
            <Head>
                <title>
                    {post.properties.Name.title[0].plain_text}
                </title>
            </Head>
            <div>
                <nav>
                    <Link href="/">
                        Home
                    </Link>
                </nav>
            </div>
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

export const getStaticProps: GetStaticProps = async (ctx) => {
    let { id } = ctx.params as IParams;
    let page_result = await post(id);
    let { results } = await blocks(id);

    console.log(page_result);
    console.log(results);
    return {
        props: {
            id,
            post: page_result,
            blocks: results
        }
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
        fallback: false
    };
};

