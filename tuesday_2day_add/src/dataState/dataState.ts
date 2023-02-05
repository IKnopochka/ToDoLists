export const dataState: DataStateType = {
    pages: [
        {
            heading: 'Цикл while',
            about: 'Цикл while имеет слудеющий синтаксис'
        },
        {
            heading: 'Цикл for',
            about: 'Цикл for имеет слудеющий синтаксис'
        },
        {
            heading: 'Конструкция switch',
            about: 'Конструкция switch заменяет собой сразу несколько if'
        }
    ]
}

export type DataStateType = {
    pages: PagesType[]
}
export type PagesType = {
    heading: string
    about: string
}