import Image from 'next/image'

export default function ImageResultsComponent(props: any) {
  return (
    <div>
      <table className='border-separate [border-spacing:0.75rem]'>
        <tr>
          <th>Rank</th>
          <th>Image</th>
          <th>Score</th>
          <th>Name</th>
        </tr>
        {props.results.map((r, i) => (
          <tr key={r.name}>
            <td>#{i + 1}</td>
            <td>
              <Image
                src={`/images/${r.name}`}
                alt={r.name}
                width={80}
                height={80}
              />
            </td>
            <td>{r.name}</td>
            <td>{r.score}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}