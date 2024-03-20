import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; //import css styles

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // inline styling
  // const style = {
  //   color: "green",
  //   fontSize: "5em",
  //   textTransform: "uppercase",
  // };

  const style = {};

  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;

  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <h3>"Slice to Speed, Savor the Quick!"</h3>

      {/* conditional rendering */}
      {numPizzas > 0 ? (
        <React.Fragment>
          <p>
            Indulge in the essence of Italy with our exquisite pizza selection
            at Fast React Pizza Co. Offering six mouthwatering varieties crafted
            with authentic Italian flavors and premium ingredients. From classic
            Margherita to tantalizing Pepperoni, each pizza promises a
            delightful journey through the taste of Italy.
          </p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </React.Fragment>
      ) : (
        <>
          <p>We are still looking on getting new pizzas ordered for you.</p>
          <p>Please come back later :)</p>
        </>
      )}

      {/* <Pizza
        name="Pizza Spinaci"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        price={10}
      />
      <Pizza
        name="Focaccia"
        ingredients="Bread with italian olive oil and rosemary"
        photoName="pizzas/focaccia.jpg"
        price={6}
      /> */}
    </main>
  );
}

// const time = new Date().toLocaleTimeString();

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  // if (hour >= openHour && hour <= closeHour) {
  //   alert("We're still open");
  // } else {
  //   alert("Sorry we are closed.");
  // }

  const [time, setTime] = React.useState(new Date().toLocaleTimeString());

  React.useEffect(function () {
    setInterval(function () {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  // multiple returns. This one acts as insurance. Must be placed after hooks
  // better for rendering components
  // if (!isOpen)
  //   return (
  //     <p>
  //       We're happy to serve you pizza between {openHour}:00 and {closeHour}
  //       :00.
  //     </p>
  //   );

  return (
    <footer className="footer">
      {isOpen ? (
        <Order time={time} closeHour={closeHour} />
      ) : (
        <p>
          We're happy to serve you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
  // return React.createElement("footer", null, "We're currently open!");
}

// must match the name of the prop
function Order({ time, closeHour }) {
  return (
    <div className="order">
      <p>Current Time: {time} </p>
      <p>We're open until {closeHour}:00. Come visit us or order online.</p>
      <button className="btn">Order</button>
    </div>
  );
}

// const Test = () => {}

// Pizza component is reusable
// call props 'pizzaObj' so that we can use destructuring so that we do not have to prefix
// the word 'props' all the time
function Pizza({ pizzaObj }) {
  console.log(pizzaObj);

  // early return
  // if (pizzaObj.soldOut) return null;

  return (
    // use a template literal and execute JS to modify CSS on condition
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        {/* {pizzaObj.soldOut ? (
          <span>SOLD OUT</span>
        ) : (
          <span>{pizzaObj.price}</span>
        )} */}
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </li>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
