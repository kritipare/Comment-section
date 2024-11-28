import React, { useState } from "react";

const COMMENTS = [
    {
        id: "1",
        description: "comment 1",
        child: [
            {
                id: "2",
                description: "comment 2",
            },
            { id: "3", description: "comment 3" },
        ],
    },
    {
        id: "4",
        description: "comment 4",
        child: [
            {
                id: "7",
                description: "comment 7",
            },
        ],
    },
];

const Comment = ({ comment, postComment }) => {
    const [showChildComments, setShowChildComments] = useState(true);
    const [newComment, setNewComment] = useState("");
    const { id, description, child } = comment;

    return (
        <div className='comment'>
            <div
                className='description'
                onClick={() => setShowChildComments((t) => !t)}>
                {description}
                <div class='actions'>
                    <button>Reply</button>
                </div>
            </div>

            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}></textarea>
            <button onClick={() => postComment(id, newComment)}>Post</button>

            {showChildComments ? (
                <>
                    {child?.length && (
                        <div
                            className='nested-comments'
                            style={{ padding: 10, marginLeft: 30 }}>
                            {child?.map((nestedComment) => (
                                <Comment
                                    key={nestedComment.id}
                                    comment={nestedComment}
                                    postComment={postComment}
                                />
                            ))}
                        </div>
                    )}
                </>
            ) : null}
        </div>
    );
};

const CommentSection = () => {
    const [comments, setComments] = useState(COMMENTS);

    // const postComment = (parentId, content) => {
    //     const addCommentsRecursively = (comments) => {
    //         return comments?.map((comment) => {
    //             // Check if this is the parent comment
    //             if (comment.id === parentId) {
    //                 const newComment = {
    //                     id: Date.now(),
    //                     description: content,
    //                     child: [], // Initialize the new comment's child as an empty array
    //                 };
    //                 return {
    //                     ...comment,
    //                     child: [...comment.child, newComment], // Append the new comment as a child
    //                 };
    //             }

    //             // If this comment has children, recurse into the children
    //             return {
    //                 ...comment,
    //                 child: addCommentsRecursively(comment.child), // Recurse for nested children
    //             };
    //         });
    //     };

    //     // Update the state by calling addCommentsRecursively on the previous state
    //     setComments((prevComments) => addCommentsRecursively(prevComments));
    // };

    const postComment = (parentId, content) => {
        const addCommentsRecursively = (comments) => {
            return comments?.map((comment) => {
                //check if this comment matches
                if (comment.id === parentId) {
                    const newComment = {
                        id: Date.now(),
                        description: content,
                        child: [],
                    };
                    return {
                        ...comment,
                        child: [...comment.child, newComment],
                    };
                }
                //else call for child
                return {
                    ...comment,
                    child: addCommentsRecursively(comment.child),
                };
            });
        };

        setComments((prevComments) => addCommentsRecursively(prevComments));
    };

    return (
        <div>
            {comments.map((comment) => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    postComment={postComment}
                />
            ))}
        </div>
    );
};

export default CommentSection;
