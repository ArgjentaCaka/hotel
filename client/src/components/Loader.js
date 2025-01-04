import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader"; // Sigurohuni që ky import është i saktë

function Loader() {
  let [loading, setLoading] = useState(true);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',  // Centron ngarkuesin horizontalisht
        alignItems: 'flex-start',   // Centron ngarkuesin vertikalisht, lartë
        height: '100vh',            // Përdor të gjithë lartësinë e ekranit
        marginTop: '150px',         // Mund të përshtatni lartësinë për ta vendosur më lart
      }}
    >
      <div className="sweet-loading text-center">
        <HashLoader color="#000" loading={loading} css="" size={80} />
      </div>
    </div>
  );
}

export default Loader;

