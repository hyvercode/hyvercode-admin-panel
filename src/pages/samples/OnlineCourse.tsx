
import React from 'react';
import { ONLINE_COURSE_DATA, USERS_DATA } from '../../constants';
import Card from '../../components/ui/card/Card';
import AvatarItem from '../../components/ui/avatar/AvatarItem';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/loading/ProgressBar';
import Accordion from '../../components/ui/navigation/Accordion';

const OnlineCourse: React.FC = () => {
    const course = ONLINE_COURSE_DATA;
    const instructor = USERS_DATA.find(u => u.id === course.instructorId);

    return (
        <div className="bg-neutral-100 dark:bg-neutral-1100">
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Course Content */}
                    <div className="lg:col-span-2">
                        <Card>
                            <Card.Body>
                                <h1 className="text-3xl font-bold">{course.title}</h1>
                                <p className="mt-2 text-neutral-600 dark:text-neutral-400">{course.description}</p>
                                {instructor && 
                                    <div className="mt-4">
                                        <AvatarItem 
                                            avatarProps={{ name: instructor.name, src: `https://i.pravatar.cc/50?u=${instructor.email}` }}
                                            name={instructor.name}
                                            description="Lead Developer @ Company"
                                        />
                                    </div>
                                }
                            </Card.Body>
                        </Card>
                        
                        <div className="mt-6">
                            <h2 className="text-xl font-bold mb-4">Course Curriculum</h2>
                            <Accordion allowMultiple>
                                {course.modules.map(module => (
                                    <Accordion.Item key={module.id} title={module.title}>
                                        <ul className="space-y-3">
                                            {module.lectures.map(lecture => (
                                                <li key={lecture.id} className="flex items-center justify-between p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900">
                                                    <div className="flex items-center">
                                                        <i className="bi bi-play-circle-fill text-primary mr-3"></i>
                                                        <span>{lecture.title}</span>
                                                    </div>
                                                    <span className="text-sm text-neutral-500">{lecture.duration}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Card>
                            <Card.Body>
                                <ProgressBar progress={25} showLabel />
                                <p className="text-sm text-center my-2">25% Complete</p>
                                <Button fullWidth size="default">Continue Learning</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnlineCourse;
