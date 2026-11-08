/** Simple three-point-ish setup: soft fill, a key light and an accent rim. */
export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 5]} intensity={2.2} />
      <pointLight position={[-5, -2, -3]} intensity={30} color="#c084fc" />
    </>
  )
}
