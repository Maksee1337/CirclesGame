export class Colors {
    static colors = [
        "red",
        "green",
        "blue",
        "yellow",
        "orange",
        "purple",
        "pink",
        "black",
        "white",
        "gray",
    ];
    static getRandomColor() {
        return Colors.colors[Math.floor(Math.random() * Colors.colors.length)];
    }
}
