module.exports={
  "slug": "reflections",
  "lesson": "Reflections",
  "classification": "BOTH",
  "graph": {
    "bounds": {
      "xMin": -4,
      "xMax": 4,
      "yMin": -4,
      "yMax": 5
    },
    "lines": [
      {
        "m": 0,
        "b": 3,
        "qaX": [
          -2,
          0,
          2
        ],
        "yIntercept": 3
      }
    ],
    "verticals": [
      {
        "x": 0
      }
    ],
    "points": [
      {
        "x": 2,
        "y": 3,
        "line": 0,
        "label": "P"
      },
      {
        "x": -2,
        "y": 3,
        "line": 0,
        "label": "P prime"
      },
      {
        "x": 0,
        "y": 3,
        "line": 0,
        "label": "Midpoint"
      }
    ],
    "caption": "P(2,3) and P'(-2,3) are equally distant from x=0.",
    "ariaLabel": "Reflection of (2,3) to (-2,3) across the y-axis."
  },
  "desmos": {
    "enter": "Plot (2,3), (-2,3), and x=0 on separate lines.",
    "lookFor": "Both points two units from x=0.",
    "useIt": "Verify image (-2,3).",
    "why": "The mirror is the perpendicular bisector of the joining segment.",
    "faster": "Coordinate rules are faster for one point; Desmos helps with figures.",
    "crossCheck": "Midpoint (0,3); horizontal distances 2 and 2."
  }
};
