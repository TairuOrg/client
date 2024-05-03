import Image from 'next/image'

export default function Logo(size : {h: number, w: number}) {
    return (

            <Image
            src='/logo.png'
            width={size.w}
            height={size.h}
            alt='Logo of the application'
        />

    )

}