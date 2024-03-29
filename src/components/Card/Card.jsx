import { useState } from "react";
import Button from "../Button/Button"
import "./card.css"
function Card(props) {
  const { course, onAddItem, onRemoveItem } = props;
  const [count, setcount] = useState(0);
  const handleincrement = () => {
    setcount(rev => rev + 1);
    onAddItem(course)
  }
  const handledecrement = () => {
    setcount(prev => prev - 1)
    onRemoveItem(course)
  }
  return (
    <div key={course.id} className="card">
      <div className={`${count !== 0 ? "card_badge" : "card_badge_hidden"}`}>{count}</div>
      <div className="image_container">
        <img src={course.Image} alt={course.title} width={"100%"} height={"230px"} />
      </div>
      <div className="card_body">
        <h2 className="card_title" >{course.title}</h2>
        <div className="card_price">
          {course.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })
          }
        </div>
      </div>
      <div className="btn_container">
        <Button title="+" type="add" onClick={handleincrement} />
        {
          count !== 0 && <Button title="-" type="remove" onClick={handledecrement} />
        }

      </div>
    </div>
  )
}

export default Card