import React, { useMemo } from 'react';
import type { Comment as CommentType } from '../../types';
import { USERS_DATA } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';
import Comment from './Comment';
import Button from './Button';
import CommentInput from './CommentInput';

interface CommentThreadProps {
  comments: Omit<CommentType, 'replies'>[];
  onCommentSubmit: (text: string, parentId: number | null) => void;
}

// Helper to find user info
const getUserById = (id: number) => USERS_DATA.find(u => u.id === id);

// Helper to build the comment tree
const buildCommentTree = (comments: Omit<CommentType, 'replies'>[]): CommentType[] => {
  const commentMap: { [key: number]: CommentType } = {};
  const rootComments: CommentType[] = [];

  // First pass: create a map of all comments
  comments.forEach(comment => {
    commentMap[comment.id] = { ...comment, replies: [] };
  });

  // Second pass: link replies to their parents
  Object.values(commentMap).forEach(comment => {
    if (comment.parentId && commentMap[comment.parentId]) {
      commentMap[comment.parentId].replies?.push(comment);
    } else {
      rootComments.push(comment);
    }
  });

  return rootComments;
};

const CommentThread: React.FC<CommentThreadProps> = ({ comments, onCommentSubmit }) => {
  const { user: currentUser } = useAuth();
  
  const commentTree = useMemo(() => buildCommentTree(comments), [comments]);
  
  const renderComment = (comment: CommentType) => {
    const author = getUserById(comment.authorId);
    return (
      <div key={comment.id}>
        <Comment
          author={author?.name || 'Unknown User'}
          avatarSrc={`https://picsum.photos/50/50?random=${author?.id}`}
          timestamp={comment.timestamp}
          actions={
            <Button variant="link" size="sm" onClick={() => console.log(`Replying to ${comment.id}`)}>Reply</Button>
          }
        >
          {comment.content}
        </Comment>
        
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-8 mt-4 pl-4 border-l-2 border-neutral-200 dark:border-neutral-800 space-y-4">
            {comment.replies.map(renderComment)}
          </div>
        )}
      </div>
    );
  };
  
  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-800 pb-2">
        Discussion ({comments.length})
      </h4>
      <CommentInput
        user={{
          name: currentUser.name,
          avatarSrc: `https://picsum.photos/50/50?random=${currentUser.id}`
        }}
        onSubmit={(text) => onCommentSubmit(text, null)}
      />
      <div className="space-y-4 pt-4">
        {commentTree.map(renderComment)}
      </div>
    </div>
  );
};

export default CommentThread;
