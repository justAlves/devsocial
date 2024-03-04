export default interface IPost {
    id: string;
    avatarUrl: string | null;
    content: string;
    createdAt: {
        seconds: number;
    };
    likes: number;
    owner: string;
    userId: string;
}
