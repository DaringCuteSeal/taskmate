// Get color in hex form based on human-readable colors
export function getColorHex(color_name: string | null | undefined): string {
	switch(color_name)
		{
		case "red":
			return "#6E3630"
		case "blue":
			return "#28456C"
		case "green":
			return "#7A6630"
		case "pink":
			return "#69314C"
		case "purple":
			return "#492F64"
		case "gray":
			return "#373737"
		case "light_gray":
			return "#5A5A5A"
		case "brown":
			return "#603B2C"
		case "orange":
			return "#854C1D"
		case "yellow":
			return "#895D2F"
		case null:
			return "none"
		case undefined:
			return "none"
		default:
			return color_name
	}

}
