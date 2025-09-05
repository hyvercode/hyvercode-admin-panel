import React, { useRef } from 'react';

// Props need to align with useForm's getFieldProps
interface RichTextAreaProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // Simulate a change event
  // FIX: Broaden the onBlur event type to be compatible with the useForm hook, which passes an onBlur for standard input elements.
  onBlur?: (e: React.FocusEvent<any>) => void;
  error?: string;
  disabled?: boolean;
}

const RichTextArea: React.FC<RichTextAreaProps> = ({ label, id, name, value, onChange, onBlur, error, disabled }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleInput = () => {
    if (editorRef.current) {
      // Simulate a change event for useForm
      const event = {
        target: {
          name,
          value: editorRef.current.innerHTML,
        },
      } as React.ChangeEvent<HTMLTextAreaElement>;
      onChange(event);
    }
  };
  
  const execCmd = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  // FIX: Create a custom blur handler. The useForm hook's onBlur handler expects an event from an
  // element with a `name` property (like an input), but a `div`'s blur event does not have this.
  // This wrapper creates a synthetic event object that includes the `name`, ensuring compatibility.
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (onBlur) {
      const syntheticEvent = {
        ...e,
        target: { ...e.target, name: name },
      };
      onBlur(syntheticEvent);
    }
  };
  
  const toolbarButtons = [
    { cmd: 'bold', icon: 'bi-type-bold' },
    { cmd: 'italic', icon: 'bi-type-italic' },
    { cmd: 'underline', icon: 'bi-type-underline' },
    { cmd: 'insertUnorderedList', icon: 'bi-list-ul' },
    { cmd: 'insertOrderedList', icon: 'bi-list-ol' },
  ];
  
  const baseClasses = "block w-full px-3 py-2 border rounded-b-md shadow-sm min-h-[150px] overflow-y-auto focus:outline-none focus:ring-2";
  const lightClasses = "bg-neutral-100 text-neutral-900";
  const darkClasses = "dark:bg-neutral-900 dark:text-white";
  const errorClasses = "border-danger ring-danger";
  const normalClasses = "border-neutral-300 dark:border-neutral-800 focus:ring-primary";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-800 dark:text-neutral-300 mb-1">
        {label}
      </label>
      <div className={`rounded-md shadow-sm border ${error ? 'border-danger' : 'border-transparent'}`}>
        {/* Toolbar */}
        <div className="flex items-center p-2 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-300 dark:border-neutral-800 rounded-t-md">
          {toolbarButtons.map(({ cmd, icon }) => (
            <button
              key={cmd}
              type="button"
              disabled={disabled}
              onMouseDown={(e) => e.preventDefault()} // prevent editor from losing focus
              onClick={() => execCmd(cmd)}
              className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 disabled:opacity-50"
              aria-label={cmd}
            >
              <i className={`bi ${icon}`}></i>
            </button>
          ))}
        </div>
        {/* Editor */}
        <div
          id={id}
          ref={editorRef}
          contentEditable={!disabled}
          onInput={handleInput}
          onBlur={handleBlur}
          className={`${baseClasses} ${lightClasses} ${darkClasses} ${error ? errorClasses : normalClasses}`}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
       {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
};

export default RichTextArea;