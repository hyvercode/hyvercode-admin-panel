import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS_DATA, USERS_DATA } from '../../constants';
import { BlogPost } from '../../types';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/card/Card';
import Image from '../../components/ui/image/Image';
import Pagination from '../../components/ui/navigation/Pagination';
import AvatarItem from '../../components/ui/avatar/AvatarItem';
import Input from '../../components/ui/Input';
import ListGroup from '../../components/ui/navigation/ListGroup';

const PostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
    const author = USERS_DATA.find(u => u.id === post.authorId);
    return (
        <Card>
            <Image src={post.imageUrl} alt={post.title} aspectRatio="16/9" rounded="none" />
            <Card.Body>
                <p className="text-sm text-primary font-semibold">{post.category}</p>
                <h3 className="text-xl font-bold mt-2 text-neutral-900 dark:text-neutral-100 hover:text-primary transition-colors">
                    <Link to="#">{post.title}</Link>
                </h3>
                <p className="text-neutral-700 dark:text-neutral-400 mt-2 text-sm">{post.excerpt}</p>
            </Card.Body>
            <Card.Footer>
                {author && (
                    <AvatarItem
                        avatarProps={{ name: author.name, src: `https://picsum.photos/40/40?random=${author.id}`, size: 'md' }}
                        name={author.name}
                        description={post.publishDate}
                    />
                )}
            </Card.Footer>
        </Card>
    );
};

const POSTS_PER_PAGE = 2;

const Blog: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const paginatedPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        return BLOG_POSTS_DATA.slice(startIndex, startIndex + POSTS_PER_PAGE);
    }, [currentPage]);
    
    const totalPages = Math.ceil(BLOG_POSTS_DATA.length / POSTS_PER_PAGE);
    const categories = Array.from(new Set(BLOG_POSTS_DATA.map(p => p.category)));
    const recentPosts = BLOG_POSTS_DATA.slice(0, 2);

    return (
        <div className="container mx-auto px-6 py-8">
            <PageHeader title="Our Blog" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Posts */}
                <main className="lg:col-span-2">
                    <div className="space-y-8">
                        {paginatedPosts.map(post => <PostCard key={post.id} post={post} />)}
                    </div>
                    <div className="mt-8 flex justify-center">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </div>
                </main>

                {/* Sidebar */}
                <aside className="lg:col-span-1 space-y-6">
                    <Card>
                        <Card.Body>
                            <Input id="search" label="Search" placeholder="Search blog..."/>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header><h3 className="font-bold">Categories</h3></Card.Header>
                        <ListGroup>
                            {categories.map(cat => <ListGroup.Item as="Link" to="#" key={cat}>{cat}</ListGroup.Item>)}
                        </ListGroup>
                    </Card>
                     <Card>
                        <Card.Header><h3 className="font-bold">Recent Posts</h3></Card.Header>
                        <Card.Body className="space-y-4">
                           {recentPosts.map(post => (
                               <Link key={post.id} to="#" className="block hover:text-primary">
                                   <p className="font-semibold">{post.title}</p>
                                   <p className="text-xs text-neutral-500">{post.publishDate}</p>
                               </Link>
                           ))}
                        </Card.Body>
                    </Card>
                </aside>
            </div>
        </div>
    );
};

export default Blog;
