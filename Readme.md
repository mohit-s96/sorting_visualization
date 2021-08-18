# Sorting Algorithm Visualization

A web app that visualizes every step in popular sorting algorithms. Has play/pause and speed control options as well. The rendering library can be decoupled to use with any standard sorting algorithms.

## API Reference

#### Add render data

```bash
  addRenderData
```

| Parameter | Type               | Description                                                                                       |
| :-------- | :----------------- | :------------------------------------------------------------------------------------------------ |
| `array`   | `array of numbers` | **Required**. To be called after each iteration of the outer loop with the latest array reference |

#### Draw visualization in the browser

```bash
  drawToScreen
```

| Parameter | Type     | Description                                                                  |
| :-------- | :------- | :--------------------------------------------------------------------------- |
| `options` | `object` | **Optional**. Object describing the drawing instructions, custom CSS classes |

## Run Locally

Clone the project

```bash
  git clone https://github.com/msx47/sorting_visualization.git
```

Go to the project directory

```bash
  cd sorting_visualization
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Contributing

Contributions are always welcome!!
