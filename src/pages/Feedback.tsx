
import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import Alert from '../components/ui/Alert';
import { useForm, FormErrors } from '../hooks/useForm';
import RadioGroup from '../components/ui/radio/RadioGroup';
import StarRating from '../components/ui/range/StarRating';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';

const validate = (values: any): FormErrors => {
    const errors: FormErrors = {};
    if (!values.feedbackType) errors.feedbackType = 'Please select a feedback type.';
    if (values.rating === 0) errors.rating = 'Please provide a rating.';
    return errors;
};


const Feedback: React.FC = () => {
    const handleSubmit = (values: any) => {
        alert('Feedback submitted! Check console.');
        console.log('Feedback Data:', values);
    };

    const { getFieldProps, handleSubmit: handleFormSubmit, setValues, values } = useForm(
        {
            feedbackType: 'general',
            rating: 0,
            comments: '',
        },
        validate,
        handleSubmit
    );

    return (
        <div>
             <PageHeader
                title="Feedback Components"
                breadcrumbs={[{ name: 'UI Components', path: '#' }, { name: 'Feedback', path: '/admin/components/feedback' }]}
            />
            <div className="space-y-6">
                <Card>
                    <Card.Header><h3 className="font-semibold">Alerts</h3></Card.Header>
                    <Card.Body className="space-y-4">
                        <Alert variant="info" title="Informational Note">This is an alert to provide helpful information or context.</Alert>
                        <Alert variant="success" title="Success!">Your action was completed successfully.</Alert>
                        <Alert variant="warning" title="Warning">Please be aware of this potential issue.</Alert>
                        <Alert variant="danger" title="Error">Something went wrong. Please try again.</Alert>
                    </Card.Body>
                </Card>
                 <Card>
                    <Card.Header><h3 className="font-semibold">Feedback Form</h3></Card.Header>
                    <Card.Body>
                         <form onSubmit={handleFormSubmit} className="space-y-6">
                            <RadioGroup
                                label="Feedback Type"
                                options={[
                                    { value: 'general', label: 'General Feedback' },
                                    { value: 'bug', label: 'Bug Report' },
                                    { value: 'feature', label: 'Feature Request' },
                                ]}
                                {...getFieldProps('feedbackType')}
                            />
                            <StarRating 
                                label="Overall Satisfaction"
                                id="rating"
                                value={values.rating}
                                onChange={(value) => setValues(prev => ({ ...prev, rating: value }))}
                                error={getFieldProps('rating').error}
                            />
                            <Textarea
                                label="Comments (Optional)"
                                id="comments"
                                rows={4}
                                {...getFieldProps('comments')}
                            />
                            <div className="flex justify-end">
                                <Button type="submit">Submit Feedback</Button>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Feedback;
