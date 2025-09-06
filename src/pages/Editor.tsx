
import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import { useForm, FormErrors } from '../hooks/useForm';
import RichTextArea from '../components/ui/textarea/RichTextArea';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const validate = (values: any): FormErrors => {
    const errors: FormErrors = {};
    if (!values.title) errors.title = 'Title is required.';
    // Basic check to see if there's any content besides empty tags
    if (!values.content || values.content.replace(/<[^>]*>?/gm, '').trim().length === 0) {
        errors.content = 'Content is required.';
    }
    return errors;
};

const Editor: React.FC = () => {
    const handleSubmit = (values: any) => {
        alert('Editor content submitted! Check console.');
        console.log('Editor Data:', values);
    };

    const { getFieldProps, handleSubmit: handleFormSubmit } = useForm(
        {
            title: 'Sample Post Title',
            content: '<p>This is some <b>initial</b> content for the editor.</p>',
        },
        validate,
        handleSubmit
    );
    
    return (
        <div>
            <PageHeader
                title="Rich Text Editor"
                breadcrumbs={[{ name: 'UI Components', path: '#' }, { name: 'Editor', path: '/admin/components/editor' }]}
            />
            <Card>
                <Card.Header><h3 className="font-semibold">Blog Post Editor</h3></Card.Header>
                <Card.Body>
                     <form onSubmit={handleFormSubmit} className="space-y-6">
                        <Input
                            label="Post Title"
                            {...getFieldProps('title')}
                        />
                        <RichTextArea
                            label="Post Content"
                            {...getFieldProps('content')}
                        />
                        <div className="flex justify-end">
                            <Button type="submit">Save Post</Button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Editor;
