import React, { useState, useMemo } from 'react';
import { ONLINE_COURSE_DATA, USERS_DATA } from '../../constants';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/card/Card';
import Accordion from '../../components/ui/navigation/Accordion';
import Checkbox from '../../components/ui/Checkbox';
import ProgressBar from '../../components/ui/loading/ProgressBar';
import Tabs from '../../components/ui/navigation/Tabs';
import AvatarItem from '../../components/ui/avatar/AvatarItem';

const OnlineCourse: React.FC = () => {
    const course = ONLINE_COURSE_DATA;
    const instructor = USERS_DATA.find(u => u.id === course.instructorId);

    const [activeLecture, setActiveLecture] = useState(course.modules[0].lectures[0].id);
    const [completedLectures, setCompletedLectures] = useState<Set<string>>(new Set(['l1-1']));

    const handleLectureToggle = (lectureId: string) => {
        setCompletedLectures(prev => {
            const newSet = new Set(prev);
            if (newSet.has(lectureId)) {
                newSet.delete(lectureId);
            } else {
                newSet.add(lectureId);
            }
            return newSet;
        });
    };

    const { totalLectures, completionPercentage } = useMemo(() => {
        const total = course.modules.reduce((sum, module) => sum + module.lectures.length, 0);
        const completedCount = completedLectures.size;
        const percentage = total > 0 ? (completedCount / total) * 100 : 0;
        return { totalLectures: total, completionPercentage: percentage };
    }, [course.modules, completedLectures]);

    return (
        <div className="container mx-auto px-6 py-8">
            <PageHeader title={course.title} />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <main className="lg:col-span-8">
                    <Card>
                        {/* Video Player Placeholder */}
                        <div className="bg-neutral-900 aspect-video w-full flex items-center justify-center">
                            <i className="bi bi-play-circle-fill text-6xl text-white/50"></i>
                        </div>
                        <Card.Body>
                            <h2 className="text-2xl font-bold">{course.title}</h2>
                            <div className="my-4">
                                <ProgressBar progress={completionPercentage} showLabel />
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                                    {completedLectures.size} / {totalLectures} lectures completed
                                </p>
                            </div>
                             <Tabs tabs={[{id: 'overview', label: 'Overview'}, {id: 'instructor', label: 'Instructor'}]}>
                                {(activeTab) => (
                                    <div>
                                        {activeTab === 'overview' && <p className="text-neutral-700 dark:text-neutral-300">{course.description}</p>}
                                        {activeTab === 'instructor' && instructor && (
                                            <AvatarItem
                                                avatarProps={{ name: instructor.name, src: `https://picsum.photos/80/80?random=${instructor.id}`, size: 'lg' }}
                                                name={instructor.name}
                                                description={instructor.role}
                                            >
                                                <p className="text-sm mt-2 text-neutral-700 dark:text-neutral-300">{instructor.bio}</p>
                                            </AvatarItem>
                                        )}
                                    </div>
                                )}
                             </Tabs>
                        </Card.Body>
                    </Card>
                </main>

                {/* Curriculum Sidebar */}
                <aside className="lg:col-span-4">
                    <Card className="lg:sticky top-24">
                        <Card.Header><h3 className="font-bold">Course Content</h3></Card.Header>
                        <Card.Body>
                            <Accordion allowMultiple defaultOpenIndex={[0]}>
                                {course.modules.map(module => (
                                    <Accordion.Item key={module.id} title={`${module.title} (${module.lectures.length} lectures)`}>
                                        <ul className="space-y-2">
                                            {module.lectures.map(lecture => (
                                                <li key={lecture.id}>
                                                    <div 
                                                        onClick={() => setActiveLecture(lecture.id)}
                                                        className={`p-2 rounded-md cursor-pointer ${activeLecture === lecture.id ? 'bg-primary-background' : ''}`}
                                                    >
                                                        <Checkbox
                                                            id={lecture.id}
                                                            label={<span className="font-semibold">{lecture.title}</span>}
                                                            checked={completedLectures.has(lecture.id)}
                                                            onChange={() => handleLectureToggle(lecture.id)}
                                                        />
                                                        <p className="text-xs text-neutral-500 pl-7">{lecture.duration}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        </Card.Body>
                    </Card>
                </aside>
            </div>
        </div>
    );
};

export default OnlineCourse;