// @flow
import React from "react";
import { Map, ImageOverlay, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import R from "ramda";
import Config from "./config";

import ActionInfo from 'material-ui/svg-icons/action/info';
import ReactDOM from "react-dom";

// convert width/height coordinates to -height/width coordinates
const c = (p) => [-p[1], p[0]]

const keyOf = (map: Map<any,any>, value: any) : ?any =>
  ((keys) => keys[R.findIndex(k => map[k] == value, keys)])
    (R.keys(map));

const color = (iconColor, state: State) => {
  console.log(
      R.mapObjIndexed((x,k) => keyOf(Config.topics[k].values, x), state.values)
  ); return iconColor == null ? "#000000" :
    iconColor(
      R.mapObjIndexed((x,k) => keyOf(Config.topics[k].values, x), state.values)
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
      })}>
    <Popup onOpen={() => props.store.dispatch({type: "uiopen", ui: key})}
          onClose={() => props.store.dispatch({type: "uiclose"})}>
      <span>{el.name}</span>
    </Popup>
  </Marker>
), R.propOr({}, "controls", Config)));

const SpaceMap = (props: Object) => (
  <Map center={c([props.width / 2, props.height / 2])} zoom={props.zoom}
      crs={Leaflet.CRS.Simple}>
    <ImageOverlay url={props.image}
        bounds={[c([0,0]), c([props.width, props.height])]} />
    {Markers(props)}
  </Map>
);

export default SpaceMap;
