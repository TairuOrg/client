import {z} from 'zod'

export const personalInformationSchema = z.object({
    fullname: z.string().min(1),
    identification: z.string().length(10),
    state: z.string(),
    phoneNumber: z.string().length(11),
})

export type PersonalInformationSchema = z.infer<typeof personalInformationSchema>