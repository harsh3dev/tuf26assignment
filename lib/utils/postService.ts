import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllPosts = async () => {
    try {
        return await prisma.post.findMany();
    } catch (error) {
        throw new Error("Failed to fetch post data");
    }
};

export const createPost = async (question: string, answer: string) => {
    try {
        return await prisma.post.create({
        data: {
            question,
            answer,
        },
        });
    } catch (error) {
        throw new Error("Failed to create quiz");
    }
};

export const updatePost = async (
    id: number,
    question: string,
    answer: string
    ) => {
    try {
        return await prisma.post.update({
        where: { id },
        data: {
            question,
            answer,
        },
        });
    } catch (error) {
        throw new Error("Failed to update post");
    }
};

export const deletePost = async (id: number) => {
    if (!id) 
        throw new Error("Invalid ID");
    if(id===undefined) 
        throw new Error("Undefined ID in function");
    try {
        const deletedPost = await prisma.post.delete({
            where: { id: id },
        });
        console.log("Post deleted:", deletedPost);
        return deletedPost;
        } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
        } finally {
        await prisma.$disconnect();
    }
};
