import Image from 'next/image'

export default function Logo() {
    return (

            <Image
            src='/logo.png'
            width='120'
            height='120'
            alt='Logo of the application'
        />

    )

}