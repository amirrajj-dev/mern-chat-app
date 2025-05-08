import {z} from 'zod'

export const schema = z.object({
    phone : z.string().nonempty("phone is required").regex(/^(\+98|0|0098)?9\d{9}$/,"invalid phone number"),
})

export type SignnInSchemaPhoneType = z.infer<typeof schema>