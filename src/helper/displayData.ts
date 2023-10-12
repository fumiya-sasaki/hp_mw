const createColImagePath = (id: number) => '/collection/col_' + id.toString().padStart(2, '0') + '.JPG';
export type Collection = {
    title: string;
    img: string;
};

export const collectionData: Collection[] = [
    {
        title: '苺マフィン',
        img: createColImagePath(1),
    },
    {
        title: 'タルトタタン',
        img: createColImagePath(2),
    },
    {
        title: 'チョコレートケーキ',
        img: createColImagePath(3),
    },
    {
        title: 'レモンケーキ',
        img: createColImagePath(4),
    }
]