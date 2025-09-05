import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Alert from '../components/ui/Alert';
import Badge from '../components/ui/Badge';
import ButtonGroup from '../components/ui/ButtonGroup';
import SplitButton from '../components/ui/SplitButton';
import Dropdown from '../components/ui/navigation/Dropdown';
import Calendar from '../components/ui/Calendar';
import Checkbox from '../components/ui/Checkbox';
import CommentThread from '../components/ui/CommentThread';
import DatePicker from '../components/ui/datetime/DatePicker';
import DateRangePicker from '../components/ui/datetime/DateRangePicker';
import RadioGroup from '../components/ui/radio/RadioGroup';
import Range from '../components/ui/range/Range';
import StarRating from '../components/ui/range/StarRating';
import Textarea from '../components/ui/textarea/Textarea';
import RichTextArea from '../components/ui/textarea/RichTextArea';
import { CALENDAR_EVENTS_DATA, COMMENTS_DATA } from '../constants';
import Toggle from '../components/ui/toggle/Toggle';
import ToggleCard from '../components/ui/toggle/ToggleCard';
import ToggleGroup from '../components/ui/toggle/ToggleGroup';
import { useForm } from '../hooks/useForm';

const CodeBlock: React.FC<{ children: string }> = ({ children }) => (
  <pre className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg mt-4 text-sm text-neutral-800 dark:text-neutral-200 overflow-x-auto">
    <code>{children.trim()}</code>
  </pre>
);

const ComponentSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-neutral-0 dark:bg-neutral-1000 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 mb-8">
    <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">{title}</h3>
    {children}
  </div>
);

const Documentation: React.FC = () => {
  const [radioValue, setRadioValue] = React.useState('basic');
  const [rating, setRating] = React.useState(3);
  const [rangeValue, setRangeValue] = React.useState(50);
  const [richText, setRichText] = React.useState('<p>This is some <b>initial</b> rich text.</p>');

  const handleRichTextChange = (e: React.ChangeEvent<any>) => setRichText(e.target.value);
  const handleCommentSubmit = (text: string, parentId: number | null) => alert('Comment submitted! Check the console.');

  const { getFieldProps } = useForm({
      singleDate: '',
      startDate: '',
      endDate: '',
    }, () => ({}), () => {});

  return (
    <div>
      <PageHeader
        title="Component Documentation"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Documentation', path: '/documentation' }]}
      />
      
      <ComponentSection title="Avatars">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          A suite of components for displaying user avatars.
        </p>
        <Button to="/avatars" rightIcon={<i className="bi bi-arrow-right"></i>}>View Live Avatar Demos</Button>
      </ComponentSection>

      <ComponentSection title="Icons">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          A collection of components for displaying icons.
        </p>
        <Button to="/icons" rightIcon={<i className="bi bi-arrow-right"></i>}>View Live Icon Demos</Button>
      </ComponentSection>

      <ComponentSection title="Images & Logos">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Components for displaying images and logos.
        </p>
        <Button to="/images" rightIcon={<i className="bi bi-arrow-right"></i>}>View Live Image Demos</Button>
      </ComponentSection>

      <ComponentSection title="Loaders & Skeletons">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Components for indicating loading states.
        </p>
        <Button to="/loaders" rightIcon={<i className="bi bi-arrow-right"></i>}>View Live Loader Demos</Button>
      </ComponentSection>

      <ComponentSection title="Navigation">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Components for navigation, including accordions, breadcrumbs, links, and pagination.
        </p>
        <Button to="/navigation" rightIcon={<i className="bi bi-arrow-right"></i>}>View Live Navigation Demos</Button>
      </ComponentSection>
      
      <ComponentSection title="Overlays">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Components for overlays like modals, drawers, and toasts.
        </p>
        <Button to="/overlays" rightIcon={<i className="bi bi-arrow-right"></i>}>View Live Overlay Demos</Button>
      </ComponentSection>
      
       <ComponentSection title="Content">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Components for displaying content, such as enhanced cards and carousels.
        </p>
        <Button to="/content" rightIcon={<i className="bi bi-arrow-right"></i>}>View Live Content Demos</Button>
      </ComponentSection>

      <ComponentSection title="Forms">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          A suite of advanced, reusable form layouts with built-in validation.
        </p>
        <Button to="/forms" rightIcon={<i className="bi bi-arrow-right"></i>}>View Live Form Demos</Button>
      </ComponentSection>
      
      <ComponentSection title="Text Fields">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          A suite of specialized text field components.
        </p>
        <Button to="/text-fields" rightIcon={<i className="bi bi-arrow-right"></i>}>View Live Text Field Demos</Button>
      </ComponentSection>

      <ComponentSection title="Advanced Selects">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          A collection of powerful select components for complex data inputs.
        </p>
        <Button to="/advanced-selects" rightIcon={<i className="bi bi-arrow-right"></i>}>View Live Select Demos</Button>
      </ComponentSection>

      <ComponentSection title="Buttons">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
        </div>
        <ButtonGroup className="mb-4">
            <Button variant="secondary">Copy</Button>
            <Button variant="secondary">Paste</Button>
        </ButtonGroup>
        <SplitButton label="Create" onClick={() => alert('Primary action!')}>
            <Dropdown.Item>New File</Dropdown.Item>
        </SplitButton>
      </ComponentSection>

      <ComponentSection title="Alerts">
        <div className="space-y-4">
          <Alert variant="info">This is an informational alert.</Alert>
          <Alert variant="success">Operation completed successfully.</Alert>
        </div>
      </ComponentSection>
      
      <ComponentSection title="Comments">
         <CommentThread comments={COMMENTS_DATA} onCommentSubmit={handleCommentSubmit} />
      </ComponentSection>
      
      <ComponentSection title="Textareas">
        <div className="space-y-4">
            <Textarea label="Standard Textarea" id="doc-textarea" name="doc-textarea" />
             <RichTextArea
                label="Rich Text Area"
                id="doc-richtext"
                name="doc-richtext"
                value={richText}
                onChange={handleRichTextChange}
            />
        </div>
      </ComponentSection>
      
      <ComponentSection title="Date & Time Pickers">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DatePicker label="Single Date" {...getFieldProps('singleDate')} />
            <DateRangePicker 
                label="Date Range"
                startFieldProps={getFieldProps('startDate')}
                endFieldProps={getFieldProps('endDate')}
            />
        </div>
      </ComponentSection>
      
      <ComponentSection title="Range & Rating">
        <div className="space-y-6">
            <Range label="Adjust Volume" id="volume-range" value={rangeValue} onChange={(e) => setRangeValue(parseInt(e.target.value))} />
            <StarRating label="Product Rating" id="product-rating" value={rating} onChange={setRating} />
        </div>
      </ComponentSection>
      
      <ComponentSection title="Toggles & Switches">
          <Button to="/toggles" rightIcon={<i className="bi bi-arrow-right"></i>}>View Live Toggle Demos</Button>
      </ComponentSection>
      
      <ComponentSection title="Radio Buttons">
        <RadioGroup
            label="Select a Plan"
            name="plan-vertical"
            options={[{value:'basic', label:'Basic'}, {value:'pro', label:'Pro'}]}
            value={radioValue}
            onChange={(e) => setRadioValue(e.target.value)}
        />
      </ComponentSection>

      <ComponentSection title="Checkbox">
        <Checkbox label="Default checkbox" id="check-1" />
      </ComponentSection>
      
      <ComponentSection title="Calendar">
        <Calendar events={CALENDAR_EVENTS_DATA} />
      </ComponentSection>

      <ComponentSection title="Misc Components">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Inputs & Selects</h4>
            <div className="space-y-4">
              <Input label="Email" id="doc-email" type="email" />
              <Select label="Options" id="doc-select" options={[{value: '1', label: 'Option 1'}]} />
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Badges</h4>
            <div className="flex flex-wrap items-start gap-2 mb-4">
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
            </div>
          </div>
        </div>
      </ComponentSection>

    </div>
  );
};

export default Documentation;
