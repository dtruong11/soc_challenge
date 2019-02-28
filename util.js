class Queue {
	constructor() {
		this.items = []
	}

	add(val) {
		this.items.unshift(val)
		return this
	}

	remove(val) {
		return this.items.pop()
	}

	peek() {
		return this.items[0]
	}

	isEmpty() {
		return this.items.length === 0
	}
}

module.exports = {
  Queue
}