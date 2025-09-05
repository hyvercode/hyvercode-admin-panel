import React from 'react';
import Avatar from './Avatar';
import Button from './Button';

interface CommentProps {
  author: string;
  avatarSrc?: string;
  timestamp: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

const Comment: React.FC<CommentProps> = ({ author, avatarSrc, timestamp, actions, children }) => {
  return (
    <div className="flex items-start space-x-3">
      <Avatar name={author} src={avatarSrc} size="md" />
      <div className="flex-1">
        <div className="bg-neutral-100 dark:bg-neutral-900 rounded-lg px-4 py-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">{author}</span>
            <span className="text-xs text-neutral-600 dark:text-neutral-400">{timestamp}</span>
          </div>
          <p className="text-sm text-neutral-800 dark:text-neutral-300 mt-1">{children}</p>
        </div>
        {actions && <div className="flex items-center space-x-2 mt-1 pl-2 text-xs">{actions}</div>}
      </div>
    </div>
  );
};

export default Comment;
