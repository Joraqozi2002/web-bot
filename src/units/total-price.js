export const totalPrice = (arr) => {
  return arr.reduce((acc, item) => acc + item.price * item.qty, 0)
} 