const createColImagePath = (id: number) => '/collection/col_' + id.toString().padStart(2, '0') + '.JPG';

export const collectionData = [
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