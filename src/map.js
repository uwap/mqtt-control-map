// @flow
import React from "react";
import { Map, ImageOverlay, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import R from "ramda";
import Config from "./config";
import { Actions } from "./state";
import { keyOf } from "./util";
import { store } from "./state";

import ReactDOM from "react-dom";

// convert width/height coordinates to -height/width coordinates
const c = (p) => [-p[1], p[0]]

const color = (iconColor, state: State) => {
  // TODO: give iconColor not only internal but also actual values
  return iconColor == null ? "#000000" :
    iconColor(
      R.map(x => x.internal == null ?
        x.actual : x.internal, state.values == null ? {} : state.values)
    );
}
const iconHtml = (el, state: State) =>
  "<i class=\"material-icons\" style=\""
    + "color:" + color(el.iconColor, state) + ";\">"
    + el.icon + "</i>"

const Markers = (props) => R.values(R.mapObjIndexed((el,key) => (
  <Marker position={c(el.position)} key={el.name}
    icon={Leaflet.divIcon(
      {
        html: iconHtml(el, props.state),
        iconSize: Leaflet.point(32,32)
      })}
    onClick={() => store.dispatch({type: Actions.CHANGE_UI, payload: key})}>
  </Marker>
), R.propOr({}, "controls", Config)));

const Layer = (layer: Layer, bounds: Array<Array<number>>) => (
  <ImageOverlay url={layer.image} bounds={bounds} />
);

const visibleLayers = (state: State) => R.filter(
  x => (x.forceVisibility == null && R.contains(state.visibleLayers, x.image))
      || x.forceVisibility == "on", Config.layers)

const SpaceMap = (props: { state: State, width: number, height: number,
    zoom: number, image: string}) => (
  <Map center={c([props.width / 2, props.height / 2])} zoom={props.zoom}
      crs={Leaflet.CRS.Simple}>
    {R.map(x => Layer(x, [c([0,0]), c([props.width, props.height])]), visibleLayers(props.state))}
    {Markers(props)}
  </Map>
);

export default SpaceMap;
