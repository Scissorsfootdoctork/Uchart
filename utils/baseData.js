export function baseDate() {
	let time = new Date()
	let y = time.getFullYear()
	let m = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : `0${time.getMonth() + 1}`
	let d = time.getDate() > 9 ? time.getDate() : `0${time.getDate()}`
	return `${y}-${m}-${d+1}`
}