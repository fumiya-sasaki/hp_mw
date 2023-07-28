export type NewsBaseData = {
    uid: string;
    title: string;
    imageUrls: string[];
    content: string;
    createdAt: number;
};

export type NewsData = { [uid: string]: NewsBaseData; };

export type NewsState = {
    data: NewsData;
    isNoMore: boolean;
};

// admin
export type BlobWithUrl = {
    url: string;
    blob?: Blob;
};

export type NewsEdit = {
    uid: string;
    title: string;
    imageUrls: BlobWithUrl[];
    content: string;
    createdAt: number;
};

export type AdminState = {
    newsData: { [uid: string]: NewsBaseData; };
    isLogin: boolean;
};
