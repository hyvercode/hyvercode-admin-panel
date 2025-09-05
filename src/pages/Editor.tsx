import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/textarea/Textarea';
import RichTextArea from '../components/ui/textarea/RichTextArea';
import { useForm, FormErrors } from '../hooks/useForm';

const validate = (values: any): FormErrors => {
    const errors: FormErrors = {};
    if (!values.title) errors.title = 'A title is required.';
    if (!values.summary) errors.summary = 'A summary is required.';
    // For rich text, check for empty content (browser might leave <p><br></p>)
    if (!values.content || values.content === '<p><br></p>' || values.content.trim().length < 10) {
        errors.content = 'Content must be at least 10 characters long.';
    }
    return errors;
};

const Editor: React.FC = () => {
    const handleSubmit = (values: Record<string, any>) => {
        console.log('Editor Form Submitted:', values);
        alert('Content published! Check the console for data.');
    };
    
    // FIX: Destructure `values` to explicitly pass to RichTextArea.
    const { getFieldProps, handleSubmit: handleFormSubmit, values } = useForm(
        {
            title: '',
            summary: '',
            content: '',
        },
        validate,
        handleSubmit
    );

    return (
        <div>
            <PageHeader
                title="Content Editor"
                breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Editor', path: '/editor' }]}
            />
            <div className="bg-neutral-0 dark:bg-neutral-1000 p-8 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                    <Input
                        label="Post Title"
                        {...getFieldProps('title')}
                    />
                    <Textarea
                        label="Summary"
                        rows={3}
                        {...getFieldProps('summary')}
                    />
                    <RichTextArea
                        label="Main Content"
                        {...getFieldProps('content')}
                        // FIX: Explicitly pass value to satisfy the component's props interface,
                        // as getFieldProps returns a union type that TS can't resolve when spread.
                        value={values.content}
                    />
                    <div className="pt-4 flex justify-end space-x-2">
                        <Button type="button" variant="secondary">Save Draft</Button>
                        <Button type="submit">Publish</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Editor;
