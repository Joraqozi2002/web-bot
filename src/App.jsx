import { useCallback, useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card/Card.jsx'
import Cart from './components/Cart/Cart.jsx'
import { getDb } from './constants/db.js';

const telegram = window.Telegram.WebApp;

function App() {
  const [cardItems, setcardItems] = useState([])
  useEffect(() => {
    telegram.ready()
  })
  const onAddItem = (item) => {
    const existItem = cardItems.find((x) => x.id === item.id)
    if (existItem) {
      const data = cardItems.map((x) => x.id === item.id ? { ...existItem, qty: existItem.qty + 1 } : x);
      setcardItems(data)
    } else {
      setcardItems([...cardItems, { ...item, qty: 1 }])
    }
  }
  const onRemoveItem = (item) => {
    const existItem = cardItems.find((x) => x.id === item.id);
    if (existItem.qty === 1) {
      setcardItems(cardItems.filter((x) => x.id !== item.id));
    } else {
      setcardItems(cardItems.map((x) => x.id === item.id ? { ...existItem, qty: existItem.qty - 1 } : x));
    }
  }
  const onCheckout = () => {
    telegram.MainButton.text = "Tolov";
    telegram.MainButton.show();
  }
  const onSendData = useCallback(() => {
    const queryId = telegram.initialDataUnsave?.query_id;
    if (queryId) {
      fetch("http:localhost:8080/web-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardItems),
      })
    } else {

      telegram.sendData(JSON.stringify(cardItems))
    }
  }
    , [cardItems])
  useEffect(() => {
    telegram.onEvent("mainButtonClicked", onSendData);
    return () => {
      telegram.offEvent("mainButtonClicked", onSendData);
    }
  }, [onSendData])
  return (
    <>
      <Cart cardItems={cardItems} onCheckout={onCheckout} />
      <div className="cards_container">
        {getDb().map((course) => (
          <Card key={course.id} course={course} onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
        ))}
      </div>
    </>
  )
}

export default App
