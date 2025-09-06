
import React, { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/card/Card';
import Carousel from '../components/ui/content/Carousel';
import Image from '../components/ui/image/Image';
import CommentThread from '../components/ui/CommentThread';
import { COMMENTS_DATA } from '../constants';
import { Comment } from '../types';

const Content: React.FC = () => {
    const [comments, setComments] = useState<Omit<Comment, 'replies'>[]>(COMMENTS_DATA);

    const handleCommentSubmit = (text: string, parentId: number | null) => {
        const newComment = {
            id: Date.now(),
            authorId: 1, // Assume current user is Alice
            content: text,
            timestamp: 'Just now',
            parentId,
        };
        setComments(prev => [...prev, newComment]);
    };


    return (
        <div>
            <PageHeader
                title="Content"
                breadcrumbs={[{ name: 'UI Components', path: '#' }, { name: 'Content', path: '/admin/components/content' }]}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <Card>
                    <Card.Header><h3 className="font-semibold">Carousel</h3></Card.Header>
                    <Card.Body>
                        <Carousel>
                             <Image src="https://picsum.photos/seed/carousel1/800/450" alt="Slide 1" aspectRatio="16/9" rounded="none" />
                             <Image src="https://picsum.photos/seed/carousel2/800/450" alt="Slide 2" aspectRatio="16/9" rounded="none" />
                             <Image src="https://picsum.photos/seed/carousel3/800/450" alt="Slide 3" aspectRatio="16/9" rounded="none" />
                        </Carousel>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header><h3 className="font-semibold">Comment Thread</h3></Card.Header>
                    <Card.Body>
                        <CommentThread comments={comments} onCommentSubmit={handleCommentSubmit} />
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Content;
