const Loader = ({ color = "black", className = "" }) => (
  <div className={className}>
    <div
      style={{ borderTopColor: "transparent" }}
      className={`w-8 h-8 border-4 border-${
        color === "black" ? "black" : "white"
      } border-solid rounded-full animate-spin`}
    />
  </div>
)

export const LoaderSmall = ({ color = "black", className = "" }) => (
  <div className={className}>
    <div
      style={{ borderTopColor: "transparent" }}
      className={`w-4 h-4 border-2 border-${
        color === "black" ? "black" : "white"
      } border-solid rounded-full animate-spin`}
    />
  </div>
)

export default Loader
