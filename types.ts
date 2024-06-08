export type Course = {
    id: string
    title: string,
    description: string,
    imageUrl: string,
    category: string,
    attachments: string,
    isPublished: boolean
}

export type Chapter = {
    id: string
    title: string
    description: string
    videoUrl: string
    courseId: string
}