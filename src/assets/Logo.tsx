import Image from 'next/image'

export default function Logo() {
    return (

            <Image
            src='/logo.png'
            width='80'
            height='80'
            alt='Logo of the application'
        />

    )

}