class Car {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;

    this.maxSpeed = 3;
    this.friction = 0.05;

    this.angle = 0;

    this.sensor = new Sensor(this)

    this.controls = new Controls()
  }

  update() {
    this.#applyAcceleration();
    this.#applyFriction();
    this.#limitSpeed();
    this.#handleSteering();
    this.#updatePosition();
    this.sensor.update();
    console.log("updated")
  }

  #applyAcceleration() {
    if (this.controls.forward) this.speed += this.acceleration;
    if (this.controls.reverse) this.speed -= this.acceleration;
  }

  #applyFriction() {
    if (this.speed !== 0) {
      const frictionForce = this.friction * Math.sign(this.speed);
      this.speed -= frictionForce;

      // Evita "tremedeira" quando a velocidade é muito baixa
      if (Math.abs(this.speed) < this.friction) {
        this.speed = 0;
      }
    }
  }

  #limitSpeed() {
    const maxReverse = -this.maxSpeed / 2;
    this.speed = Math.min(this.speed, this.maxSpeed);
    this.speed = Math.max(this.speed, maxReverse);
  }

  #handleSteering() {
    if (this.speed === 0) return;

    const direction = this.speed > 0 ? 1 : -1;
    if (this.controls.right) this.angle -= 0.02 * direction;
    if (this.controls.left) this.angle += 0.02 * direction;
  }

  #updatePosition() {
    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }


  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(-this.angle)

    ctx.beginPath();
    ctx.rect(
      - this.width / 2,
      - this.height / 2,
      this.width,
      this.height
    )
    ctx.fill()

    ctx.restore()

    this.sensor.draw(ctx)
  }
}
