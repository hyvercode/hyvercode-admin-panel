import React, { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Alert from '../components/ui/Alert';
import Badge from '../components/ui/Badge';
import Spinner from '../components/ui/loading/Spinner';
import Modal from '../components/ui/Modal';
import Tabs from '../components/ui/Tabs';
import Tooltip from '../components/ui/Tooltip';
import Table, { Column } from '../components/ui/Table';
import ButtonGroup from '../components/ui/ButtonGroup';
import SplitButton from '../components/ui/SplitButton';
import Dropdown from '../components/ui/Dropdown';
import Calendar from '../components/ui/Calendar';
import Checkbox from '../components/ui/Checkbox';
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
import { useForm, FormErrors } from '../hooks/useForm';

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
      
      {/* Avatars */}
      <ComponentSection title="Avatars">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          A suite of components for displaying user avatars, including presence indicators, groups, item layouts, and loading skeletons.
        </p>
        <div className="mt-4">
          <Button to="/avatars" rightIcon={<i className="bi bi-arrow-right"></i>}>
            View Live Avatar Demos
          </Button>
        </div>
         <CodeBlock>{`import Avatar from './components/ui/avatar/Avatar';
import AvatarGroup from './components/ui/avatar/AvatarGroup';

<Avatar name="John Doe" src="..." presence="online" />
<AvatarGroup users={[...]} />`}</CodeBlock>
      </ComponentSection>

      {/* Icons */}
      <ComponentSection title="Icons">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          A collection of components for displaying icons, including simple icons, styled icon tiles, and icon-object layouts for feature lists.
        </p>
        <div className="mt-4">
          <Button to="/icons" rightIcon={<i className="bi bi-arrow-right"></i>}>
            View Live Icon Demos
          </Button>
        </div>
         <CodeBlock>{`import Icon from './components/ui/icon/Icon';
import IconTile from './components/ui/icon/IconTile';

<Icon name="gear-fill" />
<IconTile iconName="shield-lock-fill" variant="primary" />`}</CodeBlock>
      </ComponentSection>

      {/* Images & Logos */}
      <ComponentSection title="Images & Logos">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Components for displaying images and logos with support for captions, aspect ratios, and variants.
        </p>
        <div className="mt-4">
          <Button to="/images" rightIcon={<i className="bi bi-arrow-right"></i>}>
            View Live Image Demos
          </Button>
        </div>
         <CodeBlock>{`import Image from './components/ui/image/Image';
import Logo from './components/ui/image/Logo';

<Image src="..." alt="..." caption="An example image." />
<Logo variant="full" />`}</CodeBlock>
      </ComponentSection>

      {/* Loaders */}
      <ComponentSection title="Loaders & Skeletons">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          A suite of components for indicating loading states, including progress bars, spinners, and content skeletons to improve perceived performance.
        </p>
        <div className="mt-4">
          <Button to="/loaders" rightIcon={<i className="bi bi-arrow-right"></i>}>
            View Live Loader Demos
          </Button>
        </div>
         <CodeBlock>{`import ProgressBar from './components/ui/loading/ProgressBar';
import Skeleton from './components/ui/loading/Skeleton';
import Spinner from './components/ui/loading/Spinner';

<Spinner size="lg" />
<ProgressBar progress={50} />
<Skeleton shape="box" />`}</CodeBlock>
      </ComponentSection>

      {/* Text Fields */}
      <ComponentSection title="Text Fields">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          A suite of specialized text field components for various input scenarios, including fields with icons, images, and addons for currency or URLs.
        </p>
        <div className="mt-4">
          <Button to="/text-fields" rightIcon={<i className="bi bi-arrow-right"></i>}>
            View Live Text Field Demos
          </Button>
        </div>
         <CodeBlock>{`// All text field components integrate with the useForm hook.
import TextFieldIcon from './components/ui/textfield/TextFieldIcon';
// See the /text-fields page for detailed examples.`}</CodeBlock>
      </ComponentSection>

      {/* Advanced Selects */}
      <ComponentSection title="Advanced Selects">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          A collection of powerful select components for handling complex data inputs like asynchronous loading, multi-selection, and dynamic option creation.
        </p>
        <div className="mt-4">
          <Button to="/advanced-selects" rightIcon={<i className="bi bi-arrow-right"></i>}>
            View Live Select Demos
          </Button>
        </div>
         <CodeBlock>{`// All select components integrate with the useForm hook.
import AsyncSelect from './components/ui/select/AsyncSelect';
// See the /advanced-selects page for detailed examples.`}</CodeBlock>
      </ComponentSection>

      {/* Forms */}
      <ComponentSection title="Forms">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          A suite of advanced, reusable form layouts with built-in validation. These components provide robust starting points for various data entry scenarios.
        </p>
        <div className="mt-4">
          <Button to="/forms" rightIcon={<i className="bi bi-arrow-right"></i>}>
            View Live Form Demos
          </Button>
        </div>
         <CodeBlock>{`// All forms are built using the useForm hook and reusable UI components.
import FormWizard from './components/ui/form/FormWizard';
// See the /forms page for detailed examples.`}</CodeBlock>
      </ComponentSection>

       {/* Buttons - REVISED SECTION */}
      <ComponentSection title="Buttons">
        <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Variants</h4>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="subtle">Subtle</Button>
          <Button variant="link">Link</Button>
        </div>

        <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Icon Buttons</h4>
         <div className="flex flex-wrap items-center gap-2 mb-4">
            <Button leftIcon={<i className="bi bi-plus-lg"></i>}>Add Item</Button>
            <Button rightIcon={<i className="bi bi-arrow-right"></i>}>Continue</Button>
            <Button variant="secondary" size="icon" aria-label="Settings"><i className="bi bi-gear-fill"></i></Button>
            <Button variant="subtle" size="sm-icon" aria-label="More"><i className="bi bi-three-dots-vertical"></i></Button>
        </div>
        
        <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Link Buttons</h4>
        <div className="flex flex-wrap items-center gap-2 mb-4">
            <Button to="/users" variant="primary">Internal Link</Button>
            <Button href="https://example.com" target="_blank" variant="secondary">External Link</Button>
        </div>

        <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Button Group</h4>
        <ButtonGroup className="mb-4">
            <Button variant="secondary">Copy</Button>
            <Button variant="secondary">Paste</Button>
            <Button variant="secondary">Cut</Button>
        </ButtonGroup>
        
        <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Split Button</h4>
        <SplitButton label="Create" onClick={() => alert('Primary action!')}>
            <Dropdown.Item icon={<i className="bi bi-file-earmark-plus"></i>}>New File</Dropdown.Item>
            <Dropdown.Item icon={<i className="bi bi-folder-plus"></i>}>New Folder</Dropdown.Item>
        </SplitButton>
        
        <CodeBlock>{`<Button variant="primary" leftIcon={<i className="bi bi-plus" />}>
  Add
</Button>

<ButtonGroup>
    <Button>One</Button>
    <Button>Two</Button>
</ButtonGroup>

<SplitButton label="Main" onClick={...}>
    <Dropdown.Item>Action 1</Dropdown.Item>
</SplitButton>`}</CodeBlock>
      </ComponentSection>

      <ComponentSection title="Alerts">
        <div className="space-y-4">
          <Alert variant="info" title="Information">
            This is an informational alert.
          </Alert>
          <Alert variant="success" title="Success!">
            Your operation was completed successfully.
          </Alert>
          <Alert variant="warning" title="Warning">
            Please be aware of this potential issue.
          </Alert>
          <Alert variant="danger" title="Error">
            There was an error processing your request.
          </Alert>
        </div>
        <CodeBlock>{`<Alert variant="success" title="Success!">
  Your operation was completed successfully.
</Alert>`}</CodeBlock>
      </ComponentSection>

      <ComponentSection title="Modals">
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title="Sample Modal"
          footer={
            <>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setModalOpen(false)}>Confirm</Button>
            </>
          }
        >
          <p className="text-neutral-800 dark:text-neutral-300">
            This is the main content of the modal. You can put any React components here.
          </p>
        </Modal>
        <CodeBlock>{`<Modal isOpen={...} onClose={...} title="My Modal">
  <p>Modal content...</p>
</Modal>`}</CodeBlock>
      </ComponentSection>
      
      <ComponentSection title="Comments">
         <CommentThread comments={COMMENTS_DATA} onCommentSubmit={handleCommentSubmit} />
         <CodeBlock>{`<CommentThread comments={...} onCommentSubmit={...} />`}</CodeBlock>
      </ComponentSection>
      
      <ComponentSection title="Textareas">
        <div className="space-y-4">
            <Textarea 
                label="Standard Textarea"
                id="doc-textarea"
                name="doc-textarea"
                placeholder="Enter standard text here..."
            />
             <RichTextArea
                label="Rich Text Area"
                id="doc-richtext"
                name="doc-richtext"
                value={richText}
                onChange={handleRichTextChange}
            />
        </div>
        <CodeBlock>{`<Textarea label="Standard" id="std" />
<RichTextArea label="Rich Text" id="rich" />`}</CodeBlock>
      </ComponentSection>
      
      <ComponentSection title="Date & Time Pickers">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DatePicker label="Single Date" {...getFieldProps('singleDate')} />
            <TimePicker label="Single Time" {...getFieldProps('singleTime')} />
            <div className="md:col-span-2">
                <DateRangePicker 
                    label="Date Range"
                    startFieldProps={getFieldProps('startDate')}
                    endFieldProps={getFieldProps('endDate')}
                    rangeError={errors.rangeError}
                />
            </div>
             <div className="md:col-span-2">
                <TimeRangePicker 
                    label="Time Range"
                    startFieldProps={getFieldProps('startTime')}
                    endFieldProps={getFieldProps('endTime')}
                    rangeError={errors.timeRangeError}
                />
            </div>
        </div>
         <CodeBlock>{`<DatePicker label="Event Date" id="event-date" />
<DateRangePicker label="Duration" startFieldProps={...} endFieldProps={...} />`}</CodeBlock>
      </ComponentSection>
      
      <ComponentSection title="Range & Rating">
        <div className="space-y-6">
            <Range 
                label="Adjust Volume"
                id="volume-range"
                value={rangeValue}
                onChange={(e) => setRangeValue(parseInt(e.target.value))}
            />
             <StarRating 
                label="Product Rating"
                id="product-rating"
                value={rating}
                onChange={setRating}
            />
        </div>
         <CodeBlock>{`<Range label="Value" id="range" />
<StarRating label="Feedback" id="rating" />`}</CodeBlock>
      </ComponentSection>
      
      <ComponentSection title="Toggles & Switches">
        <div className="space-y-6">
            <ToggleGroup label="Standard Toggles">
                <Toggle
                    label="Enable Feature A"
                    description="This is a standard on/off switch."
                    id="toggle-a"
                    name="toggle-a"
                />
            </ToggleGroup>
             <ToggleGroup label="Toggle Cards">
                 <ToggleCard 
                    id="toggle-card-b"
                    name="toggle-card-b"
                    icon={<i className="bi bi-shield-lock-fill"></i>}
                    title="Enable Advanced Security"
                    description="Requires two-factor authentication."
                 />
            </ToggleGroup>
        </div>
         <CodeBlock>{`<Toggle label="Setting" id="toggle" />
<ToggleCard title="Feature" id="card" />`}</CodeBlock>
      </ComponentSection>
      
      <ComponentSection title="Radio Buttons">
        <div className="space-y-6">
            <RadioGroup
                label="Select a Plan (Vertical)"
                name="plan-vertical"
                options={radioOptions}
                value={radioValue}
                onChange={(e) => setRadioValue(e.target.value)}
            />
             <RadioGroup
                label="Select an Option (Horizontal)"
                name="plan-horizontal"
                direction="horizontal"
                options={[{value: 'a', label: 'Option A'}, {value: 'b', label: 'Option B'}]}
                value="a"
            />
            <RadioGroup
                label="With Error"
                name="plan-error"
                options={radioOptions}
                value=""
                error="Please select an option."
            />
        </div>
        <CodeBlock>{`<RadioGroup label="Options" name="my-radio" options={[...]} />`}</CodeBlock>
      </ComponentSection>

      <ComponentSection title="Checkbox">
        <div className="space-y-4">
            <Checkbox label="Default checkbox" id="check-1" />
            <Checkbox label="Described checkbox" id="check-2" description="This is some help text." />
            <Checkbox label="Checked checkbox" id="check-3" defaultChecked />
             <Checkbox label="Disabled checkbox" id="check-4" disabled />
            <Checkbox label="Checkbox with error" id="check-5" error="This field is required." />
        </div>
        <CodeBlock>{`<Checkbox label="My Checkbox" id="my-check" />`}</CodeBlock>
      </ComponentSection>
      
      <ComponentSection title="Calendar">
        <Calendar events={CALENDAR_EVENTS_DATA} />
        <CodeBlock>{`<Calendar events={...} />`}</CodeBlock>
      </ComponentSection>

      <ComponentSection title="Misc Components">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Inputs & Selects</h4>
            <div className="space-y-4">
              <Input label="Email" id="doc-email" type="email" placeholder="you@example.com" />
              <Input label="With Error" id="doc-error" type="text" defaultValue="Invalid" error="Please correct this field."/>
              <Select label="Options" id="doc-select" options={[{value: '1', label: 'Option 1'}, {value: '2', label: 'Option 2'}]} />
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Badges</h4>
            <div className="flex flex-wrap items-start gap-2 mb-4">
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Tabs</h4>
            <Tabs tabs={[{id: 'a', label: 'Tab One'}, {id: 'b', label: 'Tab Two'}]}>
              {(activeTab) => <div>Content for {activeTab}</div>}
            </Tabs>
          </div>
           <div>
            <h4 className="font-semibold mb-2">Tooltip</h4>
            <div className="flex gap-4 pt-4">
              <Tooltip content="Tooltip on top">
                <Button variant="secondary">Top</Button>
              </Tooltip>
              <Tooltip content="Tooltip on right" position="right">
                <Button variant="secondary">Right</Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </ComponentSection>
      
       <ComponentSection title="Table">
          <Table<any>
            columns={tableColumns}
            data={tableData}
          />
           <CodeBlock>{`<Table columns={[...]} data={[...]} />`}</CodeBlock>
      </ComponentSection>

    </div>
  );
};

export default Documentation;