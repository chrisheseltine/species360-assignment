'use client'

import Image from 'next/image'
import dataJSON from '../public/data.json'

export default function ImageSelectionComponent(props: any) {
  const jsonKeys = Object.keys(dataJSON)
  return (
    <main>
      <h1>Select an Image to Compare</h1>
      <div
        className='grid grid-cols-4'
        style={{ height: '200px' }}>
        {jsonKeys.map(k => {
          return (
            <Image
              key={k}
              src={`/images/${k}`}
              alt={k}
              width={200}
              height={200}
              onClick={() => props.handleSelectImage(k)}
              style={{ cursor: 'pointer' }}
            />
          )
        })}
      </div>
    </main>
  )
}