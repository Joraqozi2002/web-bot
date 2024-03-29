import "./button.css"
function Button(props) {
  const { title, type, onClick } = props
  return (
    <div onClick={onClick} className={`btn ${type === "add" ? "add" : type === "remove" ? "remove" : type === "checkout" ? "checkout" : ""
      }`} >{title}</div>
  )
}

export default Button