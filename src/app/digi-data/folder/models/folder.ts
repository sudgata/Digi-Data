export interface Folder{
    id?:string;
    name?: string;
    parentId?: string;
    path?:Folder[],
    createdAt?: any;
    userId?: string;
    isFavourite?: boolean;
}