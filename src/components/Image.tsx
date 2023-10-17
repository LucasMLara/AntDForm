'use client'

import Image from 'next/image'


export default function Page(props: any) {
  return (
    <Image
      priority
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.heigth}
    />
  )
}