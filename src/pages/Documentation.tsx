import React, { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Alert from '../components/ui/Alert';
import Badge from '../components/ui/Badge';
import Spinner from '../components/ui/Spinner';
import Modal from '../components/ui/Modal';
import Tabs from '../components/ui/Tabs';
import Avatar from '../components/ui/Avatar';
import Tooltip from '../components/ui/Tooltip';
import Table, { Column } from '../components/ui/Table';
import ButtonGroup from '../components/ui/ButtonGroup';
import SplitButton from '../components/ui/SplitButton';
import Dropdown from '../components/ui/Dropdown';
import Calendar from '../components/ui/Calendar';
import Checkbox from '../components/ui/Checkbox';
import Comment from '../components/ui/Comment';
import CommentInput from '../components/ui/CommentInput';
import CommentThread from '../components/ui/CommentThread';
import DatePicker from '../components/ui/datetime/DatePicker';
import TimePicker from '../components/ui/datetime/TimePicker';
import DateRangePicker from '../components/ui/datetime/DateRangePicker';
import TimeRangePicker from '../components/ui/datetime/TimeRangePicker';
import RadioGroup from '../components/ui/radio/RadioGroup';
import Range from '../components/ui/range/Range';
import StarRating from '../components/ui/range/StarRating';
import Textarea from '../components/ui/textarea/Textarea';
import RichTextArea from '../components/ui/textarea/RichTextArea';
import { CALENDAR_EVENTS_DATA, COMMENTS_DATA } from '../constants';
import Toggle from '../components/ui/toggle/Toggle';
import ToggleCard from '../components/ui/toggle/ToggleCard';
import ToggleGroup from '../components/ui/toggle/ToggleGroup';
import { useAuth } from '../contexts/AuthContext';
import { useForm, FormErrors } from '../hooks/useForm';
import { Link } from 'react-router-dom';


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

const tableData = [
  { id: 1, name: 'Confluence', type: 'Software', status: 'Active' },
  { id: 2, name: 'Jira', type: 'Software', status: 'Active' },
  { id: 3, name: 'Bitbucket', type: 'Service', status: 'Inactive' },
];
const tableColumns: Column<(typeof tableData)[0]>[] = [
    { header: 'Name', accessor: 'name' },
    { header: 'Type', accessor: 'type' },
    { header: 'Status', accessor: item => <Badge variant={item.status === 'Active' ? 'success' : 'neutral'}>{item.status}</Badge> }
];


const Documentation: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();
  const [radioValue, setRadioValue] = useState('basic');
  const [rating, setRating] = useState(3);
  const [rangeValue, setRangeValue] = useState(50);
  const [richText, setRichText] = useState('<p>This is some <b>initial</b> rich text.</p>');

  const handleRichTextChange = (e: React.ChangeEvent<any>) => {
      setRichText(e.target.value);
  };
  
  const handleCommentSubmit = (text: string, parentId: number | null) => {
    console.log(`Submitting comment: "${text}" to parent: ${parentId}`);
    alert('Comment submitted! Check the console.');
  };

  const { getFieldProps, errors } = useForm({
      singleDate: '',
      singleTime: '',
      startDate: '2024-08-15',
      endDate: '2024-08-10', // intentional error for demo
      startTime: '14:00',
      endTime: '11:00', // intentional error for demo
    }, (values): FormErrors => {
        const err: FormErrors = {};
        if (values.startDate && values.endDate && values.startDate > values.endDate) {
            err.rangeError = 'End date cannot be before start date.';
        }
         if (values.startTime && values.endTime && values.startTime > values.endTime) {
            err.timeRangeError = 'End time must be after start time.';
        }
        return err;
    }, () => {});

  const radioOptions = [
    { value: 'basic', label: 'Basic' },
    { value: 'standard', label: 'Standard' },
    { value: 'premium', label: 'Premium' },
  ];

  return (
    <div>
      <PageHeader
        title="Component Documentation"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Documentation', path: '/documentation' }]}
      />
      
      {/* Text Fields */}
      <ComponentSection title="Text Fields">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          A suite of specialized text field components for various input scenarios, including fields with icons, images, and addons for currency or URLs.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-neutral-800 dark:text-neutral-200">
            <li><span className="font-semibold">Contextual Inputs:</span> Use icons, images, or text addons to provide context to the user.</li>
            <li><span className="font-semibold">Specialized Inputs:</span> Includes dedicated components for number and currency entry.</li>
            <li><span className="font-semibold">Validated:</span> All components integrate seamlessly with the `useForm` hook.</li>
        </ul>
        <div className="mt-4">
          <Button to="/text-fields" rightIcon={<i className="bi bi-arrow-right"></i>}>
            View Live Text Field Demos
          </Button>
        </div>
         <CodeBlock>{`// All text field components integrate with the useForm hook.
import TextFieldIcon from './components/ui/textfield/TextFieldIcon';
import TextFieldGroup from './components/ui/textfield/TextFieldGroup';

<TextFieldIcon iconLeft={<i />} {...getFieldProps('email')} />
<TextFieldGroup addonLeft="https://..." {...getFieldProps('website')} />
// See the /text-fields page for detailed examples.`}</CodeBlock>
      </ComponentSection>

      {/* Advanced Selects */}
      <ComponentSection title="Advanced Selects">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          A collection of powerful select components for handling complex data inputs like asynchronous loading, multi-selection, and dynamic option creation.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-neutral-800 dark:text-neutral-200">
            <li><span className="font-semibold">Async & Creatable:</span> Fetch options remotely or add new ones on the fly.</li>
            <li><span className="font-semibold">Multi-Select & Radio Select:</span> User-friendly interfaces for multiple or single choices.</li>
            <li><span className="font-semibold">Specialized Inputs:</span> Includes pre-populated Country select and a lightweight Autocomplete.</li>
        </ul>
        <div className="mt-4">
          <Button to="/advanced-selects" rightIcon={<i className="bi bi-arrow-right"></i>}>
            View Live Select Demos
          </Button>
        </div>
         <CodeBlock>{`// All select components integrate with the useForm hook.
import AsyncSelect from './components/ui/select/AsyncSelect';
import MultiSelect from './components/ui/select/MultiSelect';

<AsyncSelect loadOptions={...} {...getFieldProps('assignee')} />
<MultiSelect options={...} selectedValues={...} onChange={...} />
// See the /advanced-selects page for detailed examples.`}</CodeBlock>
      </ComponentSection>

      {/* Forms */}
      <ComponentSection title="Forms">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          A suite of advanced, reusable form layouts with built-in validation. These components provide robust starting points for various data entry scenarios.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-neutral-800 dark:text-neutral-200">
            <li><span className="font-semibold">Simple & Complex Layouts:</span> For basic needs and multi-column arrangements.</li>
            <li><span className="font-semibold">Wizard & Tabbed Forms:</span> To guide users through steps or organize complex data.</li>
            <li><span className="font-semibold">Dynamic & Upload Forms:</span> For creating line items on the fly or handling file uploads.</li>
        </ul>
        <div className="mt-4">
          <Button to="/forms" rightIcon={<i className="bi bi-arrow-right"></i>}>
            View Live Form Demos
          </Button>
        </div>
         <CodeBlock>{`// All forms are built using the useForm hook and reusable UI components.
import FormSimple from './components/ui/form/FormSimple';
import FormWizard from './components/ui/form/FormWizard';

<FormSimple />
<FormWizard />
// See the /forms page for detailed examples.`}</CodeBlock>
      </ComponentSection>

       {/* Buttons - REVISED SECTION */}
      <ComponentSection title="Buttons">
        <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Variants</h4>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="subtle">Subtle</Button>
          <Button variant="link">Link</Button>
        </div>
        <CodeBlock>{`<Button variant="primary">Primary</Button>`}</CodeBlock>

        <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mt-6 mb-2">With Icons</h4>
         <div className="flex flex-wrap items-center gap-2">
            <Button variant="primary" leftIcon={<i className="bi bi-star-fill"></i>}>Left Icon</Button>
            <Button variant="secondary" rightIcon={<i className="bi bi-arrow-right"></i>}>Right Icon</Button>
        </div>
        <CodeBlock>{`<Button leftIcon={<i />} rightIcon={<i />}>...</Button>`}</CodeBlock>

        <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Icon-only Buttons</h4>
        <div className="flex flex-wrap items-center gap-2">
          <Tooltip content="Add Item">
            <Button variant="primary" size="icon" aria-label="Add Item"><i className="bi bi-plus-lg"></i></Button>
          </Tooltip>
          <Tooltip content="Settings">
            <Button variant="secondary" size="icon" aria-label="Settings"><i className="bi bi-gear-fill"></i></Button>
          </Tooltip>
          <Tooltip content="Delete">
            <Button variant="danger" size="icon" aria-label="Delete"><i className="bi bi-trash-fill"></i></Button>
          </Tooltip>
        </div>
        <CodeBlock>{`<Button size="icon" aria-label="..."><i /></Button>`}</CodeBlock>

        <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Link Buttons</h4>
        <div className="flex flex-wrap items-center gap-2">
          <Button to="/settings" variant="primary">Internal Link</Button>
          <Button href="https://google.com" target="_blank" variant="secondary">External Link</Button>
        </div>
        <CodeBlock>{`<Button to="/internal">...</Button>
<Button href="https://..." target="_blank">...</Button>`}</CodeBlock>

        <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mt-6 mb-2">States</h4>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary" isLoading>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
        <CodeBlock>{`<Button isLoading>Loading</Button>
<Button disabled>Disabled</Button>`}</CodeBlock>
      </ComponentSection>

      {/* Toggles */}
      <ComponentSection title="Toggles & Switches">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">A collection of toggle components for boolean state management.</p>
        <div className="space-y-4">
            <ToggleGroup label="Example Group">
                <Toggle
                    id="doc-toggle"
                    label="Standard Toggle"
                    description="A simple on/off switch."
                />
            </ToggleGroup>
            <ToggleCard
                id="doc-toggle-card"
                icon={<i className="bi bi-bell-fill"></i>}
                title="Toggle Card"
                description="A visually rich toggle component."
            />
        </div>
        <CodeBlock>{`<ToggleGroup label="...">
  <Toggle id="..." label="..." />
</ToggleGroup>
<ToggleCard id="..." title="..." />`}</CodeBlock>
      </ComponentSection>

      {/* ButtonGroup and SplitButton */}
       <ComponentSection title="Button Groups & Split Buttons">
          <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Button Group</h4>
          <ButtonGroup>
            <Button variant="secondary">Years</Button>
            <Button variant="secondary">Months</Button>
            <Button variant="secondary">Days</Button>
          </ButtonGroup>
          <CodeBlock>{`<ButtonGroup>
  <Button>...</Button>
  <Button>...</Button>
</ButtonGroup>`}</CodeBlock>

          <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Split Button</h4>
          <SplitButton label="Primary Action" onClick={() => alert('Primary action!')}>
              <Dropdown.Item>Action One</Dropdown.Item>
              <Dropdown.Item>Action Two</Dropdown.Item>
              <Dropdown.Item>Another Action</Dropdown.Item>
          </SplitButton>
          <CodeBlock>{`<SplitButton label="Primary Action" onClick={...}>
  <Dropdown.Item>...</Dropdown.Item>
  <Dropdown.Item>...</Dropdown.Item>
</SplitButton>`}</CodeBlock>
      </ComponentSection>
      
      {/* Textareas */}
      <ComponentSection title="Textareas">
        <div className="space-y-6">
            <div>
                <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Standard Textarea</h4>
                <Textarea
                    label="Your Message"
                    id="doc-textarea"
                    rows={4}
                    placeholder="Enter your message here..."
                />
                <CodeBlock>{`<Textarea label="Your Message" id="doc-textarea" />`}</CodeBlock>
            </div>
            <div>
                <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Rich Text Area</h4>
                <RichTextArea
                    label="Article Content"
                    id="doc-richtext"
                    name="doc-richtext"
                    value={richText}
                    onChange={handleRichTextChange}
                />
                <CodeBlock>{`// Uses a contentEditable div and document.execCommand
// It is integrated with the useForm hook.
<RichTextArea label="Article Content" {...getFieldProps('content')} />`}</CodeBlock>
            </div>
        </div>
      </ComponentSection>

      {/* Date & Time Pickers */}
      <ComponentSection title="Date & Time Pickers">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">A suite of components for selecting dates and times, with validation support.</p>
        <div className="space-y-4">
          <DatePicker label="Appointment Date" {...getFieldProps('singleDate')} />
          <TimePicker label="Appointment Time" {...getFieldProps('singleTime')} />
          <DateRangePicker
            label="Date Range (with validation)"
            startFieldProps={getFieldProps('startDate')}
            endFieldProps={getFieldProps('endDate')}
            rangeError={errors.rangeError}
          />
           <TimeRangePicker
            label="Time Range (with validation)"
            startFieldProps={getFieldProps('startTime')}
            endFieldProps={getFieldProps('endTime')}
            rangeError={errors.timeRangeError}
          />
        </div>
        <CodeBlock>{`// Single Pickers
<DatePicker label="Date" {...getFieldProps('date')} />
<TimePicker label="Time" {...getFieldProps('time')} />

// Range Pickers
<DateRangePicker
  label="Date Range"
  startFieldProps={getFieldProps('startDate')}
  endFieldProps={getFieldProps('endDate')}
  rangeError={errors.rangeError}
/>`}</CodeBlock>
      </ComponentSection>

      {/* Comments */}
      <ComponentSection title="Comments">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">A suite of components for discussions and threads.</p>
        <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2 mt-4">Single Comment</h4>
        <Comment author="Alice" timestamp="2 hours ago" avatarSrc="https://picsum.photos/50/50?random=1" actions={<Button variant="link" size="sm">Reply</Button>}>
          This is a sample comment to demonstrate the component's appearance.
        </Comment>
        <CodeBlock>{`<Comment author="Alice" timestamp="2h ago" avatarSrc="...">...</Comment>`}</CodeBlock>
        
        <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2 mt-6">Comment Thread</h4>
        <CommentThread comments={COMMENTS_DATA.filter(c => c.taskId === 1)} onCommentSubmit={handleCommentSubmit} />
        <CodeBlock>{`<CommentThread comments={...} onCommentSubmit={...} />`}</CodeBlock>
      </ComponentSection>

      {/* Calendar */}
      <ComponentSection title="Calendar">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">A component to display events in a monthly view.</p>
        <Calendar events={CALENDAR_EVENTS_DATA.slice(0, 3)} />
        <CodeBlock>{`const myEvents = [
  { id: 1, title: 'Team Meeting', date: '2024-08-02', category: 'primary' },
  { id: 2, title: 'Product Launch', date: '2024-08-05', category: 'success' },
];
<Calendar events={myEvents} />`}</CodeBlock>
      </ComponentSection>

      {/* Form Controls */}
      <ComponentSection title="Form Controls">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Email Address" id="doc-email" placeholder="email@example.com" />
          <Select label="Project" id="doc-project" options={[{value: 'jira', label: 'Jira'}, {value: 'confluence', label: 'Confluence'}]} />
        </div>
        <div className="mt-6 space-y-4">
            <Checkbox id="doc-check-1" label="Default Checkbox" />
            <Checkbox id="doc-check-2" label="With Description" description="This is some helper text for the checkbox." />
            <Checkbox id="doc-check-3" label="Pre-checked" defaultChecked />
            <Checkbox id="doc-check-4" label="Disabled" disabled />
            <Checkbox id="doc-check-5" label="With Error" error="This field is required." />
        </div>
        <CodeBlock>{`{/* Input */}
<Input label="Email Address" id="doc-email" />

{/* Select */}
<Select label="Project" id="doc-project" options={[...]} />

{/* Checkbox */}
<Checkbox id="unique-id" label="My Label" />`}</CodeBlock>
      </ComponentSection>

      {/* Radio Buttons */}
      <ComponentSection title="Radio Buttons">
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Default (Vertical)</h4>
            <RadioGroup
              label="Select a Plan"
              name="plan-vertical"
              options={radioOptions}
              value={radioValue}
              onChange={(e) => setRadioValue(e.target.value)}
            />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Horizontal</h4>
            <RadioGroup
              label="Select a Plan"
              name="plan-horizontal"
              options={radioOptions}
              value={radioValue}
              onChange={(e) => setRadioValue(e.target.value)}
              direction="horizontal"
            />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">With Error</h4>
            <RadioGroup
              label="Select a Plan"
              name="plan-error"
              options={radioOptions}
              value=""
              onChange={() => {}}
              error="This field is required."
            />
          </div>
        </div>
        <CodeBlock>{`const options = [
  { value: 'basic', label: 'Basic' },
  { value: 'premium', label: 'Premium' },
];
<RadioGroup
  label="Select a Plan"
  name="plan"
  options={options}
  {...getFieldProps('plan')}
/>`}</CodeBlock>
      </ComponentSection>

      {/* Range & Rating */}
      <ComponentSection title="Range & Rating">
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Range Slider</h4>
            <Range 
              label="Volume" 
              id="doc-range" 
              min={0} 
              max={100} 
              value={rangeValue} 
              onChange={(e) => setRangeValue(Number(e.target.value))} 
            />
          </div>
           <div>
            <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Star Rating</h4>
            <StarRating 
              label="Product Rating" 
              id="doc-rating" 
              value={rating} 
              onChange={setRating} 
            />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">With Error</h4>
             <StarRating 
              label="Required Rating" 
              id="doc-rating-error" 
              value={0} 
              onChange={() => {}} 
              error="This field is required."
            />
          </div>
        </div>
         <CodeBlock>{`// Range Slider
<Range label="Volume" {...getFieldProps('volume')} />

// Star Rating
<StarRating label="Rating" {...getFieldProps('rating')} onChange={(val) => setValues(...)} />
`}</CodeBlock>
      </ComponentSection>

      {/* Alerts & Badges */}
      <ComponentSection title="Alerts & Badges">
        <div className="space-y-4 mb-6">
            <Alert variant="info">This is an informational message.</Alert>
            <Alert variant="success">Your action was successful.</Alert>
            <Alert variant="warning">Please be aware of this warning.</Alert>
            <Alert variant="danger">An error occurred.</Alert>
        </div>
        <div className="space-x-2">
            <Badge variant="neutral">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
        </div>
        <CodeBlock>{`<Alert variant="info">...</Alert>
<Badge variant="success">Success</Badge>`}</CodeBlock>
      </ComponentSection>

       {/* Modal */}
      <ComponentSection title="Modal">
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title="Sample Modal"
          footer={<><Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={() => setModalOpen(false)}>Confirm</Button></>}
        >
          <p>This is the content of the modal. You can put any React components here.</p>
        </Modal>
        <CodeBlock>{`<Modal isOpen={...} onClose={...} title="Sample Modal">...
</Modal>`}</CodeBlock>
      </ComponentSection>

      {/* Table */}
      <ComponentSection title="Table">
        <Table columns={tableColumns} data={tableData} />
        <CodeBlock>{`const columns = [...];
<Table columns={columns} data={data} />`}</CodeBlock>
      </ComponentSection>
      
      {/* Other Components */}
      <ComponentSection title="Other Components">
        <div className="flex items-center space-x-8">
            <div className="text-center"><p className="mb-2 text-sm">Avatar</p><Avatar name="Admin User" src="https://picsum.photos/100" /></div>
            <div className="text-center"><p className="mb-2 text-sm">Spinner</p><Spinner size="lg" /></div>
            <div className="text-center"><p className="mb-2 text-sm">Tooltip</p><Tooltip content="This is a tooltip!"><Button variant="subtle">Hover Me</Button></Tooltip></div>
        </div>
         <CodeBlock>{`<Avatar name="Admin User" />
<Spinner size="lg" />
<Tooltip content="..."><Button>...</Button></Tooltip>`}</CodeBlock>
      </ComponentSection>

      {/* Tabs */}
      <ComponentSection title="Tabs">
          <Tabs tabs={[{id: 'tab1', label: 'Tab One'}, {id: 'tab2', label: 'Tab Two'}]}>
              {(activeTab) => (
                  <div>
                      {activeTab === 'tab1' && <p>Content for Tab One.</p>}
                      {activeTab === 'tab2' && <p>Content for Tab Two.</p>}
                  </div>
              )}
          </Tabs>
          <CodeBlock>{`<Tabs tabs={[...]} />`}</CodeBlock>
      </ComponentSection>
      
    </div>
  );
};

export default Documentation;