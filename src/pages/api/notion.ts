import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_KEY,
});


async function post(id: string) {
  const myPost = await notion.pages.retrieve({
    page_id: id,
  });
  return myPost;
}

async function blocks(id: string, start_cursor?: string) {
  const myBlocks = await notion.blocks.children.list({
    block_id: id,
    start_cursor: start_cursor
  });
  return myBlocks;
}

async function posts() {
  const myPosts = await notion.databases.query({
    database_id: `${process.env.NOTION_DATABASE_ID}`,
  });
  return myPosts;
}

export { posts, blocks, post };