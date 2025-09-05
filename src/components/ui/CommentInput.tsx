import React, { useState } from 'react';
import Avatar from '../ui/avatar/Avatar';
import Button from './Button';

interface CommentInputProps {
  user: {
    name: string;
    avatarSrc?: string;
  };
  onSubmit: (text: string) => void;
  placeholder?: string;
  cta?: string;
}

const CommentInput: React.FC<CommentInputProps> = ({ user, onSubmit, placeholder = "Write a comment...", cta = "Post Comment" }) => {
  const [text, setText] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };
  
  const baseClasses = "appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-neutral-500 focus:outline-none focus:ring-2 sm:text-sm";
  const lightClasses = "bg-neutral-100 border-neutral-300 text-neutral-900";
  const darkClasses = "dark:bg-neutral-900 dark:border-neutral-800 dark:placeholder-neutral-500 dark:text-white";
  const normalClasses = "focus:ring-primary focus:border-transparent";
  const textareaClassName = `${baseClasses} ${lightClasses} ${darkClasses} ${normalClasses}`;

  return (
    <form onSubmit={handleSubmit} className="flex items-start space-x-3">
      <Avatar name={user.name} src={user.avatarSrc} size="md" />
      <div className="flex-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className={textareaClassName}
          rows={3}
        />
        <div className="flex justify-end mt-2">
          <Button type="submit" size="sm" disabled={!text.trim()}>
            {cta}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CommentInput;