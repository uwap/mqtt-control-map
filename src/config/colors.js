// @flow
export opaque type Color: string = string;

export const rainbow: Color = "rgba(200,120,120,0.5);"
      + "--before-background: linear-gradient("
      + "40deg, #FF0000 0%, #00FF00 50%, #0000FF 70%, #FFFF00 100%);";

export const hex = (hexstr: string): Color => hexstr;

export const rgb = (r: number, g: number, b: number): Color => (
  `rgb(${r.toString()}, ${g.toString()}, ${b.toString()})`
);

export const rgba = (r: number, g: number, b: number, a: number): Color => (
  `rgb(${r.toString()}, ${g.toString()}, ${b.toString()}, ${a.toString()})`
);
