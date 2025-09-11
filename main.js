const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d")
const networkCtx = networkCanvas.getContext("2d")
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9)
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI")
const traffic = [
  new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)
]

let trafficLevel = 4
let colors = ["blue", "purple", "white", "yellow", "green", "red"]

for (let i = 0; i <= trafficLevel; i++) {
  let newCar = new Car(road.getLaneCenter(Math.floor(Math.random() * road.laneCount)), Math.floor(Math.random() * 1000) - 500, 30, 50, "DUMMY", 2)
  traffic.push(newCar)
}


animate()

function animate(time) {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, [])
  }
  car.update(road.borders, traffic)
  carCanvas.height = window.innerHeight;

  carCtx.save()
  carCtx.translate(0, -car.y + carCanvas.height * 0.7)

  road.draw(carCtx)
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, colors[i])
  }
  car.draw(carCtx, "blue")

  networkCanvas.height = window.innerHeight;
  carCtx.restore()

  networkCtx.lineDashOffset = -time / 50;
  Visualizer.drawNetwork(networkCtx, car.brain)
  requestAnimationFrame(animate)
}
