const cnv = document.getElementById("canvas")
const ctx = cnv.getContext("2d")
const btn = document.getElementById("btn")
cnv.width = innerWidth
cnv.height = innerHeight
let curve
let curve2

const drawTree = (startX, startY, len, angle, branchWidth, bodyColor, leavesColor) => {
	btn.style.backgroundColor = bodyColor
	btn.style.color = leavesColor

	ctx.beginPath()
	ctx.save()
	ctx.strokeStyle = bodyColor
	ctx.fillStyle = leavesColor
	ctx.shadowBlur = 5
	ctx.shadowColor = "rgba(255, 255, 255, .5)"
	ctx.lineWidth = branchWidth
	ctx.translate(startX, startY)
	ctx.rotate(angle * Math.PI / 180)
	ctx.moveTo(0, 0)

	if (angle < 10) {
		ctx.bezierCurveTo(10, -len / 2, -10, -len / 2, 0, -len)
	} else {
		ctx.bezierCurveTo(10, -len / 2, 10, -len / 2, 0, -len)
	}
	ctx.stroke()


	if (len < 8) {
		ctx.beginPath()
		ctx.arc(0, -len, 10, 0, Math.PI / 2)
		ctx.fill()
		ctx.restore()
		return
	}
	curve = Math.random() * 10 + 10
	drawTree(
		0,
		-len,
		len * .75,
		angle + curve,
		branchWidth * 0.6,
		bodyColor,
		leavesColor
	)
	drawTree(
		0,
		-len,
		len * .75,
		angle - curve,
		branchWidth * 0.6,
		bodyColor,
		leavesColor
	)
	ctx.restore()
}



const getRandomTree = () => {
	ctx.clearRect(0, 0, cnv.width, cnv.height)
	let centerPointX = cnv.width / 2
	let len = Math.floor(Math.random() * 20 + 100)
	let angle = 0
	let branchWidth = Math.random() * 70 + 1
	let bodyColor = `rgb(${ Math.random() * 255 }, ${ Math.random() * 255 }, ${ Math.random() * 255 }`
	let leavesColor = `rgb(${ Math.random() * 255 }, ${ Math.random() * 255 }, ${ Math.random() * 255 }`

	curve = Math.random() * 20 + 2
	curve2 = Math.random() * 50

	drawTree(centerPointX, cnv.height - 80, len, angle, branchWidth, bodyColor, leavesColor)
}

btn.onclick = getRandomTree

drawTree(
	cnv.width / 2,
	cnv.height - 80,
	120,
	0,
	25,
	"brown",
	"green"
)