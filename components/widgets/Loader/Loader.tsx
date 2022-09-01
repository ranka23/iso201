const Loader = ({ color = "black" }) => (
  <div>
    <div
      style={{ borderTopColor: "transparent" }}
      className={`w-8 h-8 border-4 border-${
        color === "black" ? "black" : "white"
      } border-solid rounded-full animate-spin`}
    />
  </div>
)

export default Loader
