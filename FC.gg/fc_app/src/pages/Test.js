import React from 'react'

export default function Test() {
  const x = `${0.9499898435243544 * 100}%`;
  const y = `${0.4995435465846854 * 100}%`;

  return (
    <div style={{width:'100%', height: '100vh'}}>
        <div style={{width: '500px', height: '700px', border: '1px'}}>
            <div style={{top: x, left: y, width: '5px', height: '5px', backgroundColor: 'black', position:'relative'}}></div>
        </div>
    </div>
  )
}
