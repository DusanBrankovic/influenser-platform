export interface CommentDto {
    id: number;
    postId: number;
    userName: string;
    userProfilePicture: string | null;
    content: string;
    createdAt: string;
}