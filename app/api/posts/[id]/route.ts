
import { NextRequest, NextResponse } from 'next/server';
import { updatePost, deletePost } from '@/lib/utils/postService';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  try {
    const { question, answer } = await request.json();

    if (!question || !answer) {
      return NextResponse.json({ message: 'Question and answer are required' }, { status: 400 });
    }

    const updatedPost = await updatePost(id, question, answer);
    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error ${error} ` }, { status: 501 });
  }
}

export async function DELETE(req: NextRequest) {
  
  const { pathname } = new URL(req.url);
  const id = pathname.split('/').pop() as string;

  if (id === null) {
    return NextResponse.json({ message: 'Undefined ID' }, { status: 400 });
  }

  const postId = parseInt(id, 10);
  console.log('ID:', postId);

  if (isNaN(postId)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  
  try {
    const res = await deletePost(postId);
    console.log('Response:', res);
    console.log('ID inside try catch:', postId);
    return NextResponse.json({ status: 204 });
  } catch (error:any) {
    console.error('Error deleting post:', error.message);
    return NextResponse.json({ message: `Internal Server Error` }, { status: 500 });
  }
}
