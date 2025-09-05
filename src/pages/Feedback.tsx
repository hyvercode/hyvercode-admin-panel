import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Textarea from '../components/ui/Textarea';
import Range from '../components/ui/range/Range';
import StarRating from '../components/ui/range/StarRating';
import { useForm, FormErrors } from '../hooks/useForm';

const validate = (values: any): FormErrors => {
  const errors: FormErrors = {};
  if (!values.easeOfUse || values.easeOfUse === 0) {
    errors.easeOfUse = 'Please provide a rating for ease of use.';
  }
  if (!values.satisfaction || values.satisfaction < 10) {
      errors.satisfaction = 'Minimum satisfaction score is 10.'
  }
  return errors;
};

const Feedback: React.FC = () => {
  const handleSubmit = (values: Record<string, any>) => {
    console.log('Feedback Form Submitted:', values);
    alert('Thank you for your feedback! Check the console for data.');
  };

  // FIX: Destructure `values` to explicitly pass to `StarRating` component.
  const { getFieldProps, handleSubmit: handleFormSubmit, setValues, values } = useForm(
    {
      satisfaction: 75,
      easeOfUse: 0,
      comments: '',
    },
    validate,
    handleSubmit
  );

  return (
    <div>
      <PageHeader
        title="Submit Feedback"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Feedback', path: '/feedback' }]}
      />

      <div className="bg-neutral-0 dark:bg-neutral-1000 p-8 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 max-w-2xl mx-auto">
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <Range
            label="Overall Satisfaction"
            min={0}
            max={100}
            step={5}
            {...getFieldProps('satisfaction')}
          />

          <StarRating
            label="Ease of Use"
            {...getFieldProps('easeOfUse')}
            // FIX: Explicitly pass the `value` prop to satisfy the `StarRatingProps` interface.
            // The `getFieldProps` hook returns a union type that TypeScript cannot resolve
            // when spread, causing it to believe `value` might be missing.
            value={values.easeOfUse}
            // The useForm hook provides onChange, but StarRating expects a specific signature.
            // We adapt it here.
            onChange={(rating: number) => setValues(prev => ({...prev, easeOfUse: rating}))}
          />
          
          <Textarea
            label="Additional Comments (Optional)"
            rows={4}
            {...getFieldProps('comments')}
          />
          
          <div className="pt-4 flex justify-end">
            <Button type="submit">
              Submit Feedback
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
