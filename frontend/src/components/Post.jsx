import React from 'react';

const Post = React.forwardRef(({ post }, ref) => {
    const postBody = (
        <div className='flex items-center justify-center w-screen gap-4'>
            <div className="p-4 bg-white rounded-lg w-[500px] mb-4">
                <h2 className="text-2xl font-bold text-center mb-4">{post.title}</h2>
                <p>{post.body}</p>
                <p className="text-sm mt-4">Post ID: {post.id}</p>
            </div>
        </div>
    );

    const content = ref ? (
        <article ref={ref} className="bg-lightblue rounded-lg overflow-hidden">
            {postBody}
        </article>
    ) : (
        <article className="bg-lightblue rounded-lg overflow-hidden">
            {postBody}
        </article>
    );

    return content;
});

export default Post;
