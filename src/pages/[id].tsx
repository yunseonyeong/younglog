import { GetStaticPaths, NextPage, GetStaticProps } from "next";
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { ParsedUrlQuery } from "querystring";
import { post, posts, blocks } from './api/notion';
import { useRouter } from "next/router";

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
            <div>
                <nav>
                    <Link href="/">
                        Home
                    </Link>
                    <div>하이</div>
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

export const getStaticProps = async ({ params }: { params: { id: string; }; }) => {
    let page_result = await post(params.id);
    let { results } = await blocks(params.id);


    return {
        props: {
            post: page_result,
            blocks: results
        },
        revalidate: 1,
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

