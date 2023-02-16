import React from 'react';

interface IPostCard {
    thumbnail: string;
    title: string;
    description: string;
    date: string;
}

const PostCard = ({ thumbnail, title, description, date }: IPostCard) => {
    return (
        <div>PostCard</div>
    );
};

export default PostCard;