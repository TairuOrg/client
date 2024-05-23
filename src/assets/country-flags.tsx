import Image from 'next/image'

export function EuropeFlag({size}: {size: number}) {
    return (
        <Image src="/eu-flag.svg" alt="EU Flag" width={size} height={size} />
    )
}

export function UnitedStatesFlag({size}: {size: number}) {
    return (
        <Image src="/us-flag.svg" alt="US Flag" width={size} height={size} />
    )
}

export function VenezuelanFlag({size}: {size: number}) {
    return (
        <Image src="/ve-flag.svg" alt="VE Flag" width={size} height={size} />
    )
}