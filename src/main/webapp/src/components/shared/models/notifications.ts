import dayjs from "dayjs";

export interface INotification {
    id?: string
    avatarUrl?: string,
    userName: string,
    dateTime: string,
    content: string
}

export const defaultValue: Readonly<INotification> = {
    id: '82ae3d02-3500-4e56-a1b8-0c5c8c1f6b32',
    avatarUrl: '',
    userName: 'Jhon Doe',
    dateTime: dayjs().format("mm"),
    content: "Donec sollicitudin molestie malesuada. " +
        "Pellentesque in ipsum id orci porta dapibus." +
        " Vivamus suscipit tortor eget felis porttitor volutpat."
}