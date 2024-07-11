import z from 'zod'
export const uploadBackup = z.object({
    file: z.any().refine(file => file, {
        message: 'Al menos se necesita 1 archivo'
    }),
})

export type UploadBackup = z.infer<typeof uploadBackup>