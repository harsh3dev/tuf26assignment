import { NextResponse } from 'next/server';
import { getAllPosts, createPost } from '@/lib/utils/postService';

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { question, answer } = await request.json();

    if (!question || !answer) {
      return NextResponse.json({ message: 'Question and answer are required' }, { status: 400 });
    }

    const newPost = await createPost(question, answer);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
