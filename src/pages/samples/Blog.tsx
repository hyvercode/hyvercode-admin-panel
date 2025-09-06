
import React from 'react';
import { BLOG_POSTS_DATA, USERS_DATA } from '../../constants';
import Card from '../../components/ui/card/Card';
import Image from '../../components/ui/image/Image';
import Avatar from '../../components/ui/avatar/Avatar';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const Blog: React.FC = () => {
    return (
        <div className="bg-neutral-100 dark:bg-neutral-1100">
            <div className="container mx-auto px-6 py-12">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold">Our Blog</h1>
                    <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">Insights, tutorials, and updates from our team.</p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS_DATA.map(post => {
                        const author = USERS_DATA.find(u => u.id === post.authorId);
                        return (
                            <Card key={post.id} className="flex flex-col">
                                <Image src={post.imageUrl} alt={post.title} aspectRatio="16/9" />
                                <Card.Body className="flex flex-col flex-grow">
                                    <Badge variant="primary" className="self-start">{post.category}</Badge>
                                    <h2 className="text-xl font-bold mt-3 hover:text-primary transition-colors cursor-pointer">{post.title}</h2>
                                    <p className="mt-2 text-neutral-600 dark:text-neutral-400 flex-grow">{post.excerpt}</p>
                                    <div className="mt-6 flex items-center justify-between">
                                        <div className="flex items-center">
                                            {author && <Avatar name={author.name} src={`https://i.pravatar.cc/40?u=${author.email}`} size="sm" />}
                                            <div className="ml-3 text-sm">
                                                <p className="font-semibold">{author?.name}</p>
                                                <p className="text-neutral-500">{post.publishDate}</p>
                                            </div>
                                        </div>
                                        <Button variant="link">Read More</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Blog;
