import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import DateRangePicker from '../components/ui/datetime/DateRangePicker';
import TimeRangePicker from '../components/ui/datetime/TimeRangePicker';
import { useForm, FormErrors } from '../hooks/useForm';

const validate = (values: any): FormErrors => {
  const errors: FormErrors = {};
  if (!values.requestType) errors.requestType = 'Request type is required.';
  if (!values.startDate) errors.startDate = 'Start date is required.';
  if (!values.endDate) errors.endDate = 'End date is required.';
  
  if (values.startDate && values.endDate && values.startDate > values.endDate) {
    errors.rangeError = 'End date cannot be before start date.';
  }

  if (values.startTime && values.endTime && values.startTime >= values.endTime) {
    errors.timeRangeError = 'End time must be after start time.';
  }
  
  return errors;
};

const Appointments: React.FC = () => {
  const handleSubmit = (values: Record<string, any>) => {
    console.log('Form Submitted:', values);
    alert('Request submitted successfully! Check the console.');
  };

  const { getFieldProps, handleSubmit: handleFormSubmit, errors } = useForm(
    {
      requestType: 'Vacation',
      startDate: '',
      endDate: '',
      startTime: '09:00',
      endTime: '17:00',
    },
    validate,
    handleSubmit
  );

  return (
    <div>
      <PageHeader
        title="Schedule Appointment"
        // FIX: Added missing 'path' property to breadcrumb item to match BreadcrumbItem type.
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Appointments', path: '/appointments' }]}
      />

      <div className="bg-neutral-0 dark:bg-neutral-1000 p-8 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900">
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <Input
            label="Request Type / Title"
            id="requestType"
            {...getFieldProps('requestType')}
          />
          <DateRangePicker
            label="Date Range"
            startFieldProps={getFieldProps('startDate')}
            endFieldProps={getFieldProps('endDate')}
            rangeError={errors.rangeError}
          />
          <TimeRangePicker
            label="Time Range (Optional)"
            startFieldProps={getFieldProps('startTime')}
            endFieldProps={getFieldProps('endTime')}
            rangeError={errors.timeRangeError}
          />
          
          <div className="pt-4 flex justify-end">
            <Button type="submit">
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Appointments;