module.exports={
  "slug": "distance-formula",
  "lesson": "Distance Formula",
  "classification": "BOTH",
  "graph": {
    "bounds": {
      "xMin": -4,
      "xMax": 9,
      "yMin": -4,
      "yMax": 10
    },
    "lines": [
      {
        "m": 1.3333333333333333,
        "b": 1.6666666666666667,
        "qaX": [
          -2,
          1,
          4
        ],
        "yIntercept": 1.6666666666666667,
        "xIntercept": -1.25
      }
    ],
    "points": [
      {
        "x": -2,
        "y": -1,
        "line": 0,
        "label": "A (-2, -1)"
      },
      {
        "x": 4,
        "y": 7,
        "line": 0,
        "label": "B (4, 7)"
      },
      {
        "x": 4,
        "y": -1,
        "label": "Right-angle corner (4, -1)"
      }
    ],
    "caption": "A(-2,-1) to B(4,7): horizontal change 6, vertical change 8, distance 10.",
    "ariaLabel": "Coordinate plot of A(-2,-1), B(4,7), horizontal run six and vertical rise eight."
  },
  "desmos": {
    "enter": "Plot (-2,-1) and (4,7), then enter sqrt((4-(-2))^2+(7-(-1))^2).",
    "lookFor": "Two points and the numerical value 10.",
    "useIt": "Verify that the distance AB is 10 units.",
    "why": "The squared coordinate changes are perpendicular legs of a right triangle.",
    "faster": "For small Pythagorean triples, hand calculation is faster; Desmos is useful for checking awkward values.",
    "crossCheck": "6^2+8^2=100, so distance 10. Line y=(4/3)x+5/3 gives -1,3,7 at x=-2,1,4."
  }
};
